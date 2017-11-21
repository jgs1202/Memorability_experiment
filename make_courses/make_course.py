import os
import numpy as np
from numpy.random import *
from PIL import Image
from operator import itemgetter
import csv


for i in range(20,21):
	image_size=500
	tarList = []
	filList = []
	List = []
	tarNumList = []
	tar = 0
	fil = 0
	course = i

	targetpath = "/Users/Aoyama/Documents/B4/Memorability_data/our_targets/"+ '' + str(course) + "/target"
	fillerpath = "/Users/Aoyama/Documents/B4/Memorability_data/our_targets/"+ '' + str(course) + "/filler"
	firstpath = "/Users/Aoyama/Documents/B4/Memorability_data/our_targets/"+ '' + str(course) + "/1st"
	secondpath = "/Users/Aoyama/Documents/B4/Memorability_data/our_targets/"+ '' + str(course) + "/2nd"


	os.chdir(targetpath)
	for file in os.listdir():
		if (file != ".DS_Store"):
			tar += 1
			with open(file, 'r') as f:
				filepath = targetpath +"/"+ file
				image = Image.open(filepath)
				tarList.append(image)

	os.chdir(fillerpath)
	for file in os.listdir():
		if (file != ".DS_Store"):
			fil += 1
			with open(file, 'r') as h:
				filepath = fillerpath +"/"+ file
				image = Image.open(filepath)
				filList.append(image)
				# with open(file[:-4]+'_re.gif', 'w') as g:
					# g.write(str(image))

	# os.chdir(firstpath)
	# for i in range(len(tarList)):
	#  	tarList[i].save(''+ str(i) + '.png')
	lenTar = len(tarList)
	lenFil = len(filList)
	print(tar + fil)
	print(lenTar + lenFil)
	while (lenTar + lenFil) < (tar + fil):
		lenTar = len(tarList)
		lenFil = len(filList)
		print(lenTar + lenFil)
	print("Load End")
	tarNum = 0
	filNum = 0
	#sort target and filler based on the rule that the order of targets is same
	for i in range(lenTar + lenFil):
		#random 1 or 0
		diz = randint(0,2)
		if diz == 1:
			try:
				List.append([tarList[tarNum], tarNum + filNum])
				tarNum +=1
			except:

				try:
					List.append([filList[filNum], "filler"])
					filNum += 1
				except:
					break

		elif diz == 0:
			try:
				List.append([filList[filNum], "filler"])
				filNum += 1
			except:
				try:
					List.append([tarList[tarNum], tarNum + filNum])
					tarNum += 1
				except:
					break

	print(tarNum + filNum)

	numberTar = 0

	for i in range(len(List)):
		os.chdir(secondpath)
		List[i][0].save("../2nd/"+ '' + str(i) + '.png')
		if List[i][1] != "filler":
			os.chdir(firstpath)
			tarNumList.append(i)
			List[i][0].save('../1st/' + ''+ str(numberTar) + '.png')
			numberTar += 1


	with open("../target_number.csv", 'w') as f:
		writer = csv.writer(f)
		# for i in tarNumList:
		writer.writerows(map(lambda x: [x], tarNumList))
