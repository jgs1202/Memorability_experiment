from PIL import Image
import numpy as np
import os

root = '/Users/Aoyama/Documents/B4/noOauth_test/tulip/trees/500nodes/ted/50%/'
origin = os.listdir('/Users/Aoyama/Documents/B4/noOauth_test/tulip/trees/500nodes/ted/50%')

for dir in origin:

    if dir != '.DS_Store':
        print(dir)
        current = root + dir + '/'

        for dir in os.listdir(current):
            if dir != '.DS_Store':
                # print(current)
                folder = current + dir +'/'

                for file in os.listdir(folder):
                    if file[-4:] == '.png':
                        # 元となる画像の読み込み
                        img = Image.open(folder + file)
                        print(folder + file)
                        img.save(folder + file)
                        # オリジナル画像と同じサイズのImageオブジェクトを作成する
                        # img.show()
