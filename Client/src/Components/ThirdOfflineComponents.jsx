export default function ThirdOfflineComponents({data}) {
    return (
        <>
            <div className="bg-[#111827] rounded-xl p-6 shadow-lg ">
                <h2 className="text-xl md:text-2xl font-bold border-b-2 border-gray-600 pb-3 mb-4">🏦 Corporate Actions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
                    <div className="border border-gray-700 h-full overflow-x-auto">
                        <table className="w-full h-full text-left text-white border-collapse">
                            <thead>
                                <tr className="border-b  border-gray-700">
                                    <th className="py-2 px-4  border-r border-gray-700">Latest Dividend</th>
                                    <th className="py-2 px-4">Value</th>
                                </tr>
                            </thead>
                            <tbody  >
                                <tr className="border-b border-gray-800">
                                    <td className="py-2 px-4 border-r border-gray-700">Ex-Date</td>
                                    <td className="py-2 px-4 text-[#89e74e]">{data.latestCorporateActions?.latestDividend?.exDate || 'NA'}</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2 px-4 border-r border-gray-700">Amount Per Share</td>
                                    <td className="py-2 px-4 text-[#89e74e]">{data.latestCorporateActions?.latestDividend?.amountPerShare || 'NA'}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-r border-gray-700">Remarks</td>
                                    <td className="py-2 px-4 text-[#89e74e]">{data.latestCorporateActions?.latestDividend?.remarks || 'NA'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-gray-700 h-full overflow-x-auto">
                        <table className="w-full h-full text-left text-white border-collapse">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2 px-4 border-r border-gray-700">Latest Split</th>
                                    <th className="py-2 px-4">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2 px-4 border-r border-gray-700">Ex-Date</td>
                                    <td className="py-2 px-4 text-[#89e74e]">{data.latestCorporateActions?.latestSplit?.exDate || 'NA'}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-r border-gray-700 border-b">Remarks</td>
                                    <td className="py-2 px-4 text-[#89e74e] border-b border-gray-700">{data.latestCorporateActions?.latestSplit?.remarks || 'NA'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-gray-700 h-full overflow-x-auto">
                        <table className="w-full text-left text-white border-collapse h-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2 px-4 border-r border-gray-700">Latest Meeting</th>
                                    <th className="py-2 px-4">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2 px-4 border-r border-gray-700">Ex-Date</td>
                                    <td className="py-2 px-4 text-[#89e74e]">{data.latestCorporateActions?.latestMeeting?.date || 'NA'}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-r border-gray-700 border-b ">Remarks</td>
                                    <td className="py-2 px-4 text-[#89e74e] border-b  border-gray-700">{data.latestCorporateActions?.latestMeeting?.purpose || 'NA'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div className="bg-[#111827] rounded-xl p-6 shadow-lg ">
                <h2 className="text-xl md:text-2xl font-bold border-b-2 border-gray-600 pb-3 mb-4">📰 News</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-white border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-2 px-4 ">Date</th>
                                <th className="py-2 px-4 ">Headline</th>
                                <th className="py-2 px-4 ">URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.latestRecentNews.map((item, i) => (
                                <tr className="border-b border-gray-800" key={i}>
                                    <td className="py-2 px-4 hover:text-[#89e74e] transition-colors duration-100 ">{item.date}</td>
                                    <td className="py-2 px-4 hover:text-[#89e74e] transition-colors duration-100 " >{item.headline}</td>
                                    <td className="py-2 px-4"><a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Read More</a></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}
