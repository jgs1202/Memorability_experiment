import os
from PIL import Image
from operator import itemgetter

ourPath="/Users/Aoyama/Documents/B4/Memorability data/mass_all/not_target"
govPath = "/Users/Aoyama/Documents/B4/Memorability data/mass_all/government"
newsPath = "/Users/Aoyama/Documents/B4/Memorability data/mass_all/news"
vis1Path = "/Users/Aoyama/Documents/B4/Memorability data/mass_all/vis1"
vis2Path = "/Users/Aoyama/Documents/B4/Memorability data/mass_all/vis2"
vis3Path = "/Users/Aoyama/Documents/B4/Memorability data/mass_all/vis3"
targetPath = "/Users/Aoyama/Documents/B4/Memorability data/targets"

imageList = []
tarList = []
tarName = []

os.chdir(targetPath)
for file in os.listdir(targetPath):
    if (file != ".DS_Store"):
        # with open(file, 'r') :
        filepath = targetPath +"/"+ file
        image = Image.open(filepath)
        if abs(1 - image.width/image.height)<0.8:
            tarList.append(image)
            tarName.append(file)
        image.close()

print(len(tarList))

# os.chdir(govPath)
# for file in os.listdir(govPath):
#     if (file != ".DS_Store"):
#         print(file)
#         # with open(file, 'r') :
#         filepath = govPath +"/"+ file
#         image = Image.open(filepath)
#         if abs(1 - image.width/image.height)<0.8:
#             if file not in tarName:
#                 image.save("../not_target/" + file)
#                 print("save")
#         image.close()
#
# os.chdir(newsPath)
# for file in os.listdir(newsPath):
#     if (file != ".DS_Store"):
#         print(file)
#         # with open(file, 'r') :
#         filepath = newsPath +"/"+ file
#         try:
#             image = Image.open(filepath)
#             if abs(1 - image.width/image.height)<0.8:
#                 if file not in tarName:
#                     image.save("../not_target/" + file)
#                     print("save")
#             image.close()
#         except:
#             pass
#
# os.chdir(vis1Path)
# for file in os.listdir(vis1Path):
#     if (file != ".DS_Store"):
#         print(file)
#         # with open(file, 'r') :
#         filepath = vis1Path +"/"+ file
#         image = Image.open(filepath)
#         if abs(1 - image.width/image.height)<0.8:
#             if file not in tarName:
#                 image.save("../not_target/" + file)
#                 print("save")
#         image.close()
#
# for i in tarName:
#     print(i)

os.chdir(vis2Path)
for file in os.listdir(vis2Path):
    if (file != ".DS_Store"):
        print(file)
        # with open(file, 'r') :
        filepath = vis2Path +"/"+ file
        try:
            image = Image.open(filepath)
            if abs(1 - image.width/image.height)<0.8:
                if file not in tarName:
                    image.save("../not_target/" + file)
                    print("save")
                else:
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")
                    print("t")

            image.close()
        except:
            pass

os.chdir(vis3Path)
for file in os.listdir(vis3Path):
    if (file != ".DS_Store"):
        print(file)
        # with open(file, 'r') :
        filepath = vis3Path +"/"+ file
        try:
            image = Image.open(filepath)
            if abs(1 - image.width/image.height)<0.8:
                if file not in tarName:
                    image.save("../not_target/" + file)
                    print("save")
            image.close()
        except:
            pass
