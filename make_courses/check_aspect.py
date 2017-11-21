import os
from PIL import Image
from operator import itemgetter

ourPath="/Users/Aoyama/Documents/B4/Memorability data/mass_all/horizon_target"
tarPath="/Users/Aoyama/Documents/B4/Memorability data/mass_all/not_target"


imageList = []
tarList = []
tarName = []

os.chdir(tarPath)
for file in os.listdir(tarPath):
    if (file != ".DS_Store"):
        # with open(file, 'r') :
        filepath = tarPath +"/"+ file
        try:
            image = Image.open(filepath)
            if (image.width - image.height)/image.height > -0.5:
                image.save('../horizon_target/' + file )
        except:
            pass
        image.close()

print(len(tarList))
