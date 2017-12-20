import csv
import random
import os

dif = 10

for j in range(2):
    for k in range(8):
        os.chdir('/Users/Aoyama/Documents/B4/noOauth_test/tulip/csv/100nodes/originData')
        f = open(str(j) + '.csv', 'r')
        dataReader = csv.reader(f)
        data = [ e for e in dataReader]
        f.close()

        length = len(data) - 1
        print(length)

        if k == 0:
            level  = int( length * dif / 100)
        else:
            level = int( length * dif * 5 / 100)

        for i in range( level ):
            print(i)
            nodeNum = random.randint(0, length - i - 1 )
            while nodeNum == (length - i - 1):
                nodeNum = random.randint(0, length - i - 1 )
            data[length - i][1] = nodeNum

        if k == 0:
            try:
                os.mkdir('../alikeDummyData/5times/' + str(j))
            except:
                pass

        os.chdir('/Users/Aoyama/Documents/B4/noOauth_test/tulip/csv/100nodes/alikeDummyData/5times/'+str(j))
        f = open( '' + str(k) + '.csv', 'w')
        writer = csv.writer(f)
        for i in data:
            writer.writerow(i)
        f.close()

        # print(data)
