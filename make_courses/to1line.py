import csv
import os

for i in range(1,21):
    csvdir = "/Users/Aoyama/Documents/B4/Memorability_data/our_targets/"+ '' + str(i)
    f = open(csvdir + '/target_number.csv', 'r')
    dataReader = csv.reader(f)
    data = [ e for e in dataReader]
    f.close()

    List = []
    for j in data:
        List.append((j[0]))
    print(List)

    f = open(csvdir+'/targets.csv', 'w')
    writer = csv.writer(f, lineterminator='\n')
    writer.writerow(List)
    f.close()
