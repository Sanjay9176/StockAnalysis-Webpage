
export default function FirstOfflineComponents({data}) {
    return (
        <>
            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold border-b-2 border-gray-600 pb-3 mb-4">🏢 Company Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm" >
                    <div><p className="text-[#89e74e]"><strong className="text-white">Name:</strong>{" "}{data.name || "Loading..."}</p></div>
                    <div><p className="text-[#89e74e]" ><strong className="text-white">Sector:</strong>{" "} {data.sector || "Loading..."}</p></div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">CEO:</strong> {" "}{data.ceo || "Loading..."}</p></div>
                </div>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold border-b-2 border-gray-600 mb-4">🏢 Company Description</h2>
                <div className="grid grid-cols-1">
                    <div><p>{data.companyDescription || "Loading..."}</p></div>
                </div>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold border-b-2 border-gray-600 pb-3 mb-4">💹 Price Info</h2>
                <div className="grid grid-cols-1  md:grid-cols-3 gap-4 text-sm">
                    <div><p className="text-[#89e74e]"><strong className="text-white">Current Price: </strong>{" "}{data.price || "Loading..."}</p></div>
                    <div>
                        <p className={`${data.netChange != null ? data.netChange > 0 ? 'text-[#89e74e]' : 'text-red-500' : 'text-white'}`}>
                            <strong className="text-white">Change: </strong>
                            {data.netChange != null ? `${data.netChange > 0 ? '+' : ''}${data.netChange} (${data.percentChange}%)` : 'Loading...'}
                        </p>
                    </div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">52 Week High/Low:</strong>{" "}₹{data.week52High || "?"} / ₹{data.week52Low || "?"}</p></div>
                </div>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold border-b-2 border-gray-600 pb-3 mb-4">📐 Technicals</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-sm">
                    <div><p className="text-[#89e74e]"><strong className="text-white">BETA:</strong>{" "}{data.beta ? `${data.beta} (${parseFloat(data.beta) > 1 ? `${Math.round((parseFloat(data.beta) - 1) * 100)}% more` : `${Math.round((1 - parseFloat(data.beta)) * 100)}% less`}
               volatile than market)`: "Loading..."}</p></div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">10DAYS MA:</strong> {" "}₹{data.ma10 || "Loading..."}</p></div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">50DAYS MA:</strong>{" "}₹{data.ma50 || "Loading..."}</p></div>
                    <div><p className="text-[#89e74e]"><strong className="text-white">100DAYS MA:</strong>{" "}₹{data.ma100 || "Loading..."}</p></div>
                    <div className="mt-[10px]"><p className="text-[#89e74e]"><strong className="text-white">300DAYS MA:</strong>{" "}₹{data.ma300 || "Loading..."}</p></div>
                    <div className="mt-[10px]"><p className="text-[#89e74e]"><strong className="text-white">AvgVolume 10Days:</strong>{" "}{data.AvgVolume10Days || "Loading..."} %</p></div>
                    <div className="mt-[10px]"><p className="text-[#89e74e]"><strong className="text-white">AvgVolume 3Month:</strong>{" "}{data.AvgVolume3Month || "Loading..."} %</p></div>
                </div>
            </div>
        </>
    )
}
