from mftool import Mftool
import pandas as pd
mf = Mftool()
# print(mf)

# q = mf.get_scheme_quote('119597')
# print(q)


# value = mf.get_open_ended_equity_scheme_performance(True)
# print(value)


# data
mutual_funds_dict = {
 	'119551': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - DIRECT - IDCW',
 	'119552': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - DIRECT - MONTHLY IDCW',
 	'119553': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - Direct - Quarterly IDCW',
 	'108272': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - REGULAR - IDCW',
 	'110282': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - REGULAR - MONTHLY IDCW',
 	'108274': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - REGULAR - Quarterly IDCW',
 	'110490': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - retail - monthly IDCW',
 	'106157': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - retail - quarterly IDCW',
 	'108273': 'Aditya Birla Sun Life Banking & PSU Debt Fund - Regular Plan-Growth',
 	'103176': 'Aditya Birla Sun Life Banking & PSU Debt Fund - Retail Plan-Growth',
 	'119550': 'Aditya Birla Sun Life Banking & PSU Debt Fund- Direct Plan-Growth',
 	'128952': 'Axis Banking & PSU Debt Fund - Direct Plan - Bonus Option',
 	'120437': 'Axis Banking & PSU Debt Fund - Direct Plan - Daily IDCW',
 	'120438': 'Axis Banking & PSU Debt Fund - Direct Plan - Growth Option',
 	'120439': 'Axis Banking & PSU Debt Fund - Direct Plan - Monthly IDCW',
 	'120436': 'Axis Banking & PSU Debt Fund - Direct Plan - Weekly IDCW',
 	'128953': 'Axis Banking & PSU Debt Fund - Regular Plan - Bonus Option',
 	'117447': 'Axis Banking & PSU Debt Fund - Regular Plan - Daily IDCW',
 	'117446': 'Axis Banking & PSU Debt Fund - Regular Plan - Growth option',
 	'117449': 'Axis Banking & PSU Debt Fund - Regular Plan - Monthly IDCW',
 	'117448': 'Axis Banking & PSU Debt Fund - Regular Plan - Weekly IDCW',
 	'148629': 'Baroda Banking and PSU Bond Fund -Direct Plan-Monthly IDCW Option',
 	'148628': 'Baroda Banking and PSU Bond Fund- Direct Plan -Growth Option',
 	'148630': 'Baroda Banking and PSU Bond Fund-Direct plan-Quarterly IDCW Option',
 	'148625': 'Baroda Banking and PSU Bond Fund-Regular Plan -Growth Option',
 	'148626': 'Baroda Banking and PSU Bond Fund-Regular Plan -Monthly IDCW Option',
 	'148627': 'Baroda Banking and PSU Bond Fund-Regular Plan-Quarterly IDCW Option',
 	'124175': 'DSP Banking & PSU Debt Fund - Direct Plan - Growth',
 	'124178': 'DSP Banking & PSU Debt Fund - Direct Plan - IDCW',
 	'124182': 'DSP Banking & PSU Debt Fund - Direct Plan - IDCW - Daily Reinvest',
 	'124176': 'DSP Banking & PSU Debt Fund - Direct Plan - IDCW - Monthly',
 	'124177': 'DSP Banking & PSU Debt Fund - Direct Plan - IDCW - Quarterly ',
 	'124183': 'DSP Banking & PSU Debt Fund - Direct Plan - IDCW - Weekly',
 	'124172': 'DSP Banking & PSU Debt Fund - Regular Plan - Growth',
 	'124174': 'DSP Banking & PSU Debt Fund - Regular Plan - IDCW',
 	'124173': 'DSP Banking & PSU Debt Fund - Regular Plan - IDCW - Daily Reinvest',
 	'124180': 'DSP Banking & PSU Debt Fund - Regular Plan - IDCW - Monthly',
 	'124181': 'DSP Banking & PSU Debt Fund - Regular Plan - IDCW - Quarterly ',
 	'124179': 'DSP Banking & PSU Debt Fund - Regular Plan - IDCW - Weekly',
 	'140286': 'Edelweiss Banking and PSU Debt Fund - Direct Plan - Growth Option',
 	'140288': 'Edelweiss Banking and PSU Debt Fund - Direct Plan - IDCW Option',
 	'140291': 'Edelweiss Banking and PSU Debt Fund - Direct Plan Fortnightly - IDCW Option',
 	'140293': 'Edelweiss Banking and PSU Debt Fund - Direct Plan Monthly - IDCW Option',
 	'140290': 'Edelweiss Banking and PSU Debt Fund - Direct Plan weekly - IDCW Option',
 	'140283': 'Edelweiss Banking and PSU Debt Fund - Regular Plan - Growth Option',
 	'140284': 'Edelweiss Banking and PSU Debt Fund - Regular Plan - IDCW Option',
 	'140294': 'Edelweiss Banking and PSU Debt Fund - Regular Plan Fortnightly - IDCW Option',
 	'140292': 'Edelweiss Banking and PSU Debt Fund - Regular Plan Monthly - IDCW Option',
 	'140289': 'Edelweiss Banking and PSU Debt Fund - Regular Plan Weekly - IDCW Option',
 	'129008': 'Franklin India Banking & PSU Debt Fund - Direct - Growth',
 	'129006': 'Franklin India Banking & PSU Debt Fund - Growth',
 	'129009': 'Franklin India Banking and PSU Debt Fund - Direct - IDCW ',
 	'129007': 'Franklin India Banking and PSU Debt Fund - IDCW ',
 	'128628': 'HDFC Banking and PSU Debt Fund - Growth Option',
 	'128629': 'HDFC Banking and PSU Debt Fund - Growth Option - Direct Plan',
 	'128627': 'HDFC Banking and PSU Debt Fund - IDCW Option',
 	'128626': 'HDFC Banking and PSU Debt Fund - IDCW Option - Direct Plan',
 	'112343': 'ICICI Prudential Banking and PSU Debt Fund -  Daily IDCW',
 	'112344': 'ICICI Prudential Banking and PSU Debt Fund -  Weekly IDCW',
 	'130897': 'ICICI Prudential Banking and PSU Debt Fund - Bonus',
 	'120257': 'ICICI Prudential Banking and PSU Debt Fund - Direct Plan -  Daily IDCW',
 	'120256': 'ICICI Prudential Banking and PSU Debt Fund - Direct Plan -  Growth',
 	'120258': 'ICICI Prudential Banking and PSU Debt Fund - Direct Plan -  Quarterly IDCW',
 	'120255': 'ICICI Prudential Banking and PSU Debt Fund - Direct Plan -  Weekly IDCW',
 	'130950': 'ICICI Prudential Banking and PSU Debt Fund - Direct Plan Bonus',
 	'131148': 'ICICI Prudential Banking and PSU Debt Fund - Direct Plan Half Yearly IDCW Option',
 	'112342': 'ICICI Prudential Banking and PSU Debt Fund - Growth',
}

frames = []
for keys in mutual_funds_dict:
    # list1.append(mf.get_scheme_details(keys))
    # df = mf.history(keys,start=None,end=None,period='5d',as_dataframe=True)
    temp = mf.get_scheme_quote(keys,as_json=False)
    tempList = []
    tempList.append(temp["scheme_name"])
    tempList.append(temp["nav"])
    frames.append(tempList)
    # frames.append(df)

df = pd.DataFrame(frames,columns=["Name","NAV"])
print(df)
# result = pd.concat(frames)
# print(result)

df.to_csv("mutualfunds.csv")