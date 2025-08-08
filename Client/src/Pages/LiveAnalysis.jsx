import { useEffect, useState } from "react";
import Contactus from "../Components/Contactus";
import Header from "../Components/Header";
import CompareSection from "../Components/CompareSection";
import StockDetail from "../Components/StockDetail";
import { toast } from "react-toastify";
import { MdSearch } from "react-icons/md"

export default function LiveAnalysis() {
  const API_BASE = import.meta.env.VITE_API_BASE
  let [symbol, setsymbol] = useState("TCS.NS")
  let [query, setQuery] = useState("TCS.NS")
  let [suggestions, setsuggestions] = useState([])
  let [range, setrange] = useState("1d")
  let [interval, setinterval] = useState("1h")

  const [compareWith, setCompareWith] = useState(null)
  const handleinputsearchbox = async (e) => {
    let val = e.target.value.toUpperCase()
    setQuery(val);
    if (val.length < 2) {
      setsuggestions([]);
      return;
    }
    try {
      let token = localStorage.getItem("token");
      let res = await fetch(`${API_BASE}/api/symbols?q=${val}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      let json = await res.json();
      if (json.status && Array.isArray(json.data.quotes)) {
        const filtered = json.data.quotes.filter(
          (item) =>
            item.quoteType === "EQUITY" &&
            (item.symbol.endsWith(".NS") || item.symbol.endsWith(".BO"))
        );
        setsuggestions(filtered.slice(0, 10))
      } else {
        setsuggestions([])
      }
    } catch {
      setsuggestions([])
    }
  }
  const handleinputselect = (s) => {
    setQuery(s.symbol)
    setsymbol(s.symbol)
    setsuggestions([])
    setCompareWith(null)
  };
  const handleEnterSubmit = () => {
    const matched = suggestions.find((s) => s.symbol.toUpperCase() === query.toUpperCase())
    if (matched) {
      handleinputselect(matched)
    } else if (/^[A-Z]{2,10}\.(NS|BO)$/.test(query)) {
      setsymbol(query);
      setsuggestions([])
      setCompareWith(null)
    } else {
      toast.error("⚠️ Invalid stock symbol. Please use a valid NSE/BSE symbol like TCS.NS.")
    }
  }
  const handleCompare = (s1, s2) => {
    if (!s1 && !s2) {
      setCompareWith(null)
      setsymbol("TCS.NS")
      setQuery("TCS.NS")
      return
    }
    setCompareWith({ s1, s2 });
  }

  useEffect(() => {
    const getSafeInterval = (r) => {
      if (r === "1d") return "1h";
      if (r === "5d") return "1h";
      if (["1mo", "3mo"].includes(r)) return "1d";
      if (["6mo", "1y", "2y"].includes(r)) return "1d";
      if (["5y", "10y", "max"].includes(r)) return "1wk";
      return "1d";
    };
    setinterval(getSafeInterval(range));
  }, [symbol, range]);

  return (
    <>
      <Header />
      <section className="bg-[linear-gradient(135deg,_#1e211d_20%,_#273036_45%,_#111827_95%)] text-[#89e74e] pt-[80px] pb-[16px]">
        <div className="p-4 md:p-6 min-h-screen text-white space-y-12 md:space-y-20">
          <div className="max-w-4xl mx-auto px-4 mb-12 relative">
            <div>
              <input
                type="text"
                value={query}
                onChange={handleinputsearchbox}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEnterSubmit();
                }}
                placeholder="Search for a company (e.g., TCS.NS)"
                className="w-full h-14 px-5 text-white text-[16px] border-2 rounded-2xl border-[#1e211d] bg-[#111827] placeholder:font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#89e74e] transition-all duration-300"
              />
              <button onClick={handleEnterSubmit} className=" absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-black transition-colors duration-300" >
                <MdSearch size={30} />
              </button>
            </div>


            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-[#1e1e2d] border border-[#333] rounded-xl shadow-lg max-h-60 overflow-y-auto text-white">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleinputselect(s)}
                    className="px-4 py-2 hover:bg-[#334155] cursor-pointer"
                  >
                    <span className="font-semibold">{s.symbol}</span> -{" "}
                    <span className="text-gray-400">{s.shortName || s.longName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <StockDetail
            API_BASE={API_BASE}
            symbol={compareWith ? compareWith.s1 : symbol}
            range={range}
            setRange={setrange}
          />
          {compareWith && (
            <StockDetail
              API_BASE={API_BASE}
              symbol={compareWith.s2}
              range={range}
              setRange={setrange}
            />
          )}
        </div>
        <CompareSection API_BASE={API_BASE} onCompare={handleCompare} />
      </section>
      <Contactus />
    </>
  )
}
