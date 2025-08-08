export default function FourthOfflineComponents({data}) {
    return (
        <>
            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white border-b-2 border-gray-600 pb-2 mb-4">
                    📊 Analyst Insights
                </h2>

                {!data.analystInsights ? (
                    <p className="text-gray-500">Loading insights...</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                        <div className="space-y-8">
                            <div className="text-center bg-gray-900/50 p-6 rounded-lg">
                                <p className="text-sm font-semibold text-gray-400">Overall Rating</p>
                                <p className="text-4xl font-bold text-green-400 my-2">
                                    {data.analystInsights.overallRating || 'N/A'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Based on {data.analystInsights.totalAnalysts || 0} Analysts
                                </p>
                            </div>

                            <div className="text-center bg-gray-900/50 p-6 rounded-lg">
                                <p className="text-sm font-semibold text-gray-400">Risk Level</p>
                                <p className="text-2xl font-bold text-yellow-400 my-2">
                                    {data.analystInsights.riskLevel || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3 bg-gray-900/50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-3">Recommendation Breakdown</h3>

                            {data.analystInsights.breakdown && data.analystInsights.breakdown.map((item, index) => {
                                const percentage = data.analystInsights.totalAnalysts > 0 ? (item.count / data.analystInsights.totalAnalysts) * 100 : 0;
                                return (
                                    <div className="flex items-center text-sm" key={index}>
                                        <span className="w-24 text-gray-400">{item.name}</span>
                                        <div className="flex-1 bg-gray-700 rounded-full h-2.5 mx-3">
                                            <div
                                                className="h-2.5 rounded-full"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: item.color
                                                }}
                                            ></div>
                                        </div>
                                        <span className="w-8 text-white font-medium">{item.count}</span>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                )}
            </div>

            <div className="bg-[#111827] rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white border-b-2 border-gray-600 pb-2 mb-4">
                    💪 Financial Strength
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
                    <div>
                        <p className="text-gray-400">Debt-to-Equity</p>
                        <p className="text-lg font-semibold text-[#89e74e]">{data.financialStrengths?.debtToEquity}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Current Ratio</p>
                        <p className="text-lg font-semibold text-[#89e74e]">{data.financialStrengths?.currentRatio}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Interest Coverage</p>
                        <p className="text-lg font-semibold text-[#89e74e]">{data.financialStrengths?.interestCoverage}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
