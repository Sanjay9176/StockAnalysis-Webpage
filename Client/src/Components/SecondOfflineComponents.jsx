export default function SecondOfflineComponents({data}) {
    return (
        <>
            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold border-b-2 border-gray-600 pb-3 mb-4">📊 Financials</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[660px] text-white border-collapse">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-2 px-4">Metric</th>
                                <th className="py-2 px-4">3Y Growth</th>
                                <th className="py-2 px-4">5Y Growth</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800">
                                <td className="py-2 px-4 ">Revenue Growth</td>
                                <td className={`py-2 px-4 ${typeof data.revenueGrowth3Y === "number" ? data.revenueGrowth3Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.revenueGrowth3Y)?.toFixed(2) || "Loading..."} %</td>
                                <td className={`py-2 px-4 ${typeof data.revenueGrowth5Y === "number" ? data.revenueGrowth5Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.revenueGrowth5Y)?.toFixed(2) || "Loading..."} %</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-2 px-4 ">Net Profit Growth</td>
                                <td className={`py-2 px-4 ${typeof data.netProfitGrowth3Y === "number" ? data.netProfitGrowth3Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.netProfitGrowth3Y)?.toFixed(2) || "Loading..."} %</td>
                                <td className={`py-2 px-4 ${typeof data.netProfitGrowth5Y === "number" ? data.netProfitGrowth5Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.netProfitGrowth5Y)?.toFixed(2) || "Loading..."} %</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-2 px-4 ">EPS Growth</td>
                                <td className={`py-2 px-4 ${typeof data.epsGrowth3Y === "number" ? data.epsGrowth3Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.epsGrowth3Y)?.toFixed(2) || "Loading..."} %</td>
                                <td className={`py-2 px-4 ${typeof data.epsGrowth5Y === "number" ? data.epsGrowth5Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.epsGrowth5Y)?.toFixed(2) || "Loading..."} %</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-2 px-4 ">Operating Profit Margin</td>
                                <td className={`py-2 px-4 ${typeof data.opProfitMargin3Y === "number" ? data.opProfitMargin3Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.opProfitMargin3Y)?.toFixed(2) || "Loading..."} %</td>
                                <td className={`py-2 px-4 ${typeof data.opProfitMargin5Y === "number" ? data.opProfitMargin5Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.opProfitMargin5Y)?.toFixed(2) || "Loading..."} %</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 ">Net Profit Margin</td>
                                <td className={`py-2 px-4 ${typeof data.netProfitMargin3Y === "number" ? data.netProfitMargin3Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.netProfitMargin3Y)?.toFixed(2) || "Loading..."} %</td>
                                <td className={`py-2 px-4 ${typeof data.netProfitMargin5Y === "number" ? data.netProfitMargin5Y >= 0 ?
                                    "text-[#89e74e]" : "text-red-500" : "text-white"}`}>
                                    {Number(data.netProfitMargin5Y)?.toFixed(2) || "Loading..."} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold border-b-2 border-gray-600 pb-3 mb-4">📈 Shareholding Pattern</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><p className="text-[#89e74e]"><strong className="text-white">Promoters:</strong>{" "}{data.PromoterHolding || "Loading..."}%</p></div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">FII:</strong>{" "} {data.fIIHolding || "Loading..."}%</p></div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">DII:</strong> {" "}{data.DIIHolding || "Loading..."}%</p></div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">Public:</strong> {" "}{data.PublicHolding || "Loading..."}%</p></div>
                </div>
            </div>
        </>
    )
}
