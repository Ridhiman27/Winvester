
def valueAssetRisk(u,alpha,sigma):
    """

    µi --> stands for the expected return
    alpha --> confidence level
    sigma --> is the conditional risk factor (volatility). In turn,
    Asseti denotes the mark-to-market value,
    Fxi--> is the foreign exchange unit for this specific trading asset
    To obtain the overall VaR value of a portfolio, the effects of each component of the portfolio must be aggregated taking
    into account the conditional volatility for each class of assets and the correlations parameters [ρi,j] among the different
    assets
    
    """

    #TODO: Get asset and foreign exchange values for specific api
    asset = 0
    fx = 0
    return ((u-alpha*sigma)/(asset*fx))