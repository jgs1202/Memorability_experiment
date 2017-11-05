//////////////// Initialize Firebase/////////////////////////////////
console.log("init")

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBrIVYPj_FoDe8MKkzs6QuFGfkQrY0vM-8",
  authDomain: "memorability-8c35d.firebaseapp.com",
  databaseURL: "https://memorability-8c35d.firebaseio.com",
  projectId: "memorability-8c35d",
  storageBucket: "memorability-8c35d.appspot.com",
  messagingSenderId: "86526497736"
};
firebase.initializeApp(config);
//////////////////////////////////////////////////////////////////////



/////////////////// input use data   ////////////////////////////

//htmlロードが完了したらボタンにイベントを設定
window.addEventListener("load", function() {
  document.getElementById("userInfo").style.display = "block"
  document.getElementById("btnChangeData").addEventListener("click", clickWrite, false)
}, false)

window.onerror = function() {
//  alert("An error occured.\nPlease restart.")
}

//function to post user data
let writeNewPost = function(name, age, gender) {
  // A post entry.
  var postData = {
    author: name,
    uid: age,
    sex: gender
  }
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + name + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
//writeNewPost("01", "testuser", "pic", "Test", "This is a test.")

var clickWrite = function() {
  console.log("click")
  let user = {}
  console.log(typeof document.getElementById("showNameHtml").value)
  user.Name = document.getElementById("showNameHtml").value
  user.Age = document.getElementById("showAgeHtml").value
  user.Gender = document.getElementById("showGenderHtml").value
  console.log(user.Name, user.Age, user.Gender) //.displayName, userData.uid, userData.email, userData.emailVerified)
  if ((typeof user.Name !== "undefined") && (typeof user.Age !== "undefined") && (typeof user.Gender !== "undefined")) {
    writeNewPost(user.Name, user.Age, user.Gender)
    document.getElementById("userInfo").style.display = "none"
    document.getElementById("howTo").style.display = "block"
    document.getElementById("loadImageTime").style.display = "block"
    downloadImg();
  } else {
    alert("Please fill all.")
  }
}
////////////////////////////////////////////////////////////////////////////////



//////////////////// set global variable //////////////////////////////

let images = {}
images.tutorial = {}
images.tutorial.img = []
images.tutorial.verify = []
images.tutorial.meta = []
images.tutorial.result = []

///////////////////////////////////////////////////////////////////////





//////////////////////// Explaination////////////////////////////////


window.addEventListener("load", function() {
  images.place = document.getElementById("placeForImage")
  console.log(images.place)
  images.number = 0
}, false)


//display image file in firebase storage
//get reference to firebase storage
let storageRef = firebase.storage().ref("sampleImage")
let imgBlack = storageRef.child("black.png")

//get reference of a image in image folder
//after html are loaded, displaying image
//window.addEventListener("load", function(){
//  document.getElementById("btnDisplay").addEventListener("click", downloadImg, false)
//}, false)

let downloadImg = function() {
  //get MetaData
  imgBlack.getMetadata().then(function(metadata) {
    console.log(metadata)
  })

  imgBlack.getDownloadURL().then(function(url) {
    images.black = new Image(500, 400)
    images.black.addEventListener("load", downloadImg2, false)
    images.black.src = url
  })
}


let downloadImg2 = function() {
  for (let n = 0; n < 6; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    let imgSample = storageRef.child(imgName)
    console.log("download start" + imgName)
    imgSample.getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images[n] = new Image(500, 400)
      images[n].addEventListener("load", function() {
        //img.size = ImageGetNaturalSize(img)
        if (typeof images[5] !== "undefined") {
          let imageButton = document.getElementById("imageHowTo")
          imageButton.style.display = "block"

          document.getElementById("loadImageTime").style.display = "none"
          imageButton.addEventListener("click", startIntervalDisplay, false)
        }
      }, false)
      images[n].src = url
      console.log("download finished.")
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
}


let startIntervalDisplay = function() {
  console.log(images.place)
  document.getElementById("imageHowTo").style.display = "none"
  images.place.style.display = "block"
  let timerEx = setInterval(displayImages, 500)
  images.time = 0
  setTimeout(function() {
    document.getElementById("explain").style.display = "block"
    document.getElementById("toTutorialButton").addEventListener("click", function() {
      startTutorial()
      clearInterval(timerEx)
      console.log("event set")
    }, false)
  }, 500)
}

let displayImages = function() {
  if ((images.time % 3) === 0) {
    while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
    images.place.appendChild(images[images.number])
    images.number += 1
    if (images.number > 5) {
      images.number = 0
    }
  } else if ((images.time % 3) === 2) {
    while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
    images.place.appendChild(images.black)
  }
  images.time += 1
}

let startTutorial = function() {
  console.log("This is tutorial.")
  document.getElementById("howTo").style.display = "none"
  document.getElementById("placeForImage").style.display = "none"
  document.getElementById("explain").style.display = "none"
  document.getElementById("tutorialFirst").style.display = "block"
  //   document.getElementById("startTutorialButton").addEventListener("click", TutorialEx, false)
  // }
  //
  // let TutorialEx = function() {
  document.getElementById("startTutorialButton").style.display = "none"
  document.getElementById("loadingTutorial").style.display = "block"
  images.one = new Image(500, 400)
  images.two = new Image(500, 400)
  images.three = new Image(500, 400)
  images.one.srcurl = storageRef.child("one.png")
  images.two.srcurl = storageRef.child("second.png")
  images.three.srcurl = storageRef.child("theree.png")
  downloadOne()
}
////////////////////////////////////////////////////////////////////////////








///////////////////////// Tutorial ///////////////////////////////////////////
//let storageRef = firebase.storage().ref("sampleImage")

let downloadOne = function() {
  images.one.srcurl.getDownloadURL().then(function(url) {
    images.one.addEventListener("load", downloadTwo, false)
    images.one.src = url
  })
}
let downloadTwo = function() {
  images.two.srcurl.getDownloadURL().then(function(url) {
    images.two.addEventListener("load", downloadThree, false)
    images.two.src = url
  })
}
let downloadThree = function() {
  images.three.srcurl.getDownloadURL().then(function(url) {
    images.three.addEventListener("load", downloadImageTutorial, false)
    images.three.src = url
  })
}
let downloadImageTutorial = function() {
  let tutorialRef = firebase.storage().ref("tutorial")
  //images.tutorial.verifyを初期化
  for (let M = 0; M < 31; M++) {
    images.tutorial.img[M] = 0
    images.tutorial.verify[M] = 0
  }

  let imgTutorial = []
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 31; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    imgTutorial[n] = tutorialRef.child(imgName)
    console.log("download start" + imgName)

    imgTutorial[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.tutorial.img[n] = new Image(500, 400)
      images.tutorial.img[n].addEventListener("load", function() {
        images.tutorial.verify[n] = 1
        //   //img.size = ImageGetNaturalSize(img)
        //   if ((typeof images.tutorial.img[31]) !== "undefined") {
        //     document.getElementById("loadingTutorial").style.display = "none"
        //     document.getElementById("tutorialSecond").style.display = "block"
        //     //document.getElementById("loadImageTime").style.display="none"
        //     document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
        //     console.log("download finished.")
        //   }
      }, false)
      images.tutorial.img[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }

  for (let n = 0; n < 31; n++) {
    imgTutorial[n].getMetadata().then(function(metadata) {
      images.tutorial.meta[n] = metadata.customMetadata.visType
      console.log(images.tutorial.meta[n])
    })
  }
  let verifyDownloadTu = function() {
    setTimeout(function() {
      let completeTu = images.tutorial.verify[0]
      for (let j = 1; j < 31; j++) {
        completeTu = completeTu * images.tutorial.verify[j]
      }
      return completeTu
    }, 200)
  }
  let verify2 = function() {
    setTimeout(function() {
      let completeTu2 = 1
      for (let t = 0; t < 31; t++) {
        if (typeof images.tutorial.meta[t] !== "undefined") {
          completeTu2 = completeTu2 * 1
        } else {
          completeTu2 = 0
        }
      }
      return completeTu2
    }, 500)
  }
  while (verifyDownloadTu() === 0) {}
  while (verify2() === 0) {}
  document.getElementById("loadingTutorial").style.display = "none"
  document.getElementById("tutorialSecond").style.display = "block"
  //document.getElementById("loadImageTime").style.display="none"
  document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
  console.log("download finished.")
}

let startIntervalTutorial = function() {
  console.log("start")
  //HR, FARの評価は、targetとvigilanceの２枚めにはメタデータを付与しそれをプログラム上で取得、そのデータに基づき判段する。
  //images.tutorial.resultの初期化
  for (let N = 0; N < 30; N++) {
    images.tutorial.result[N] = 0
  }

  let showTutorialResult = function() {
    document.getElementById("tutorialImage").style.display = "none"
    document.getElementById("showResultTutorial").style.display = "block"
    document.getElementById("ButtonTutorialResult").addEventListener("click", function() {
      images.tutorial.sumFar = 0
      images.tutorial.sumMiss = 0
      for (let N = 0; N < 30; N++) {
        console.log(images.tutorial.meta[N])
        if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
          images.tutorial.meta[N] === "vigilance") {
          if (images.tutorial.result[N] !== 1) {
            images.tutorial.sumMiss += 1
          }
        } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
          if (images.tutorial.result[N] === 1) {
            images.tutorial.sumFar += 1
          }
        }
      }
      images.tutorial.Far = images.tutorial.sumFar / 22
      images.tutorial.Miss = images.tutorial.sumMiss / 8
      console.log("FAR = " + images.tutorial.Far)
      console.log("Miss = " + images.tutorial.Miss)

      //実際はここでTutorialの結果により本番に進めるか判定
      document.getElementById("showResultTutorial").style.display = "none"
      document.getElementById("goToRealPart").style.display = "block"
      document.getElementById("backToTutorial").style.display = "block"
      document.getElementById("backToTutorial").addEventListener("click", function() {
        document.getElementById("backToTutorial").style.display = "none"
        document.getElementById("goToRealPart").style.display = "none"
        document.getElementById("giveTutorialImage").style.display = "block"
        document.getElementById("tutorialImage").style.display = "block"
        document.getElementById("tutorialExplain").style.display = "block"
      }, false)
      document.getElementById("goToRealPart").addEventListener("click", function() {
        document.getElementById("goToRealPart").style.display = "none"
        document.getElementById("tutorialFirst").style.display = "none"
        document.getElementById("backToTutorial").style.display = "none"
        startReal()
      }, false)
    }, false)
  }

  let keyDownFunc = function(e) {
    if (e.keyCode === 32) {
      document.addEventListener("keyup", function() {
        document.getElementById("Memorized").style.display = "none"
      })
      images.tutorial.result[(images.number - 1)] = 1
      console.log("number " + (images.number - 1) + " was memorized.")
      document.getElementById("Memorized").style.display = "block"
    }
  }

  let displayTutorial = function() {
    images.tutorial.place = document.getElementById("tutorialImage")
    if (images.time === 0) {
      images.tutorial.place.appendChild(images.three)
    } else if (images.time === 2) {
      while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
      images.tutorial.place.appendChild(images.two)
    } else if (images.time === 4) {
      while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
      images.tutorial.place.appendChild(images.one)
    } else if (images.time > 5) {
      document.addEventListener("keydown", keyDownFunc, false)
      if ((images.time % 3) === 0) {
        console.log((images.number))
        while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
        images.tutorial.place.appendChild(images.tutorial.img[images.number])
        images.number += 1
        if ((images.number) > 29) {
          clearInterval(timerTutorial)
          console.log("timer clear")
          while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
          document.removeEventListener("keydown", keyDownFunc)

          showTutorialResult()
        }
      } else if ((images.time % 3) === 2) {
        while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
        images.tutorial.place.appendChild(images.black)
      }
    }
    images.time += 1
  }

  document.getElementById("tutorialExplain").style.display = "none"
  document.getElementById("giveTutorialImage").style.display = "none"
  images.time = 0
  images.number = 0
  let timerTutorial = setInterval(displayTutorial, 100) //00)
  //document.getElementById("explain").style.display = "block"
}
// var imgWidth = $('img#sample').width();　 //img#sampleのwidthを調べてimgWidthに代入
// var imgHeight = $('img#sample').height();　 //img#sampleのheightを調べてimgHeightに代入
//
// aspectRatio = imgWidth / imgHeight　 //横幅÷縦幅の値をaspectRatioに代入







//   //From here real experiment

let startReal = function() {
  console.log("This is Real.")
  //document.getElementById("howTo").style.display = "none"
  //document.getElementById("placeForImage").style.display = "none"
  //document.getElementById("explain").style.display = "none"
  document.getElementById("realFirst").style.display = "block"
  document.getElementById("ButtonCourse").style.display = "block"
  document.getElementById("ButtonCourse1").addEventListener("click", RealEx, false)
}

let RealEx = function() {
  document.getElementById("ButtonCourse").style.display = "none"
  document.getElementById("realExplain").style.display = "none"
  document.getElementById("loadingReal").style.display = "block"
  images.one = new Image(500, 400)
  images.two = new Image(500, 400)
  images.three = new Image(500, 400)
  images.one.srcurl = storageRef.child("one.png")
  images.two.srcurl = storageRef.child("second.png")
  images.three.srcurl = storageRef.child("theree.png")
  downloadOneR()
}
//var storageRef = firebase.storage().ref("sampleImage")

let downloadOneR = function() {
  images.one.srcurl.getDownloadURL().then(function(url) {
    images.one.addEventListener("load", downloadTwoR, false)
    images.one.src = url
  })
}
let downloadTwoR = function() {
  images.two.srcurl.getDownloadURL().then(function(url) {
    images.two.addEventListener("load", downloadThreeR, false)
    images.two.src = url
  })
}
let downloadThreeR = function() {
  images.three.srcurl.getDownloadURL().then(function(url) {
    images.three.addEventListener("load", downloadImageReal, false)
    images.three.src = url
  })
}
let downloadImageReal = function() {
  let realRef = firebase.storage().ref("tutorial")
  images.real = {}
  //images.real.verifyを初期化
  for (let M = 0; M < 31; M++) {
    images.real[M] = 0
    images.real[M].verify = 0
  }
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 31; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    var imgReal = realRef.child(imgName)
    console.log("download start" + imgName)
    imgReal.getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.real[n] = new Image(500, 400)
      images.real[n].addEventListener("load", function() {
        images.real[n].verify = 1
        //img.size = ImageGetNaturalSize(img)
        // if (typeof images.real[31] !== "undefined") {
        //   document.getElementById("loadingReal").style.display = "none"
        //   document.getElementById("realSecond").style.display = "block"
        //   //document.getElementById("loadImageTime").style.display="none"
        //   document.getElementById("giveRealImage").addEventListener("click", startIntervalReal, false)
        //   console.log("download finished.")
        // }
      }, false)
      images.real[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
  let verifyDownloadR = function() {
    let completeR = images.real[0].verify
    for (let j = 1; j < 30; j++) {
      completeR = completeR * images.real[j].verify
    }
    return completeR
  }
  while (verifyDownloadR() === 0) {}
  document.getElementById("loadingReal").style.display = "none"
  document.getElementById("realSecond").style.display = "block"
  //document.getElementById("loadImageTime").style.display="none"
  document.getElementById("giveRealImage").addEventListener("click", startIntervalReal, false)
  console.log("download finished.")
}

let startIntervalReal = function() {
  images.real.result = {}
  for (let N = 0; N < 30; N++) {
    images.real.result[N] = 0
  }

  let showRealResult = function() {
    document.getElementById("realImage").style.display = "none"
    document.getElementById("showResultReal").style.display = "block"
    document.getElementById("ButtonRealResult").addEventListener("click", function() {
      for (let N = 0; N < 30; N++) {
        console.log(images.real.result[N])
      }
      //実際はここでTutorialの結果により本番に進めるか判定
      document.getElementById("ButtonRealResult").style.display = "none"
      //document.getElementById("goToRealPart").style.display = "block"
      //document.getElementById("goToRealPart").addEventListener("click", function() {
      //   document.getElementById("goToRealPart").style.display = "none"
      //   document.getElementById("tutorialFirst").style.display = "none"
      // }, false)
    }, false)
  }

  let keyDownFuncR = function(e) {
    if (e.keyCode === 32) {
      images.real.result[(images.number - 1)] = 1
      console.log("number " + (images.number - 1) + " was memorized.")
    }
  }

  let displayReal = function() {
    images.real.place = document.getElementById("realImage")
    if (images.time === 0) {
      images.real.place.appendChild(images.three)
    } else if (images.time === 2) {
      while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
      images.real.place.appendChild(images.two)
    } else if (images.time === 4) {
      while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
      images.real.place.appendChild(images.one)
    } else if (images.time > 5) {
      document.addEventListener("keydown", keyDownFuncR, false)
      if ((images.time % 3) === 0) {
        console.log((images.number))
        while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
        images.real.place.appendChild(images.real[(images.number)])
        images.number += 1
        if ((images.number) > 30) {
          clearInterval(timerReal)
          console.log("timer clear")
          document.removeEventListener("keydown", event)
          showRealResult()
        }
      } else if ((images.time % 3) === 2) {
        while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
        images.real.place.appendChild(images.black)
      }
    }
    images.time += 1
  }

  document.getElementById("giveRealImage").style.display = "none"
  images.time = 0
  images.number = 0
  var timerReal = setInterval(displayReal, 500) //00)
  //document.getElementById("explain").style.display = "block"
}
