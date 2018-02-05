from zss import simple_distance, Node
import numpy as np
import os
import csv
import random
import copy

dif = 10
rank = 5
# data1 = [ [0,0], [1,0], [2,1], [3,0], [4,2] ]
# data2 = [ [0,0], [1,0], [2,1], [3,0], [4,2], [5,3], [6,1] ]

# answer = (Node("1").addkid(Node("1").addkid(Node("2").addkid(Node("1")))).addkid(Node("1")))

def func1(command, data, num):
    nodes = []

    for i in range(40):
        nodes.append([])

    for i in data:
        if i[0] != i[1]:
            nodes[ int(i[1]) ].append( int(i[0]) )

    # print(nodes)
    global com
    com = 'tree' + str(num) +' = ( Node("1")'
    func( nodes, 0 )
    commands.append(com)

def func ( List, var ):
    global com
    # print(var)
    if len(List[var]) != 0:
        for i in List[var]:
            com += '.addkid(Node("1")'
            func( List, int(i))
        com += ')'
    else:
        com += ')'


for j in range(1,40):

    os.chdir('/Users/Aoyama/Documents/B4/noOauth_test/tulip/csv/40nodes/originData')
    f = open(str(j) + '.csv', 'r')
    dataReader = csv.reader(f)
    data = [ e for e in dataReader]
    f.close()

    ############## data0 はオリジナル #######################
    data0 = copy.deepcopy(data[1:])
    length = len(data) - 1

    for k in range(4):

        if k == 0:
            level  = 4#int( length * dif / 100)
        else:
            level = 20#int( length * dif * rank / 100)

        print('level is ' + str(level))

        data1 = copy.deepcopy(data[1:])

        ################### まずレベル分変更 ######################
        for i in range( 1):#int(level*2/5) ):
            nodeNum = random.randint(0, length - i - 1 )
            while nodeNum == (length - i - 1):
                nodeNum = random.randint(0, length - i - 1 )
            data1[length - i -1][1] = nodeNum
        print('numbers of level was done.')

        ################# tedが１０になるまで実行
        num = 0
        commands = []
        func1(commands, data0, 0)
        func1(commands, data1, 1)
        for i in range(len(commands)):
            exec(commands[i])

        current = int(level*2/5)
        ted = simple_distance(tree0, tree1)
        old = copy.deepcopy(data1)
        while  ted != level:
            if ted < level:
                old = copy.deepcopy(data1)
                if abs(ted - level) < level/10:
                    step = int(abs(ted - level))
                    if step < 2:
                        step = 1
                else:
                    step = int(level/10)
            else:
                step = int(abs(ted - level)/2)
            if step < 2:
                step = 1
            step =1
            print('step is '+ str(step) )
            if ted > level:
                data1 = copy.deepcopy(old)
                # if abs(ted - level) < abs(old - level):
                #     current -= int(step*2)
                # elif ( ted - level ) > 10:
                #     data1 = copy.deepcopy(data[1:])
                #     for i in range( int(level*2/5) ):
                #         nodeNum = random.randint(0, length - i - 1 )
                #         while nodeNum == (length - i - 1):
                #             nodeNum = random.randint(0, length - i - 1 )
                #         data1[length - i -1][1] = nodeNum
                #     print('numbers of level was done.')
                #     current = int(level*2/5)
                # else:
                #     current -= int(step)
                # old = copy.deepcopy(ted)
            for l in range( int(step) ):
                current = random.randint( 0, level)
                nodeNum = random.randint(0, length - current - 1 )
                while nodeNum == (length - current - 1):
                    nodeNum = random.randint(0, length - current - 1 )
                data1[length - current - 1][1] = nodeNum

            commands = []
            func1(commands, data0, 0)
            func1(commands, data1, 1)
            for i in range(len(commands)):
                exec(commands[i])
            ted = simple_distance(tree0, tree1)
            current += int(level/10)
            print(ted)

        if k == 0:
            try:
                os.mkdir('../ted/' + str(rank) +'0%/' + str(j))
            except:
                pass

        os.chdir('/Users/Aoyama/Documents/B4/noOauth_test/tulip/csv/40nodes/ted/' + str(rank) + '0%/'+str(j))
        f = open( '' + str(k) + '.csv', 'w')
        writer = csv.writer(f)
        for i in data1:
            writer.writerow(i)
        f.close()
