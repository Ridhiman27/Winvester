# from datetime import date
# import pandas as pd
# from jugaad_data.nse import bhavcopy_save, bhavcopy_fo_save

# # Download bhavcopy
# # bhavcopy_save(date(2020,1,1), "/")

# # # Download bhavcopy for futures and options
# # bhavcopy_fo_save(date(2020,1,1), "/")

# # Download stock data to pandas dataframe
# from jugaad_data.nse import stock_df
# nifty_50_symbols = ['ADANIPORTS', 'ASIANPAINT', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE', 'BAJAJFINSV', 'BHARTIARTL', 'BPCL', 'BRITANNIA', 'CIPLA', 'COALINDIA', 'DIVISLAB', 'DRREDDY', 'EICHERMOT', 'GRASIM', 'HCLTECH', 'HDFC', 'HDFCBANK', 'HDFCLIFE', 'HEROMOTOCO', 'HINDALCO', 'HINDUNILVR', 'ICICIBANK', 'INDUSINDBK', 'INFY', 'IOC', 'ITC', 'JSWSTEEL', 'KOTAKBANK', 'LT', 'M&M', 'MARUTI', 'NESTLEIND', 'NTPC', 'ONGC', 'POWERGRID', 'RELIANCE', 'SBILIFE', 'SBIN', 'SHREECEM', 'SUNPHARMA', 'TATAMOTORS', 'TATASTEEL', 'TATACONSUM', 'TECHM', 'TITAN', 'ULTRACEMCO', 'UPL', 'WIPRO']

# frames = []
# for i in range(len(nifty_50_symbols)):
#     df = stock_df(symbol=nifty_50_symbols[i], from_date=date(2023,4,27),
#             to_date=date(2023,4,27), series="EQ")
#     frames.append(df)

# result = pd.concat(frames)
# print(result)
# result.to_csv("stocks.csv")

import pandas as pd
import numpy as np
import scipy.optimize as sco

def MPT():
    # Import data for each asset class
    stocks_data = pd.read_csv('stocks.csv')
    gold_data = pd.read_csv('gold.csv')
    mutual_funds_data = pd.read_csv('mutualfunds.csv')

    # Reset index of each data frame to a unique identifier
    stocks_data = stocks_data.set_index('Date').reset_index()
    gold_data = gold_data.set_index('Date').reset_index()
    mutual_funds_data = mutual_funds_data.set_index('Date').reset_index()

    # Merge data into a single DataFrame
    data = pd.concat([stocks_data, gold_data, mutual_funds_data], axis=1)
    data = data.drop(columns='Net Asset Value')


    # Calculate returns for each asset class
    returns = data.pct_change().dropna()

    # Calculate mean returns for each asset class
    mean_returns = returns.mean()

    # Calculate covariance matrix for returns
    cov_matrix = returns.cov()

    # Define objective function to minimize portfolio risk for a given expected return
    def objective_function(weights, mean_returns, cov_matrix, target_return):
        portfolio_return = np.sum(mean_returns * weights) * 252
        portfolio_std_dev = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights))) * np.sqrt(252)
        penalty = 100 * abs(portfolio_return - target_return)
        return portfolio_std_dev + penalty

    # Define constraint function to ensure weights sum to 1 and allocate at least some minimum percentage to each asset class
    def constraint_function(weights, min_allocations):
        for i in range(len(min_allocations)):
            weights[i] -= min_allocations[i]
        return np.sum(weights)

    # Set optimization bounds
    num_assets = len(data.columns)
    bounds = sco.Bounds(0, 1)

    # Set minimum allocation percentages for each asset class
    min_allocations = [0.1, 0.05, 0.05]

    # Perform mean-variance optimization to find optimal weights
    result = sco.minimize(objective_function, np.ones(num_assets) / num_assets, args=(mean_returns, cov_matrix, 0.1), method='SLSQP', constraints={'type': 'eq', 'fun': lambda weights: constraint_function(weights, min_allocations)}, bounds=bounds)

    mutual_funds_list = ["Motilal Oswal Focused 25 Fund (MOF25) - Direct Plan Dividend Option",          "Motilal Oswal Focused 25 Fund (MOF25) - Regular Plan Dividend Option",          "Motilal Oswal Focused 25 Fund (MOF25)- Direct Plan Growth Option",          "Motilal Oswal Focused 25 Fund (MOF25)- Regular Plan Growth Option",          "SBI FOCUSED EQUITY FUND - DIRECT PLAN - DIVIDEND",          "SBI FOCUSED EQUITY FUND - DIRECT PLAN -GROWTH",          "SBI FOCUSED EQUITY FUND - REGULAR  PLAN - DIVIDEND",          "SBI FOCUSED EQUITY FUND - REGULAR PLAN -GROWTH",          "Baroda Banking And Financial Services Fund - Plan A - Bonus Option",          "Baroda Banking and Financial Services Fund - Plan A - Dividend",          "Baroda Banking and Financial Services Fund - Plan A - Growth Option",          "Sundaram Select Focus - Direct Plan - Dividend Option",          "Sundaram Select Focus - Direct Plan - Growth Option",          "Sundaram Select Focus-Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Growth",          "Aditya Birla Sun Life Banking and Financial Services Fund - Regular Plan - Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Regular Plan - Growth",          "HDFC Focused 30 Fund - DIVIDEND",          "HDFC Focused 30 Fund - GROWTH",          "HDFC Focused 30 Fund -Direct Plan - Dividend Option",          "ICICI Prudential Focused Equity Fund - Direct Plan - Dividend",          "ICICI Prudential Focused Equity Fund - Direct Plan - Growth",          "ICICI Prudential Focused Equity Fund - Dividend"]
    tempList = []
    for fund in mutual_funds_list:
        temp = ""
        for i in range(fund):
            if fund[i] == " ":
                temp += "_"
            else:
                temp += fund[i]
        tempList.append(temp)
    mutual_funds_list = tempList

    stocks_list = ['ADANIPORTS', 'ASIANPAINT', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE', 'BAJAJFINSV', 'BHARTIARTL', 'BPCL', 'BRITANNIA', 'CIPLA', 'COALINDIA', 'DRREDDY', 'EICHERMOT', 'GRASIM', 'HCLTECH', 'HDFC', 'HDFCBANK', 'HEROMOTOCO', 'HINDALCO', 'HINDUNILVR', 'ICICIBANK', 'INDUSINDBK', 'INFY', 'IOC', 'ITC', 'JSWSTEEL', 'KOTAKBANK', 'LT', 'MM', 'MARUTI', 'NESTLEIND', 'NTPC', 'ONGC', 'POWERGRID', 'RELIANCE', 'SBIN', 'SHREECEM', 'SUNPHARMA', 'TATAMOTORS', 'TATASTEEL', 'TCS', 'TECHM', 'TITAN', 'ULTRACEMCO', 'UPL', 'WIPRO']

    # Print optimal weights
    print('Optimal weights:')
    stock = 0
    mutualFunds = 0
    for i in range(num_assets):
        if(data.columns[i] in stocks_list):
            stock += result.x[i]
        elif (data.columns[i] in mutual_funds_list):
            mutualFunds += result.x[i]
        else:
            print(f'{data.columns[i]} : {result.x[i]:.2%}')
        # print(f'{data.columns[i]}: {result.x[i]:.2%}')
    print(f"Stock : {stock}")
    print(f"Mutual Funds: {mutualFunds}")
    # Calculate expected return and standard deviation for optimal portfolio
    optimal_return = np.sum(mean_returns * result.x) * 252
    optimal_std_dev = np.sqrt(np.dot(result.x.T, np.dot(cov_matrix, result.x))) * np.sqrt(252)

    # Print expected return and standard deviation for optimal portfolio
    print(f'Expected return: {optimal_return:.2%}')
    print(f'Standard deviation: {optimal_std_dev:.2%}')


MPT()
