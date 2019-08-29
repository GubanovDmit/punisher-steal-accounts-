import requests
import json
import datetime
import dateutil.parser

alreadry_in_list = []

with open("setAccount.txt","w+") as f:
	query = " https://api.testnet.wavesplatform.com/v0/transactions/set-script?&sort=desc&limit=100"
	answer = requests.get(query)
	data = json.loads(str(answer.content.decode('utf8')))
	lastCursor = data["lastCursor"]
	for i in data["data"]:
		sender = i["data"]["senderPublicKey"]
		if str(sender) not in alreadry_in_list:
			alreadry_in_list.append(sender)
			f.write(sender + "\n")
		lastCursor = data["lastCursor"]
	for i in range(10000):
		query = " https://api.testnet.wavesplatform.com/v0/transactions/set-script?after="+ lastCursor +  "&sort=desc&limit=100"
		answer = requests.get(query)
		data = json.loads(str(answer.content.decode('utf8')))
		for i in data["data"]:
			sender = i["data"]["senderPublicKey"]
			if str(sender) not in alreadry_in_list:
				alreadry_in_list.append(sender)
				f.write(sender + "\n")
		lastCursor = data["lastCursor"]

