import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CompareSection({ API_BASE, onCompare }) {
    const navigate = useNavigate()
    const [stock1Query, setStock1Query] = useState("")
    const [stock2Query, setStock2Query] = useState("")
    const [stock1Suggestions, setStock1Suggestions] = useState([])
    const [stock2Suggestions, setStock2Suggestions] = useState([])
    const [hasCompared, setHasCompared] = useState(false)
    const fetchSuggestions = async (val, setter) => {
        if (val.length < 2) {
            setter([]);
            return;
        }
        try {
            let token = localStorage.getItem("token");
            let res = await fetch(`${API_BASE}/api/symbols?q=${val}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            let json = await res.json();
            if (json.status && Array.isArray(json.data.quotes)) {
                const filtered = json.data.quotes.filter(
                    (item) =>
                        item.quoteType === "EQUITY" &&
                        (item.symbol.endsWith(".NS") || item.symbol.endsWith(".BO"))
                );
                setter(filtered.slice(0, 10));
            } else {
                setter([]);
            }
        } catch {
            setter([]);
        }
    };

    const handleStock1Change = (e) => {
        const val = e.target.value.toUpperCase();
        setStock1Query(val);
        fetchSuggestions(val, setStock1Suggestions);
    };

    const handleStock2Change = (e) => {
        const val = e.target.value.toUpperCase();
        setStock2Query(val);
        fetchSuggestions(val, setStock2Suggestions);
    };

    const handleStock1Select = (s) => {
        setStock1Query(s.symbol);
        setStock1Suggestions([]);
    };

    const handleStock2Select = (s) => {
        setStock2Query(s.symbol);
        setStock2Suggestions([]);
    };

    const handleCompareClick = () => {
        const regex = /^[A-Z]{2,10}\.(NS|BO)$/
        if (stock1Query === stock2Query) return toast.warning("⚠️ Both stock symbols are the same.")
        if (!regex.test(stock1Query) || !regex.test(stock2Query))
            return toast.error("⚠️ Invalid stock symbol format. Use NSE/BSE symbols (e.g., TCS.NS).")

        onCompare(stock1Query, stock2Query)
        setHasCompared(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="mt-12 md:mt-[100px] px-4 py-8">
            <h1 className="text-center text-white font-bold mb-12 md:mb-[100px] text-3xl md:text-[35px] hover:text-[#89e74e] transition-colors duration-300">
                COMPARE TWO STOCKS
            </h1>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-[100px] relative">
                <div className="w-full lg:w-[35%] relative">
                    <input
                        type="text"
                        value={stock1Query}
                        onChange={handleStock1Change}
                        placeholder="FIRST STOCK NAME"
                        className="w-full h-[65px] md:h-[75px] pl-5 pr-5  text-white text-base md:text-[18px] border-2 rounded-3xl border-[#1e211d] transition-colors duration-300 bg-[#111827] placeholder:font-bold placeholder:text-left placeholder:text-gray-400  focus:outline-none"
                    />
                    {stock1Suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full mt-2 bg-[#1e1e2d] border border-[#333] rounded-xl shadow-lg max-h-60 overflow-y-auto text-white">
                            {stock1Suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleStock1Select(s)}
                                    className="px-4 py-2 hover:bg-[#334155] cursor-pointer"
                                >
                                    <span className="font-semibold">{s.symbol}</span> -{" "}
                                    <span className="text-gray-400">
                                        {s.shortName || s.longName}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="w-full lg:w-[35%] relative">
                    <input
                        type="text"
                        value={stock2Query}
                        onChange={handleStock2Change}
                        placeholder="SECOND STOCK NAME"
                        className="w-full h-[65px] md:h-[75px] pl-5 pr-5 text-white text-[16px] md:text-[18px] border-2 rounded-3xl border-[#1e211d] transition-colors duration-300 bg-[#111827] placeholder:font-bold placeholder:text-left placeholder:text-gray-400 placeholder:text-[18px] focus:outline-none"
                    />
                    {stock2Suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full mt-2 bg-[#1e1e2d] border border-[#333] rounded-xl shadow-lg max-h-60 overflow-y-auto text-white">
                            {stock2Suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleStock2Select(s)}
                                    className="px-4 py-2 hover:bg-[#334155] cursor-pointer"
                                >
                                    <span className="font-semibold">{s.symbol}</span> -{" "}
                                    <span className="text-gray-400">
                                        {s.shortName || s.longName}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center mt-12 md:mt-[100px] space-y-4">
                <button
                    onClick={handleCompareClick}
                    className="w-full max-w-[250px] h-[65px] bg-[#1e1e2d] hover:bg-[linear-gradient(135deg,_#89e74e,_#45732a,_#b02e0c,_#7b1e10)] 
                    border-2 md:border-4 border-[#45732a] px-4 py-2 rounded-2xl transition duration-300 text-sm font-semibold text-gray-400">
                    COMPARE
                </button>

                {hasCompared && (
                    <button
                        onClick={() => {
                            onCompare(null, null)
                            setStock1Query("")
                            setStock2Query("")
                            setStock1Suggestions([])
                            setStock2Suggestions([])
                            setHasCompared(false)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className="w-full max-w-[250px] h-[65px] bg-[#1e1e2d] hover:bg-[linear-gradient(135deg,_#89e74e,_#45732a,_#b02e0c,_#7b1e10)] 
                         border-2 md:border-4 border-[#45732a] px-4 py-2 rounded-2xl transition duration-300 text-sm font-semibold text-gray-400">
                        CLEAR COMPARISON
                    </button>
                )}

            </div>
            <div className="flex flex-col md:flex-row mt-12 md:mt-[100px] justify-center items-center gap-8">
                <input
                    type="text"
                    placeholder="CLICK HERE TO GO HOME!!!"
                    readOnly
                    onClick={() => navigate("/")}
                    className="w-full md:w-1/2 max-w-md h-[70px] md:h-[80px] px-6 text-white text-[16px] 
                    md:text-[18px] border-2 
                    rounded-[40px] border-[#45732a] hover:placeholder:text-[#89e74e] transition-colors duration-300 bg-[#111827] 
                    placeholder:font-bold placeholder:text-center placeholder:text-white focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="CLICK HERE TO EXPLORE!!!"
                    readOnly
                    onClick={() => navigate("/discovery")}
                    className="w-full md:w-1/2 max-w-md h-[70px] md:h-[80px] px-6 text-white text-[16px] md:text-[18px] border-2 rounded-[40px]
                     border-[#45732a] hover:placeholder:text-[#89e74e]
                     transition-colors duration-300 bg-[#111827] placeholder:font-bold placeholder:text-center placeholder:text-white focus:outline-none"
                />
            </div>
        </div>
    )
}
