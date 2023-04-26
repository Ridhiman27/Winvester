from flask import Flask,request,jsonify
import os
import pickle
import pandas as pd

app = Flask(__name__)
model = pickle.load(open('ADANIPORTS', 'rb'))

# list_csv = sorted(os.listdir("Nifty50"))

# df = pd.read_csv("ADANIPORTS.csv")
data = pd.read_csv("ADANIPORTS.csv")
values = data[['Open', 'High', 'Low', 'Close']].values


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
