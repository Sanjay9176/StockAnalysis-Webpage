import Header from "../Components/Header"
import Contactus from "../Components/Contactus"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import FirstOfflineComponents from "../Components/FirstOfflineComponents"
import SecondOfflineComponents from "../Components/SecondOfflineComponents"
import ThirdOfflineComponents from "../Components/ThirdOfflineComponents"
import FourthOfflineComponents from "../Components/FourthOfflineComponents"
import { MdSearch } from "react-icons/md"

export default function OfflineAnalysis() {
  const navigate = useNavigate()
  const API_BASE = import.meta.env.VITE_API_BASE
  let [suggestion, setsuggestions] = useState([])
  let [query, setQuery] = useState("TCS.NS")
  let [symbol, setsymbol] = useState("TCS.NS")
  let [data, setdata] = useState({
    name: "",
    sector: "",
    ceo: "",
    companyDescription: "",

    price: "",
    percentChange: "",
    netChange: "",
    week52High: "",
    week52Low: "",

    beta: "",
    AvgVolume3Month: "",
    AvgVolume10Days: "",
    ma50: "",
    ma300: "",
    ma100: "",
    ma10: "",

    revenueGrowth3Y: "",
    revenueGrowth5Y: "",
    epsGrowth3Y: "",
    epsGrowth5Y: "",
    netProfitMargin3Y: "",
    netProfitMargin5Y: "",
    opProfitMargin3Y: "",
    opProfitMargin5Y: "",
    netProfitGrowth3Y: "",
    netProfitGrowth5Y: "",

    PromoterHolding: "",
    fIIHolding: "",
    DIIHolding: "",
    PublicHolding: "",

    latestCorporateActions: {
      latestDividend: '',
      latestSplit: '',
      latestMeeting: '',
    },

    latestRecentNews: [],

    analystInsights: null,

    financialStrengths: {
      debtToEquity: "",
      currentRatio: "",
      interestCoverage: ""
    }
  })
  useEffect(() => {
    const OfflineAnalysisFetch = async () => {
      try {
        const token = localStorage.getItem("token")
        const cleanName = symbol.replace(".NS", "").replace(".BO", "").trim()
        const res = await fetch(`http://localhost:5000/lexpo/OfflineAnalysis/${encodeURIComponent(cleanName)}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const json = await res.json()
        setdata(json)
      } catch {
        toast.error("Failed to load company overview");
      }
    }
    if (symbol) {
      OfflineAnalysisFetch()
    }
  }, [symbol])
  const handleinputsearchbox = async (e) => {
    let val = e.target.value.toUpperCase()
    setQuery(val)
    if (val.length < 2) {
      setsuggestions([]);
      return;
    }
    try {
      let token = localStorage.getItem("token")
      let res = await fetch(`${API_BASE}/api/symbols?q=${val}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let json = await res.json();
      if (json.status && Array.isArray(json.data.quotes)) {
        let filter = json.data.quotes.filter(
          (item) =>
            item.quoteType === "EQUITY" &&
            (item.symbol.endsWith(".NS") || item.symbol.endsWith(".BO"))
        );
        setsuggestions(filter.slice(0, 10))
      } else {
        setsuggestions([]);
      }
    } catch {
      setsuggestions([])
    }
  }

  const handleinputselect = (s) => {
    setQuery(s.symbol)
    setsymbol(s.symbol)
    setsuggestions([])
  }

  const handleEnterSubmit = () => {
    const matched = suggestion.find(
      (s) => s.symbol.toUpperCase() === query.toUpperCase()
    );
    if (matched) {
      handleinputselect(matched)
    } else if (/^[A-Z]{2,10}\.(NS|BO)$/.test(query)) {
      setsymbol(query)
      setsuggestions([])
    } else {
      toast.error(
        " Invalid stock symbol. Please use a valid NSE/BSE symbol like TCS.NS."
      )
    }
  }

  return (
    <>
      <Header />
      <section className="pt-[80px] pb-8 min-h-screen bg-gradient-to-br from-[#1e211d] via-[#273036] to-[#111827] text-white px-4">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          <div className="mb-8 mt-[20px] relative">
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
            {suggestion.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-[#1e1e2d] border border-[#333] rounded-xl shadow-lg max-h-60 overflow-y-auto text-white">
                {suggestion.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleinputselect(s)}
                    className="px-4 py-2 hover:bg-[#334155] cursor-pointer"
                  >
                    <span className="font-semibold">{s.symbol}</span> - {" "}
                    <span className="text-gray-400">{s.shortName || s.longName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <FirstOfflineComponents data={data} />
          <SecondOfflineComponents data={data} />
          <ThirdOfflineComponents data={data} />
          <FourthOfflineComponents data={data} />
        </div>
        <div className="flex flex-col md:flex-row mt-16 md:mt-[100px] justify-center items-center gap-8 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="CLICK HERE TO GO HOME!!!"
            readOnly
            onClick={() => navigate("/")}
            className="w-full h-[70px] md:h-[80px] px-6 text-white text-base md:text-[18px] border-2 rounded-[40px] border-[#45732a] hover:placeholder:text-[#89e74e] transition-colors duration-300 bg-[#111827] placeholder:font-bold placeholder:text-center placeholder:text-white  focus:outline-none "
          />
          <input
            type="text"
            placeholder="CLICK HERE TO EXPLORE!!!"
            readOnly
            onClick={() => navigate("/discovery")}
            className="w-full h-[70px] md:h-[80px] px-6 text-white text-[18px] border-2 rounded-[40px] border-[#45732a] hover:placeholder:text-[#89e74e] transition-colors duration-300 bg-[#111827] placeholder:font-bold placeholder:text-center placeholder:text-white  focus:outline-none "
          />
        </div>
      </section>
      <Contactus />
    </>
  )
}