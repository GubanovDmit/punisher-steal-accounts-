with open("result.txt","r") as f:
	k = 0
	for i in f:
		if "success!" in i.split():
			print(i.split()[5])
			k+=1
	print(k)