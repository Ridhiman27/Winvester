from datetime import date
import pandas as pd
from jugaad_data.nse import bhavcopy_save, bhavcopy_fo_save

# Download bhavcopy
# bhavcopy_save(date(2020,1,1), "/")

# # Download bhavcopy for futures and options
# bhavcopy_fo_save(date(2020,1,1), "/")

# Download stock data to pandas dataframe
from jugaad_data.nse import stock_df
nifty_50_symbols = ['ADANIPORTS', 'ASIANPAINT', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE', 'BAJAJFINSV', 'BHARTIARTL', 'BPCL', 'BRITANNIA', 'CIPLA', 'COALINDIA', 'DIVISLAB', 'DRREDDY', 'EICHERMOT', 'GRASIM', 'HCLTECH', 'HDFC', 'HDFCBANK', 'HDFCLIFE', 'HEROMOTOCO', 'HINDALCO', 'HINDUNILVR', 'ICICIBANK', 'INDUSINDBK', 'INFY', 'IOC', 'ITC', 'JSWSTEEL', 'KOTAKBANK', 'LT', 'M&M', 'MARUTI', 'NESTLEIND', 'NTPC', 'ONGC', 'POWERGRID', 'RELIANCE', 'SBILIFE', 'SBIN', 'SHREECEM', 'SUNPHARMA', 'TATAMOTORS', 'TATASTEEL', 'TATACONSUM', 'TECHM', 'TITAN', 'ULTRACEMCO', 'UPL', 'WIPRO']

frames = []
for i in range(len(nifty_50_symbols)):
    df = stock_df(symbol=nifty_50_symbols[i], from_date=date(2023,4,27),
            to_date=date(2023,4,27), series="EQ")
    frames.append(df)

result = pd.concat(frames)
print(result)
result.to_csv("stocks.csv")




