import requests 
import pandas as pd
import math

response = requests.get('https://api.metalpriceapi.com/v1/latest?api_key=e322793e3aca6d37f4e958a991c4626f&base=INR&currencies=XAU,XAG')
temp = response.json()
frames = []
tempList = []
goldRate = 1 / temp['rates']['XAU'] 
goldRate /= 2.431 
silverRate = 1 / temp['rates']['XAG']
silverRate /= 2.431
tempList.append(math.ceil(goldRate))
tempList.append(math.ceil(silverRate))
frames.append(tempList)

df = pd.DataFrame(frames,columns=["GOLD","SILVER"])
df.to_csv("gold.csv")