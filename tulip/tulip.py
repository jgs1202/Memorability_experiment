from tulip import *
from tulipogl import *
from tulipgui import *

# Import a grid approximation (with default parameters)
graph = tlp.importGraph("Grid Approximation")

# Get references to some view properties
viewLayout = graph.getLayoutProperty("viewLayout")
viewSize = graph.getSizeProperty("viewSize")
viewBorderWidth = graph.getDoubleProperty("viewBorderWidth")
viewLabelBorderWidth = graph.getDoubleProperty("viewLabelBorderWidth")
viewColor = graph.getColorProperty("viewColor")
viewLabelColor = graph.getColorProperty("viewLabelColor")
viewLabelBorderColor = graph.getColorProperty("viewLabelBorderColor")
viewBorderColor = graph.getColorProperty("viewBorderColor")
viewLabel = graph.getStringProperty("viewLabel")
viewShape = graph.getIntegerProperty("viewShape")

# Compute an anonymous degree property
degree = tlp.DoubleProperty(graph)
degreeParams = tlp.getDefaultPluginParameters("Degree")
graph.applyDoubleAlgorithm("Degree", degree, degreeParams)

# Map the node sizes to their degree
sizeMappingParams = tlp.getDefaultPluginParameters("Size Mapping", graph)
sizeMappingParams["property"] = degree
sizeMappingParams["min size"] = 10
sizeMappingParams["max size"] = 30
graph.applySizeAlgorithm("Size Mapping", viewSize, sizeMappingParams)

# Apply an FM^3 layout on it
fm3pParams = tlp.getDefaultPluginParameters("FM^3 (OGDF)", graph)
fm3pParams["Unit edge length"] = 100
graph.applyLayoutAlgorithm("FM^3 (OGDF)", viewLayout, fm3pParams)

# Create a heat map color scale
heatMap = tlp.ColorScale([tlp.Color.Green, tlp.Color.Black, tlp.Color.Red])

# Map the node colors to their degree using the heat map color scale
# Also set the nodes labels to their id
for n in graph.getNodes():
  pos = (degree[n] - degree.getNodeMin()) / (degree.getNodeMax() - degree.getNodeMin())
  viewColor[n] = heatMap.getColorAtPos(pos)
  viewLabel[n] = str(n.id)

# Set border colors values
viewBorderColor.setAllNodeValue(tlp.Color.Black)
viewLabelColor.setAllNodeValue(tlp.Color.Blue)
viewLabelBorderColor.setAllNodeValue(tlp.Color.Blue)

# Add a border to nodes/edges
viewBorderWidth.setAllNodeValue(1)
viewBorderWidth.setAllEdgeValue(1)

# Sets nodes shapes to circle
viewShape.setAllNodeValue(tlp.NodeShape.Circle)

# Create a Node Link Diagram view and set some rendering parameters
nodeLinkView = tlpgui.createNodeLinkDiagramView(graph)
renderingParameters = nodeLinkView.getRenderingParameters()
renderingParameters.setViewArrow(True)
renderingParameters.setMinSizeOfLabel(10)
nodeLinkView.setRenderingParameters(renderingParameters)
