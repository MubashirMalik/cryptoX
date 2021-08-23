#!/usr/bin/env python
from time import sleep
from binance import Client

symbols = ['ada', 'vet', 'btc', 'eth', 'xvs','luna','doge','ltc','avax', 'waves','sushi','cake']

# Add your api and secret key
api_key = ""
secret_key = ""
client = Client(api_key, secret_key)

x = client.get_account()
x = x['balances']

for i in range(len(symbols)):
	for j in range(len(x)):
		if x[j]['asset'] == symbols[i].upper():
			balance = float(x[j]['free']) + float(x[j]['locked'])
			balance = round(balance, 2)
			js = "<script>document.getElementById('" + symbols[i] + "-coins').innerText+="+ str(balance)+"</script>"
			print(js)
