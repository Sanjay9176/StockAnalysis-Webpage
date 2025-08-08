import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {Changechip, formatLargeNumber } from "../Components/StockHelpers"
export default function StockDetail({ API_BASE, symbol, range, setRange }) {
  const [interval, setInterval]       = useState("1h");
  const [rawdata, setRawdata]         = useState(null);
  const [loading, setLoading]         = useState(false);
  const [err, setErr]                 = useState("");
  const [fundamentals, setFundamentals] = useState(null);
  const getSafeInterval = (r) => {
    if (["1d", "5d"].includes(r)) return "1h";
    if (["1mo", "3mo", "6mo", "1y", "2y"].includes(r)) return "1d";
    if (["5y", "10y", "max"].includes(r)) return "1wk";
    return "1d";
  };
  useEffect(() => setInterval(getSafeInterval(range)), [range]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); setErr("");
        const token = localStorage.getItem("token");
        const url   = `${API_BASE}/lexpo/LiveAnalysis?symbol=${symbol}&interval=${interval}&range=${range}`;
        const res   = await fetch(url, { headers: { Authorization:`Bearer ${token}` }, cache:"no-store" });
        const json  = await res.json();
        const { status, msg, data } = json;
        if (!status) throw new Error(msg);
        if (!data?.chart?.result?.[0]) throw new Error("No chart data returned");

        setRawdata(data.chart.result[0]);

        if (data.summary) {
          const s = data.summary;
          const safe = (obj,k)=> (obj?.[k]?.fmt ?? obj?.[k] ?? "N/A");
          setFundamentals({
            marketCap:    safe(s.summaryDetail,"marketCap"),
            peRatio:      safe(s.summaryDetail,"trailingPE"),
            eps:          safe(s.defaultKeyStatistics,"trailingEps"),
            dividendYield:safe(s.summaryDetail,"dividendYield"),
            roe:          safe(s.financialData,"returnOnEquity"),
            roce:         safe(s.financialData,"returnOnAssets"),
            debtToEquity: safe(s.financialData,"debtToEquity"),
            freeCashFlow: safe(s.financialData,"freeCashflow"),
            week52High:   safe(s.summaryDetail,"fiftyTwoWeekHigh"),
            week52Low:    safe(s.summaryDetail,"fiftyTwoWeekLow"),
          });
        } else setFundamentals(null);

      } catch (e) { setErr(e.message); }
      finally     { setLoading(false); }
    };
    fetchData();
  }, [symbol, interval, range]);

  const chartdata = useMemo(() => {
    if (!rawdata?.timestamp?.length) return [];
    const ts = rawdata.timestamp;
    const q  = rawdata.indicators.quote[0];
    return ts.map((t,i)=>{
      const d=new Date(t*1000);
      return {
        timestamp: t,
        time:      d.toLocaleTimeString("en-IN",{ timeZone:rawdata.meta.timezone,hour:"2-digit",minute:"2-digit"}),
        fullDate:  d.toLocaleDateString("en-IN",{ day:"2-digit",month:"short",year:"numeric"}),
        open:  q.open?.[i]   ?? 0,
        high:  q.high?.[i]   ?? 0,
        low:   q.low?.[i]    ?? 0,
        close: q.close?.[i]  ?? 0,
        volume:q.volume?.[i] ?? null,
      };
    });
  },[rawdata]);

  const last = chartdata.at(-1);
  const rangeOptions = ["1d","5d","1mo","3mo","6mo","1y","5y","max"];

  return (
    <div className="p-4 md:p-6 text-white space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold">{symbol}</h2>
          {rawdata?.meta?.shortName &&
            <p className="text-sm text-gray-300 mt-1">({rawdata.meta.shortName})</p>}
        </div>

        {last && rawdata &&
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-2xl font-semibold text-green-400">₹{last.close.toFixed(2)}</p>
            <Changechip last={last} prevClose={rawdata.meta.chartPreviousClose}/>
          </div>}
      </div>
      <div className="flex flex-wrap gap-2">
        {rangeOptions.map(opt=>(
          <button key={opt}
            onClick={()=>setRange(opt)}
            className={`px-3 py-1 rounded ${range===opt?"bg-[#89e74e] text-black":"bg-[#111827] hover:bg-[#334155]"} text-sm transition-colors`}>
            {opt}
          </button>))}
      </div>
      <div className="bg-[#111827] rounded-xl p-4 h-[300px] md:h-[400px] flex items-center justify-center shadow-lg">
        {loading? <p className="text-gray-400">Loading...</p> :
         err?     <p className="text-red-400">⚠️ {err.includes("No chart")?"This stock is not supported for charting.":err}</p> :
         chartdata.length?(
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartdata}>
                <XAxis dataKey={range==="1d"?"time":"fullDate"} hide axisLine={false} tickLine={false}/>
                <YAxis domain={["dataMin","dataMax"]} axisLine={false} tickLine={false} tick={{fill:"#ccc",fontSize:12}} width={50}/>
                <Tooltip content={({active,payload})=>{
                  if(active&&payload?.length){
                    const d=payload[0].payload;
                    return (
                      <div className="bg-[#1f2937] text-white p-2 rounded-lg text-sm">
                        <p>{range==="1d"?d.time:d.fullDate}</p>
                        <p className="text-green-400">₹{d.close.toFixed(2)}</p>
                      </div>);
                  } return null;}}/>
                <Line type="monotone" dataKey="close" stroke="#89e74e" strokeWidth={2.5} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          ):<p className="text-gray-400">No Data</p>}
      </div>
      {fundamentals &&
        <div className="bg-[#111827] rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">📊 Fundamental Data</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-gray-400">Market Cap:</span> ₹{formatLargeNumber(fundamentals.marketCap)}</div>
            <div><span className="text-gray-400">P/E Ratio:</span> {fundamentals.peRatio}</div>
            <div><span className="text-gray-400">EPS:</span> ₹{fundamentals.eps}</div>
            <div><span className="text-gray-400">Dividend Yield:</span> {fundamentals.dividendYield}%</div>
            <div><span className="text-gray-400">ROE:</span> {fundamentals.roe}%</div>
            <div><span className="text-gray-400">ROCE:</span> {fundamentals.roce}%</div>
            <div><span className="text-gray-400">Debt/Equity:</span> {fundamentals.debtToEquity}</div>
            <div><span className="text-gray-400">Free Cash Flow:</span> ₹{formatLargeNumber(fundamentals.freeCashFlow)}</div>
            <div><span className="text-gray-400">52W Range:</span> ₹{fundamentals.week52Low} - ₹{fundamentals.week52High}</div>
          </div>
        </div>}
      {last &&
        <div className="bg-[#111827] rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">📈 Latest session</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-gray-400">Open:</span> ₹{last.open.toFixed(2)}</div>
            <div><span className="text-gray-400">High:</span> ₹{last.high.toFixed(2)}</div>
            <div><span className="text-gray-400">Low:</span> ₹{last.low.toFixed(2)}</div>
            <div><span className="text-gray-400">Close:</span> ₹{last.close.toFixed(2)}</div>
            <div><span className="text-gray-400">Volume:</span> {last.volume?last.volume.toLocaleString("en-IN"):"N/A"}</div>
          </div>
        </div>}
    </div>
  );
}
