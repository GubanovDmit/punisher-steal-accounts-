import pywaves as pw
import requests
import time
import random
import json

#pw.setNode(node = "https://testnode1.wavesnodes.com", chain = "testnet")

with open("stolenAccPubKey.txt","r") as f:
	

	for pubKey in f:
		a = "https://testnodes.wavesnodes.com/addresses/publicKey/" + pubKey.strip()
		r = requests.get(a)
		print(json.loads(r.text)["address"])  