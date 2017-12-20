import csv
import random
import os

dif = 20

for j in range(2):
    for k in range(7):
        os.chdir('/Users/Aoyama/Documents/B4/Memorability_data/tulip/csv/300nodes/originData')
        f = open(str(j) + '.csv', 'r')
        dataReader = csv.reader(f)
        data = [ e for e in dataReader]
        f.close()

        length = len(data) - 1
        print(length)
        for i in range( int(length * dif / 100) ):
            print(i)
            nodeNum = random.randint(0, length - i -1 )
            while nodeNum == (length - i -1):
                nodeNum = random.randint(0, length - i -1 )
            data[length - i][1] = nodeNum

        if k == 0:
            try:
                os.mkdir('../dummyData/' + str(j))
            except:
                pass

        os.chdir('/Users/Aoyama/Documents/B4/Memorability_data/tulip/csv/300nodes/dummyData/'+str(j))
        f = open( '' + str(k+1) + '.csv', 'w')
        writer = csv.writer(f)
        for i in data:
            writer.writerow(i)
        f.close()

        # print(data)
