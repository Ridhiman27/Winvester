from flask import Flask,request,jsonify
import os
import pickle
import pandas as pd
import numpy as np
import scipy.optimize as sco
import flask_cors
import json
from newsapi import NewsApiClient


app = Flask(__name__)
flask_cors.CORS(app)
model = pickle.load(open('ADANIPORTS', 'rb'))

# list_csv = sorted(os.listdir("Nifty50"))

# df = pd.read_csv("ADANIPORTS.csv")
data = pd.read_csv("ADANIPORTS.csv")
values = data[['Open', 'High', 'Low', 'Close']].values

newsapi = NewsApiClient(api_key='212ddd1515a94319b104eb15647b72db')

top_headlines = newsapi.get_top_headlines(category='business',country='in')

@app.route('/news')
def news():
    return top_headlines


@app.route('/risk-calculation')
# first version
def mpt():

    # Import data for each asset class
    stocks_data = pd.read_csv('stocks.csv')
    gold_data = pd.read_csv('gold.csv')
    mutual_funds_data = pd.read_csv('mutualfunds.csv')

    # Merge data into a single DataFrame
    data = pd.concat([stocks_data, gold_data, mutual_funds_data], axis=1)
    data.replace(np.nan,0)

    # Calculate returns for each asset class
    returns = data.pct_change()
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

    # Define constraint function to ensure weights sum to 1
    def constraint_function(weights):
        return np.sum(weights) - 1

    # Set initial guess for weights
    num_assets = len(data.columns)
    weights = np.ones(num_assets) / num_assets

    # Set target return and optimization bounds
    target_return = 0.1
    bounds = sco.Bounds(0, 1)

    # Perform mean-variance optimization to find optimal weights
    result = sco.minimize(objective_function, weights, args=(mean_returns, cov_matrix, target_return), method='SLSQP', constraints={'type': 'eq', 'fun': constraint_function}, bounds=bounds)
    
    
    mutual_funds_list = ["Motilal Oswal Focused 25 Fund (MOF25) - Direct Plan Dividend Option",          "Motilal Oswal Focused 25 Fund (MOF25) - Regular Plan Dividend Option",          "Motilal Oswal Focused 25 Fund (MOF25)- Direct Plan Growth Option",          "Motilal Oswal Focused 25 Fund (MOF25)- Regular Plan Growth Option",          "SBI FOCUSED EQUITY FUND - DIRECT PLAN - DIVIDEND",          "SBI FOCUSED EQUITY FUND - DIRECT PLAN -GROWTH",          "SBI FOCUSED EQUITY FUND - REGULAR  PLAN - DIVIDEND",          "SBI FOCUSED EQUITY FUND - REGULAR PLAN -GROWTH",          "Baroda Banking And Financial Services Fund - Plan A - Bonus Option",          "Baroda Banking and Financial Services Fund - Plan A - Dividend",          "Baroda Banking and Financial Services Fund - Plan A - Growth Option",          "Sundaram Select Focus - Direct Plan - Dividend Option",          "Sundaram Select Focus - Direct Plan - Growth Option",          "Sundaram Select Focus-Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Growth",          "Aditya Birla Sun Life Banking and Financial Services Fund - Regular Plan - Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Regular Plan - Growth",          "HDFC Focused 30 Fund - DIVIDEND",          "HDFC Focused 30 Fund - GROWTH",          "HDFC Focused 30 Fund -Direct Plan - Dividend Option",          "ICICI Prudential Focused Equity Fund - Direct Plan - Dividend",          "ICICI Prudential Focused Equity Fund - Direct Plan - Growth",          "ICICI Prudential Focused Equity Fund - Dividend"]
    # tempList = []
    # for fund in mutual_funds_list:
    #     temp = ""
    #     for i in range(len(fund)):
    #         if fund[i] == " ":
    #             temp += "_"
    #         else:
    #             temp += fund[i]
    #     tempList.append(temp)
    # mutual_funds_list = tempList

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
            goldList = f"{data.columns[i]} : {result.x[i]:.2%}"
            global gold
            gold = result.x[i]
            print(f'{data.columns[i]} : {result.x[i]:.2%}')
        # print(f'{data.columns[i]}: {result.x[i]:.2%}')
    print(f"Stock : {stock:.2%}")
    print(f"Mutual Funds: {mutualFunds:.2%}")

    # Print optimal weights
    # print('Optimal weights:')
    # for i in range(num_assets):
    #     print(f'{data.columns[i]}: {result.x[i]:.2%}')
        
    # Calculate expected return and standard deviation for optimal portfolio
    optimal_return = np.sum(mean_returns * result.x) * 252
    optimal_std_dev = np.sqrt(np.dot(result.x.T, np.dot(cov_matrix, result.x))) * np.sqrt(252)

    # Print expected return and standard deviation for optimal portfolio

    resultArray = [f"Stock : {stock:.2%}",f"Mutual Funds: {mutualFunds:.2%}",goldList,f'Expected return: {optimal_return:.2%}',f'Standard deviation: {optimal_std_dev:.2%}']
    global pie_stock, pie_mf, pie_gold
    pie_stock = stock
    pie_mf = mutualFunds
    pie_gold = gold
    
    print(f'Expected return: {optimal_return:.2%}')
    print(f'Standard deviation: {optimal_std_dev:.2%}')
    return resultArray



@app.route('/predict')
def returnPrediction():
    prediction = model.predict(n_periods=100)
    print(prediction)
    output = round(prediction.iloc[0], 2)
    return jsonify(float(output))


@app.route("/")
def hello():
    str1 = "hello world!"
    return jsonify(str1)



if __name__ == "__main__":
    app.run(debug=True)
