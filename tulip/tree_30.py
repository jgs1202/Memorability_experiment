import numpy as np
import pylab
import random
import csv
import networkx as nx
from networkx.drawing.nx_agraph import graphviz_layout
import os

nodeSize= 30

for j in range(30):
    os.chdir('/Users/Aoyama/Documents/B4/noOauth_test/tulip')
    nodes = []
    nodes.append( ['src', 'trg'] )
    for i in range(nodeSize):
        if i == 0:
            nodes.append([0, 0])
        elif i == 1:
            nodes.append([1,0])
        else:
            nodeNum = random.randint(0, i-1)
            nodes.append([i, nodeNum])

    print(nodes)

    graph = nx.Graph()
    for i in range(nodeSize):
        graph.add_node(str(i))

    for i in range(nodeSize):
        graph.add_edge(str(nodes[i][0]) ,str(nodes[i][1]))

    pylab.figure(figsize=(10, 10))
    # pos = graphviz_layout(graph, prog='dot')
    # pos = graphviz_layout(graph, prog='dot')
    # pos = graphviz_layout(graph, prog='twopi')
    pos = graphviz_layout(graph,prog = 'dot')

    nx.draw_networkx_nodes(graph, pos, node_size=1, node_color="black")
    nx.draw_networkx_edges(graph, pos, width=1)
    # nx.draw_networkx_edge_labels(graph, pos)#, edge_labels=edge_labels)
    # nx.draw_networkx_labels(graph, pos)#, font_size=16, font_color="r")
    pylab.xticks([])
    pylab.yticks([])

    # pylab.show()
    os.chdir('/Users/Aoyama/Documents/B4/noOauth_test/tulip/trees/30nodes/originData')
    f = open( '' + str(j) + '.csv', 'w')
    writer = csv.writer(f)
    for i in nodes:
        writer.writerow(i)
    f.close()
