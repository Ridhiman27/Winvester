from flask import Flask,request,jsonify
import os
import pickle
import pandas as pd
import numpy as np
import scipy.optimize as sco

app = Flask(__name__)
model = pickle.load(open('ADANIPORTS', 'rb'))

# list_csv = sorted(os.listdir("Nifty50"))

# df = pd.read_csv("ADANIPORTS.csv")
data = pd.read_csv("ADANIPORTS.csv")
values = data[['Open', 'High', 'Low', 'Close']].values


@app.route('/risk-calculation')
def MPT():

    # Import data for each asset class
    stocks_data = pd.read_csv('stocks.csv')
    gold_data = pd.read_csv('gold.csv')
    mutual_funds_data = pd.read_csv('mutual_funds.csv')
    etfs_data = pd.read_csv('etfs.csv')
    # ppf_data = pd.read_csv('ppf.csv')
    # nps_data = pd.read_csv('nps.csv')
    # smallcase_data = pd.read_csv('smallcase.csv')
    # other_data = pd.read_csv('other.csv')

    # Merge data into a single DataFrame
    data = pd.concat([stocks_data, gold_data, mutual_funds_data, etfs_data], axis=1)

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

    # Print optimal weights
    print('Optimal weights:')
    for i in range(num_assets):
        print(f'{data.columns[i]}: {result.x[i]:.2%}')
        
    # Calculate expected return and standard deviation for optimal portfolio
    optimal_return = np.sum(mean_returns * result.x) * 252
    optimal_std_dev = np.sqrt(np.dot(result.x.T, np.dot(cov_matrix, result.x))) * np.sqrt(252)

    # Print expected return and standard deviation for optimal portfolio
    print(f'Expected return: {optimal_return:.2%}')
    print(f'Standard deviation: {optimal_std_dev:.2%}')



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
