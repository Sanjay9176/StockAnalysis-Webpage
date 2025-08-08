const fetch = require('node-fetch')
const OfflineAnalysis = async (req, res) => {
  const symbol = req.params.symbol
  const url = `https://indian-stock-exchange-api2.p.rapidapi.com/stock?name=${encodeURIComponent(symbol)}`

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'indian-stock-exchange-api2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options)
    const result = await response.json()

    const findValueByKey = (arr, keyname) => {
      if (!arr || !Array.isArray(arr)) return null
      const found = arr.find(item => item?.key === keyname)
      return found?.value ?? null
    }

    const sumOverYears = (financials, key, years) => {
      return years.reduce((sum, year) => {
        const fy = financials.find(f => f.FiscalYear === year)
        const incData = fy?.stockFinancialMap?.INC || [];
        const value = parseFloat(findValueByKey(incData, key)) || 0
        return sum + value;
      }, 0)
    }

    const calculateMargins = (financials, incomeKey, years) => {
      const totalIncome = sumOverYears(financials, incomeKey, years)
      const totalRevenue = sumOverYears(financials, "TotalRevenue", years)
      return totalRevenue ? (totalIncome / totalRevenue) * 100 : null
    }

    const calculateCAGR = (startVal, endVal, years) => {
      if (!startVal || !endVal || startVal <= 0 || years <= 0) return null;
      return (Math.pow(endVal / startVal, 1 / years) - 1) * 100;
    };

    const getNsePriceByDays = (arr, daysValue) => {
      const found = arr.find(item => item?.days === daysValue);
      return found?.nsePrice ?? 'N/A';
    }

    const getshareholdingpercentage = (data, keyword) => {
      const lowerCaseKeyword = keyword.toLowerCase()
      const category = data.find(c => c?.categoryName?.toLowerCase().includes(lowerCaseKeyword))
      if (!category) {
        return 'NA'
      }
      const categories = category.categories
      if (categories && categories.length > 0) {
        const latestvalue = categories[categories.length - 1]
        return parseFloat(latestvalue.percentage).toFixed(2)
      }
      return 'NA'
    }

    const getcorporateActionData = (data) => {
      if (!data) {
        return {
          latestDividend: 'N/A',
          latestSplit: 'N/A',
          latestMeeting: 'N/A'
        }
      }
      const latestDividend = (data.dividend && data.dividend.length > 0) ? {
        exDate: data.dividend[0].xdDate,
        amountPerShare: data.dividend[0].value,
        remarks: data.dividend[0].remarks
      } :
        "NA"
      const latestSplit = (data.splits && data.splits.length > 0) ? {
        exDate: data.splits[0].xsDate,
        remarks: data.splits[0].remarks
      } :
        "NA"
      const latestMeeting = (data.boardMeetings && data.boardMeetings.length > 0) ? {
        date: data.boardMeetings[0].boardMeetDate,
        purpose: data.boardMeetings[0].purpose
      } :
        "NA"
      return {
        latestDividend,
        latestSplit,
        latestMeeting
      }
    }

    const getRecentNews = (newsdata) => {
      if (!Array.isArray(newsdata)) {
        return 'NA'
      }
      const topfournews = newsdata.slice(0, 4)
      return topfournews.map(article => (
        {
          date: article.date,
          headline: article.headline,
          url: article.url
        }
      ))
    }

    const getAnalystInsights = (recosBar, riskMeter) => {
      if (!recosBar || !riskMeter) {
        return {
          overallRating: 'N/A',
          totalAnalysts: 0,
          riskLevel: 'N/A',
          breakdown: []
        }
      }
      const getRatingText = (mean) => {
        if (mean < 1.8) return 'Strong Buy';
        if (mean < 2.6) return 'Buy';
        if (mean < 3.4) return 'Hold';
        if (mean < 4.2) return 'Sell';
        return 'Strong Sell';
      }
      const breakdown = (recosBar.stockAnalyst || []).map(item => ({
        name: item.ratingName,
        count: item.numberOfAnalysts,
        color: item.colorCode
      }))
      return {
        overallRating: getRatingText(recosBar.meanValue),
        totalAnalysts: recosBar.noOfRecommendations,
        riskLevel: riskMeter.categoryName,
        breakdown: breakdown
      }
    }

    const getFinancialStrength = (data) => {
      if (!data) {
        return {
          debtToEquity: 'N/A',
          currentRatio: 'N/A',
          interestCoverage: 'N/A'
        };
      }
      const debtToEquity = findValueByKey(data, 'totalDebtPerTotalEquityMostRecentQuarter') || 'N/A'
      const currentRatio = findValueByKey(data, 'currentRatioMostRecentQuarter') || 'N/A'
      const interestCoverage = findValueByKey(data, 'netInterestCoverageTrailing12Month') || 'N/A'
      return {
        debtToEquity,
        currentRatio,
        interestCoverage
      };
    }


    const peerList = result?.companyProfile?.peerCompanyList || []
    const priceAndVolume = result?.keyMetrics?.priceandVolume || []
    const stockTechnical = result?.stockTechnicalData || []
    const keyMetricsGrowth = result?.keyMetrics?.growth || []
    const financials = result?.financials || []
    const shareholdingData = result?.shareholding || []
    const CorporateActionData = result?.stockCorporateActionData || []
    const RecentNews = result?.recentNews || []
    const AnalystInsightsBarData = result?.recosBar || null
    const AnalystInsightsriskMeter = result?.riskMeter || null
    const keyMetricsfinancialstrength = result?.keyMetrics?.financialstrength || []




    const years3Y = ["2025", "2024", "2023"]
    const years5Y = ["2025", "2024", "2023", "2022", "2021"]

    const revenueGrowth5Y = parseFloat(findValueByKey(keyMetricsGrowth, "revenueGrowthRate5Year")) || null
    const epsGrowth5Y = parseFloat(findValueByKey(keyMetricsGrowth, "ePSGrowthRate5Year")) || null
    const revenueGrowth3Y = parseFloat(findValueByKey(keyMetricsGrowth, "growthRatePercentRevenue3Year")) || null
    const epsGrowth3Y = parseFloat(findValueByKey(keyMetricsGrowth, "growthRatePercentEPS3year")) || null


    const netProfitMargin3Y = calculateMargins(financials, "NetIncome", years3Y)
    const netProfitMargin5Y = calculateMargins(financials, "NetIncome", years5Y)
    const opProfitMargin3Y = calculateMargins(financials, "OperatingIncome", years3Y)
    const opProfitMargin5Y = calculateMargins(financials, "OperatingIncome", years5Y)

    const netIncome2025 = parseFloat(findValueByKey(financials.find(f => f.FiscalYear === "2025")?.stockFinancialMap?.INC, "NetIncome"))
    const netIncome2022 = parseFloat(findValueByKey(financials.find(f => f.FiscalYear === "2022")?.stockFinancialMap?.INC, "NetIncome"))
    const netIncome2020 = parseFloat(findValueByKey(financials.find(f => f.FiscalYear === "2020")?.stockFinancialMap?.INC, "NetIncome"))

    const netProfitGrowth3Y = calculateCAGR(netIncome2022, netIncome2025, 3)
    const netProfitGrowth5Y = calculateCAGR(netIncome2020, netIncome2025, 5)

    const beta = findValueByKey(priceAndVolume, "beta") || 'NA'
    const ma10 = getNsePriceByDays(stockTechnical, 10)
    const ma50 = getNsePriceByDays(stockTechnical, 50)
    const ma100 = getNsePriceByDays(stockTechnical, 100)
    const ma300 = getNsePriceByDays(stockTechnical, 300)
    const AvgVolume10Days = findValueByKey(priceAndVolume, "avgTradingVolumeLast10Days") || 'NA'
    const AvgVolume3Month = findValueByKey(priceAndVolume, "avgTradingVolumeLast3months") || 'NA'

    const PromoterHolding = getshareholdingpercentage(shareholdingData, "Promoter")
    const fIIHolding = getshareholdingpercentage(shareholdingData, "FII")
    const DIIHolding = getshareholdingpercentage(shareholdingData, "Mutual Fund")
    const PublicHolding = getshareholdingpercentage(shareholdingData, "Other")

    const latestCorporateActions = getcorporateActionData(CorporateActionData)

    const latestRecentNews = getRecentNews(RecentNews)

    const analystInsights = getAnalystInsights(AnalystInsightsBarData, AnalystInsightsriskMeter)

    const financialStrengths = getFinancialStrength(keyMetricsfinancialstrength)

    const actualPeer = peerList.find(p => p.companyName?.toLowerCase() === result.companyName?.toLowerCase())

    const officers = result?.companyProfile?.officers?.officer
    const ceoData = Array.isArray(officers) ? officers.find((officer) => {
      const title = officer?.title
      return (
        title?.iD1?.toLowerCase().includes('ceo') ||
        title?.abbr1?.toLowerCase().includes('ceo') ||
        title?.Value?.toLowerCase().includes('chief executive')
      )
    }) : null

    const ceoFullName = ceoData
      ? `${ceoData.firstName || ''} ${ceoData.mI || ''} ${ceoData.lastName || ''}`.replace(/\s+/g, ' ').trim()
      : 'N/A'

    return res.json({
      name: result.companyName || 'N/A',
      sector: result.industry || result.mgIndustry || 'N/A',
      ceo: ceoFullName,
      companyDescription: result?.companyProfile?.companyDescription || 'N/A',

      price: actualPeer?.price ?? 'N/A',
      percentChange: actualPeer?.percentChange ?? 'N/A',
      netChange: actualPeer?.netChange ?? 'N/A',
      week52High: actualPeer?.yhigh ?? 'N/A',
      week52Low: actualPeer?.ylow ?? 'N/A',

      beta: beta,
      ma10: ma10,
      ma50: ma50,
      ma100: ma100,
      ma300: ma300,
      AvgVolume10Days: AvgVolume10Days,
      AvgVolume3Month: AvgVolume3Month,


      revenueGrowth5Y: revenueGrowth5Y,
      epsGrowth5Y: epsGrowth5Y,
      netProfitMargin3Y: netProfitMargin3Y,
      netProfitMargin5Y: netProfitMargin5Y,
      opProfitMargin3Y: opProfitMargin3Y,
      opProfitMargin5Y: opProfitMargin5Y,
      netProfitGrowth3Y: netProfitGrowth3Y,
      netProfitGrowth5Y: netProfitGrowth5Y,
      revenueGrowth3Y: revenueGrowth3Y,
      epsGrowth3Y: epsGrowth3Y,

      PromoterHolding: PromoterHolding,
      fIIHolding: fIIHolding,
      DIIHolding: DIIHolding,
      PublicHolding: PublicHolding,

      latestCorporateActions: latestCorporateActions,

      latestRecentNews: latestRecentNews,

      analystInsights: analystInsights,

      financialStrengths:financialStrengths


    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
module.exports = {OfflineAnalysis }