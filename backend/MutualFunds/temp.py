import pandas as pd

funds = ["Motilal Oswal Focused 25 Fund (MOF25) - Direct Plan Dividend Option",          "Motilal Oswal Focused 25 Fund (MOF25) - Regular Plan Dividend Option",          "Motilal Oswal Focused 25 Fund (MOF25)- Direct Plan Growth Option",          "Motilal Oswal Focused 25 Fund (MOF25)- Regular Plan Growth Option",          "SBI FOCUSED EQUITY FUND - DIRECT PLAN - DIVIDEND",          "SBI FOCUSED EQUITY FUND - DIRECT PLAN -GROWTH",          "SBI FOCUSED EQUITY FUND - REGULAR  PLAN - DIVIDEND",          "SBI FOCUSED EQUITY FUND - REGULAR PLAN -GROWTH",          "Baroda Banking And Financial Services Fund - Plan A - Bonus Option",          "Baroda Banking and Financial Services Fund - Plan A - Dividend",          "Baroda Banking and Financial Services Fund - Plan A - Growth Option",          "Sundaram Select Focus - Direct Plan - Dividend Option",          "Sundaram Select Focus - Direct Plan - Growth Option",          "Sundaram Select Focus-Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Growth",          "Aditya Birla Sun Life Banking and Financial Services Fund - Regular Plan - Dividend",          "Aditya Birla Sun Life Banking and Financial Services Fund - Regular Plan - Growth",          "HDFC Focused 30 Fund - DIVIDEND",          "HDFC Focused 30 Fund - GROWTH",          "HDFC Focused 30 Fund -Direct Plan - Dividend Option",          "ICICI Prudential Focused Equity Fund - Direct Plan - Dividend",          "ICICI Prudential Focused Equity Fund - Direct Plan - Growth",          "ICICI Prudential Focused Equity Fund - Dividend"]

cols = ['Date', 'Net Asset Value']

combined_df = pd.DataFrame(columns=cols)

for fund in funds:
    temp = ""
    for i in range(len(fund)):
        if(fund[i] == " "):
            temp += "_"
        else:
            temp += fund[i]
    fund_name = fund
    fund = temp
    df = pd.read_csv(f"{fund}.csv")
    df = df[cols]
    df = df.dropna()
    df.columns = ['Date', fund_name]
    df.set_index('Date', inplace=True)
    combined_df = pd.concat([combined_df, df], axis=1)

combined_df = combined_df.sort_index()

combined_df.to_csv('combined_funds.csv')
