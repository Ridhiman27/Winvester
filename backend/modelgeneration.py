import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import lightgbm as lgb
from pmdarima import auto_arima
from sklearn.metrics import mean_absolute_error, mean_squared_error
import os
import pickle

# ['ADANIPORTS.csv', 'ASIANPAINT.csv', 'AXISBANK.csv', 'BAJAJ-AUTO.csv', 'BAJAJFINSV.csv', 'BAJFINANCE.csv', 'BHARTIARTL.csv', 'BPCL.csv', 'BRITANNIA.csv', 'CIPLA.csv', 'COALINDIA.csv', 'DRREDDY.csv', 'EICHERMOT.csv', 'GAIL.csv', 
# 'GRASIM.csv', 'HCLTECH.csv', 'HDFC.csv', 'HDFCBANK.csv', 'HEROMOTOCO.csv', 'HINDALCO.csv', 'HINDUNILVR.csv', 'ICICIBANK.csv', 'INDUSINDBK.csv', 'INFY.csv', 'IOC.csv', 'ITC.csv', 'JSWSTEEL.csv', 'KOTAKBANK.csv', 'LT.csv', 'MARUTI.csv', 'MM.csv', 'NESTLEIND.csv', 'NTPC.csv', 'ONGC.csv', 'POWERGRID.csv', 'RELIANCE.csv', 'SBIN.csv', 'SHREECEM.csv', 'SUNPHARMA.csv', 'TATAMOTORS.csv', 'TATASTEEL.csv', 'TCS.csv', 'TECHM.csv', 'TITAN.csv', 'ULTRACEMCO.csv', 'UPL.csv', 'VEDL.csv', 'WIPRO.csv', 'ZEEL.csv']

list_csv = sorted(os.listdir("Nifty50"))

# print(list_csv)


output = "Model"

dir = "Nifty50"


for csv in list_csv[23:]:
    print(csv)
    stock = csv.split(".")[0]

    path_csv = os.path.join(dir,csv)

    df = pd.read_csv(path_csv)
    df.set_index("Date", drop=False, inplace=True)
    # df.head(5)


    df.reset_index(drop=True, inplace=True)
    lag_features = ["High", "Low", "Volume", "Turnover", "Trades"]
    window1 = 3
    window2 = 7
    window3 = 30

    df_rolled_3d = df[lag_features].rolling(window=window1, min_periods=0)
    df_rolled_7d = df[lag_features].rolling(window=window2, min_periods=0)
    df_rolled_30d = df[lag_features].rolling(window=window3, min_periods=0)

    df_mean_3d = df_rolled_3d.mean().shift(1).reset_index().astype(np.float32)
    df_mean_7d = df_rolled_7d.mean().shift(1).reset_index().astype(np.float32)
    df_mean_30d = df_rolled_30d.mean().shift(1).reset_index().astype(np.float32)

    df_std_3d = df_rolled_3d.std().shift(1).reset_index().astype(np.float32)
    df_std_7d = df_rolled_7d.std().shift(1).reset_index().astype(np.float32)
    df_std_30d = df_rolled_30d.std().shift(1).reset_index().astype(np.float32)


    for feature in lag_features:
        df[f"{feature}_mean_lag{window1}"] = df_mean_3d[feature]
        df[f"{feature}_mean_lag{window2}"] = df_mean_7d[feature]
        df[f"{feature}_mean_lag{window3}"] = df_mean_30d[feature]
        
        df[f"{feature}_std_lag{window1}"] = df_std_3d[feature]
        df[f"{feature}_std_lag{window2}"] = df_std_7d[feature]
        df[f"{feature}_std_lag{window3}"] = df_std_30d[feature]

    df.fillna(df.mean(), inplace=True)

    df.set_index("Date", drop=False, inplace=True)
    # df.head()

    print("changing date and time")
    df.Date = pd.to_datetime(df.Date, format="%Y-%m-%d")
    df["month"] = df.Date.dt.month
    df["week"] = df.Date.dt.week
    df["day"] = df.Date.dt.day
    df["day_of_week"] = df.Date.dt.dayofweek

    df_train = df[df.Date < "2019"]
    df_valid = df[df.Date >= "2019"]

    exogenous_features = ["High_mean_lag3", "High_std_lag3", "Low_mean_lag3", "Low_std_lag3",
                        "Volume_mean_lag3", "Volume_std_lag3", "Turnover_mean_lag3",
                        "Turnover_std_lag3", "Trades_mean_lag3", "Trades_std_lag3",
                        "High_mean_lag7", "High_std_lag7", "Low_mean_lag7", "Low_std_lag7",
                        "Volume_mean_lag7", "Volume_std_lag7", "Turnover_mean_lag7",
                        "Turnover_std_lag7", "Trades_mean_lag7", "Trades_std_lag7",
                        "High_mean_lag30", "High_std_lag30", "Low_mean_lag30", "Low_std_lag30",
                        "Volume_mean_lag30", "Volume_std_lag30", "Turnover_mean_lag30",
                        "Turnover_std_lag30", "Trades_mean_lag30", "Trades_std_lag30",
                        "month", "week", "day", "day_of_week"]
    # df.head()

    print("Training started")
    model = auto_arima(df_train.VWAP, exogenous=df_train[exogenous_features], trace=True, error_action="ignore", suppress_warnings=True)
    model.fit(df_train.VWAP, exogenous=df_train[exogenous_features])

    # forecast = model.predict(n_periods=len(df_valid), exogenous=df_valid[exogenous_features])
    # df_valid["Forecast_ARIMAX"] = forecast


    path = os.path.join(output,stock)

    with open(path,'wb') as f:
        pickle.dump(model,f)
    print("model_saved")