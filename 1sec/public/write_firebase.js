//////////////// Initialize Firebase/////////////////////////////////
console.log("init")

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAmw_qUkLApLVvcpJZ8FthhAiWM0-7Z5AU",
  authDomain: "memorability-a0c21.firebaseapp.com",
  databaseURL: "https://memorability-a0c21.firebaseio.com",
  projectId: "memorability-a0c21",
  storageBucket: "memorability-a0c21.appspot.com",
  messagingSenderId: "355761335744"
};
firebase.initializeApp(config);
//////////////////////////////////////////////////////////////////////



//////////////////// set global variable //////////////////////////////

let images = {}
images.tutorial1 = {}
images.tutorial2 = {}
images.tutorial1.img = []
images.tutorial1.verify = []
images.tutorial2.img = []
images.tutorial2.verify = []
images.tutorial2.meta = []
images.tutorial2.result = []
images.real1 = {}
images.real2 = {}
images.real1.img = []
images.real1.verify = []
images.real2.img = []
images.real2.verify = []
images.real2.meta = []
images.real2.result = []

let user = {}

///////////////////////////////////////////////////////////////////////



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
    age: age,
    sex: gender
  }
  // Get a key for a new Post.
  images.newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + images.newPostKey] = postData;
  updates['/user-posts/' + name + '/' + images.newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
//writeNewPost("01", "testuser", "pic", "Test", "This is a test.")

var clickWrite = function() {
  console.log(typeof document.getElementById("showNameHtml").value)
  user.Name = document.getElementById("showNameHtml").value
  user.Age = document.getElementById("showAgeHtml").value
  user.Gender = document.getElementById("showGenderHtml").value
  console.log(user.Name, user.Age, user.Gender) //.displayName, userData, userData.email, userData.emailVerified)
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

  console.log(images.newPostKey)
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
  console.log(images.newPostKey)
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
        if (typeof images[0] !== "undefined" && typeof images[5] !== "undefined") {
          let imageButton = document.getElementById("imageHowTo")
          imageButton.style.display = "block"

          document.getElementById("loadImageTime").style.display = "none"
          document.getElementById("showImageButton").addEventListener("click", startIntervalDisplay, false)
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
  console.log(images.newPostKey)
  document.getElementById("imageHowTo").style.display = "none"
  document.getElementById("showImageButton").style.display = "none"
  images.place.style.display = "block"
  let timerEx = setInterval(displayImages, 50)
  images.time = 0
  setTimeout(function() {
    document.getElementById("explain").style.display = "block"
    document.getElementById("nextExplain").addEventListener("click", function() {
      Explain2()
      clearInterval(timerEx)
      console.log("event set")
    }, false)
  }, 50)
}

let Explain2 = function() {
  document.getElementById("explain").style.display = "none"
  while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
  images.number = 0
  let timerEx2 = setInterval(displayEx, 50)
  document.getElementById("explain2").style.display = "block"
  document.getElementById("toTutorialButton").addEventListener("click", function() {
    startTutorial()
    clearInterval(timerEx2)
  }, false)
}

// let displayImages = function() {
//   if ((images.time % 21) === 0) {
//     while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
//     images.place.appendChild(images[images.number])
//     images.number += 1
//     if (images.number > 5) {
//       images.number = 0
//     }
//   } else if ((images.time % 21) === 20) {
//     while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
//     images.place.appendChild(images.black)
//   }
//   images.time += 1
// }

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

let displayEx = function() {
  if ((images.time % 5) === 0) {
    while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
    images.place.appendChild(images[images.number])
    images.number += 1
    if (images.number > 5) {
      images.number = 0
    }
  } else if ((images.time % 5) === 4) {
    while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
    images.place.appendChild(images.black)
  }
  images.time += 1
}

let startTutorial = function() {
  console.log("This is tutorial.")
  document.getElementById("howTo").style.display = "none"
  document.getElementById("placeForImage").style.display = "none"
  document.getElementById("explain2").style.display = "none"
  document.getElementById("tutorialFirst").style.display = "block"
  //   document.getElementById("startTutorialButton").addEventListener("click", TutorialEx, false)
  // }
  //
  // let TutorialEx = function() {
  document.getElementById("startTutorialButton1").style.display = "block"
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
  let tutorialRef1 = firebase.storage().ref("tutorial1st")
  let tutorialRef2 = firebase.storage().ref("tutorial2nd")
  //images.tutorial.verifyを初期化
  for (let M = 0; M < 15; M++) {
    images.tutorial1.img[M] = 0
    images.tutorial1.verify[M] = 0
    images.tutorial2.img[M] = 0
    images.tutorial2.verify[M] = 0
  }

  let imgTutorial1 = []
  let imgTutorial2 = []
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 15; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    imgTutorial1[n] = tutorialRef1.child(imgName)
    console.log("download start" + imgName)

    imgTutorial1[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.tutorial1.img[n] = new Image(500, 400)
      images.tutorial1.img[n].addEventListener("load", function() {
        images.tutorial1.verify[n] = 1
        //   //img.size = ImageGetNaturalSize(img)
        //   if ((typeof images.tutorial.img[31]) !== "undefined") {
        //     document.getElementById("loadingTutorial").style.display = "none"
        //     document.getElementById("tutorialSecond").style.display = "block"
        //     //document.getElementById("loadImageTime").style.display="none"
        //     document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
        //     console.log("download finished.")
        //   }
      }, false)
      images.tutorial1.img[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
  for (let n = 0; n < 31; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    imgTutorial2[n] = tutorialRef2.child(imgName)
    console.log("download start" + imgName)

    imgTutorial2[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.tutorial2.img[n] = new Image(500, 400)
      images.tutorial2.img[n].addEventListener("load", function() {
        images.tutorial2.verify[n] = 1
        //   //img.size = ImageGetNaturalSize(img)
        //   if ((typeof images.tutorial.img[31]) !== "undefined") {
        //     document.getElementById("loadingTutorial").style.display = "none"
        //     document.getElementById("tutorialSecond").style.display = "block"
        //     //document.getElementById("loadImageTime").style.display="none"
        //     document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
        //     console.log("download finished.")
        //   }
      }, false)
      images.tutorial2.img[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
  for (let n = 0; n < 31; n++) {
    imgTutorial2[n].getMetadata().then(function(metadata) {
      images.tutorial2.meta[n] = metadata.customMetadata.visType
      console.log(images.tutorial2.meta[n])
    })
  }
  let verifyDownloadTu1 = function() {
    setTimeout(function() {
      let completeTu = images.tutorial1.verify[0]
      for (let j = 1; j < 15; j++) {
        completeTu = completeTu * images.tutorial1.verify[j]
      }
      return completeTu
    }, 200)
  }
  let verifyDownloadTu2 = function() {
    setTimeout(function() {
      let completeTu = images.tutorial2.verify[0]
      for (let j = 1; j < 31; j++) {
        completeTu = completeTu * images.tutorial2.verify[j]
      }
      return completeTu
    }, 200)
  }
  while (verifyDownloadTu1() === 0) {}
  while (verifyDownloadTu2() === 0) {}
  document.getElementById("loadingTutorial").style.display = "none"
  document.getElementById("tutorialSecond1").style.display = "block"
  document.getElementById("tutorialImage1").style.display = "block"
  //document.getElementById("loadImageTime").style.display="none"
  document.getElementById("giveTutorialImage1").addEventListener("click", startIntervalTutorial1, false)
  console.log("download finished.")
}

let startIntervalTutorial1 = function() {
  console.log("start")

  let goTutorialSecond = function() {
    document.getElementById("tutorialImage1").style.display = "none"
    document.getElementById("goTutorial2").style.display = "block"
    document.getElementById("buttonGoTutorial2").addEventListener("click", function() {
      //実際はここでTutorialの結果により本番に進めるか判定
      document.getElementById("goTutorial2").style.display = "none"
      document.getElementById("tutorialImage2").style.display = "block"
      document.getElementById("tutorial2").style.display = "block"
      document.getElementById("giveTutorialImage2").addEventListener("click", function() {
        document.getElementById("tutorial2").style.display = "none"
        startIntervalTutorial2()
      }, false)
    }, false)
  }

  let displayTutorial1 = function() {
    images.tutorial1.place = document.getElementById("tutorialImage1")
    if (images.time === 0) {
      images.tutorial1.place.appendChild(images.three)
    } else if (images.time === 2) {
      while (images.tutorial1.place.firstChild) images.tutorial1.place.removeChild(images.tutorial1.place.firstChild);
      images.tutorial1.place.appendChild(images.two)
    } else if (images.time === 4) {
      while (images.tutorial1.place.firstChild) images.tutorial1.place.removeChild(images.tutorial1.place.firstChild);
      images.tutorial1.place.appendChild(images.one)
    } else if (images.time > 5) {
      // else if (( (images.time-6) % 21) === 0) {
      //   console.log((images.number))
      //   while (images.tutorial1.place.firstChild) images.tutorial1.place.removeChild(images.tutorial1.place.firstChild);
      //   images.tutorial1.place.appendChild(images.tutorial1.img[images.number])
      //   images.number += 1
      // } else if (( (images.time-6) % 21) === 20) {
      //   while (images.tutorial1.place.firstChild) images.tutorial1.place.removeChild(images.tutorial1.place.firstChild);
      //   images.tutorial1.place.appendChild(images.black)
      // }
      if (((images.time - 6) % 3) === 0) {
        if ((images.number) > 14) {
          clearInterval(timerTutorial)
          console.log("timer clear")
          while (images.tutorial1.place.firstChild) images.tutorial1.place.removeChild(images.tutorial1.place.firstChild);
          goTutorialSecond()
        }
        console.log((images.number))
        while (images.tutorial1.place.firstChild) images.tutorial1.place.removeChild(images.tutorial1.place.firstChild);
        images.tutorial1.place.appendChild(images.tutorial1.img[images.number])
        images.number += 1
      } else if (((images.time - 6) % 3) === 2) {
        while (images.tutorial1.place.firstChild) images.tutorial1.place.removeChild(images.tutorial1.place.firstChild);
        images.tutorial1.place.appendChild(images.black)
      }
    }
    console.log(images.time)
    images.time += 1
  }

  document.getElementById("tutorialSecond1").style.display = "none"
  images.time = 0
  images.number = 0
  let timerTutorial = setInterval(displayTutorial1, 50) //00)
  //document.getElementById("explain").style.display = "block"
}
// var imgWidth = $('img#sample').width();　 //img#sampleのwidthを調べてimgWidthに代入
// var imgHeight = $('img#sample').height();　 //img#sampleのheightを調べてimgHeightに代入
//
// aspectRatio = imgWidth / imgHeight　 //横幅÷縦幅の値をaspectRatioに代入


let startIntervalTutorial2 = function() {
  console.log("start")
  //HR, FARの評価は、targetとvigilanceの２枚めにはメタデータを付与しそれをプログラム上で取得、そのデータに基づき判段する。
  //images.tutorial.resultの初期化
  for (let N = 0; N < 30; N++) {
    images.tutorial2.result[N] = 0
  }

  let showTutorialResult = function() {
    document.getElementById("tutorialImage2").style.display = "none"
    document.getElementById("showResultTutorial").style.display = "block"
    //document.getElementById("ButtonTutorialResult").style.display = "block"
    document.getElementById("ButtonTutorialResult").addEventListener("click", function() {
      images.tutorial2.sumFar = 0
      images.tutorial2.sumMiss = 0
      for (let N = 0; N < 30; N++) {
        console.log(images.tutorial2.meta[N])
        if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
          images.tutorial2.meta[N] === "vigilance") {
          if (images.tutorial2.result[N]　=== 0) {
            images.tutorial2.sumMiss += 1
          }
        } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
          if (images.tutorial2.result[N] === 1) {
            images.tutorial2.sumFar += 1
          }
        }
      }
      images.tutorial2.Far = images.tutorial2.sumFar / 15
      images.tutorial2.Miss = images.tutorial2.sumMiss / 15
      console.log("FAR = " + images.tutorial2.Far)
      console.log("Miss = " + images.tutorial2.Miss)

      //実際はここでTutorialの結果により本番に進めるか判定
      document.getElementById("showResultTutorial").style.display = "none"
      document.getElementById("goToRealPart").style.display = "block"
      document.getElementById("backToTutorial").style.display = "block"
      document.getElementById("backToTutorial").addEventListener("click", function() {
        document.getElementById("backToTutorial").style.display = "none"
        document.getElementById("goToRealPart").style.display = "none"
        document.getElementById("tutorialSecond1").style.display = "block"
        document.getElementById("tutorialImage1").style.display = "block"
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
      if (images.key === 0) {
        document.addEventListener("keyup", function() {
          document.getElementById("Memorized2").style.display = "none"
        })
        images.tutorial2.result[(images.number - 1)] = 1
        console.log("number " + (images.number - 1) + " was memorized.")
        document.getElementById("Memorized2").style.display = "block"
        images.key = 1
      }
    }
  }

  let keyUpFunc = function(e) {
    if (e.keyCode === 32) {
      images.key = 0
    }
  }

  let displayTutorial2 = function() {
    images.tutorial2.place = document.getElementById("tutorialImage2")
    if (images.time === 0) {
      images.tutorial2.place.appendChild(images.three)
    } else if (images.time === 2) {
      while (images.tutorial2.place.firstChild) images.tutorial2.place.removeChild(images.tutorial2.place.firstChild);
      images.tutorial2.place.appendChild(images.two)
    } else if (images.time === 4) {
      while (images.tutorial2.place.firstChild) images.tutorial2.place.removeChild(images.tutorial2.place.firstChild);
      images.tutorial2.place.appendChild(images.one)
    } else if (images.time > 5) {
      document.addEventListener("keypress", keyDownFunc, false)
      document.addEventListener("keyup", keyUpFunc, false)
      if (((images.time - 6) % 5) === 0) {
        if ((images.number) > 29) {
          clearInterval(timerTutorial)
          console.log("timer clear")
          while (images.tutorial2.place.firstChild) images.tutorial2.place.removeChild(images.tutorial2.place.firstChild);
          document.removeEventListener("keypress", keyDownFunc)
          showTutorialResult()
        }
        console.log((images.number))
        while (images.tutorial2.place.firstChild) images.tutorial2.place.removeChild(images.tutorial2.place.firstChild);
        images.tutorial2.place.appendChild(images.tutorial2.img[images.number])
        images.number += 1
      } else if (((images.time - 6) % 5) === 4) {
        while (images.tutorial2.place.firstChild) images.tutorial2.place.removeChild(images.tutorial2.place.firstChild);
        images.tutorial2.place.appendChild(images.black)
      }
    }
    images.time += 1
  }

  document.getElementById("tutorial2").style.display = "none"
  images.time = 0
  images.number = 0
  let timerTutorial = setInterval(displayTutorial2, 50) //00)
  //document.getElementById("explain").style.display = "block"
}





//   //From here real experiment

let startReal = function() {
  console.log("This is Real.")
  //document.getElementById("howTo").style.display = "none"
  //document.getElementById("placeForImage").style.display = "none"
  //document.getElementById("explain").style.display = "none"
  document.getElementById("realFirst").style.display = "block"
  document.getElementById("ButtonCourse").style.display = "block"
  for (let n = 0; n < 20; n++) {
    document.getElementById('' + "ButtonCourse" + (n + 1) ).addEventListener("click", function() {
      images.real1.course = n + 1
      //既にプレイしたか判定
      // firebase.database().ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real1.course + "/Far").once('value').then(function(snapshot) {
      firebase.database().ref("/user-posts/" + user.Name + "/course" + '' + images.real1.course + "/Far").once('value').then(function(snapshot) {
        console.log(snapshot._e.T)
        if (typeof snapshot._e.T === "undefined") {
          RealEx();
        } else {
          alert("You have done this course.")
          RealEx()
        }
      })
    }, false)
  }
}

let RealEx = function() {
  document.getElementById("ButtonCourse").style.display = "none"
  document.getElementById("realExplain").style.display = "none"
  document.getElementById("loadingReal").style.display = "block"
  console.log(images.real1.course)
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
  console.log("one")
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
  let realRef1 = firebase.storage().ref("course" + images.real1.course + "/1st")
  let realRef2 = firebase.storage().ref("course" + images.real1.course + "/2nd")
  //let realRef1 = firebase.storage().ref("course" + '' + images.real1.course +"/real1st")
  //let realRef2 = firebase.storage().ref("course" + '' + images.real1.course +"/real2nd")
  //images.tutorial.verifyを初期化
  for (let M = 0; M <60; M++) {
    images.real1.img[M] = 0
    images.real1.verify[M] = 0
    images.real2.img[M] = 0
    images.real2.verify[M] = 0
  }

  let imgReal1 = []
  let imgReal2 = []
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 30; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    imgReal1[n] = realRef1.child(imgName)
    console.log("download start" + imgName)

    imgReal1[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.real1.img[n] = new Image(500, 400)
      images.real1.img[n].addEventListener("load", function() {
        images.real1.verify[n] = 1
        //   //img.size = ImageGetNaturalSize(img)
        //   if ((typeof images.tutorial.img[31]) !== "undefined") {
        //     document.getElementById("loadingTutorial").style.display = "none"
        //     document.getElementById("tutorialSecond").style.display = "block"
        //     //document.getElementById("loadImageTime").style.display="none"
        //     document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
        //     console.log("download finished.")
        //   }
      }, false)
      images.real1.img[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
  for (let n = 0; n < 60; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    imgReal2[n] = realRef2.child(imgName)
    console.log("download start" + imgName)

    imgReal2[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.real2.img[n] = new Image(500, 400)
      images.real2.img[n].addEventListener("load", function() {
        images.real2.verify[n] = 1
        //   //img.size = ImageGetNaturalSize(img)
        //   if ((typeof images.tutorial.img[31]) !== "undefined") {
        //     document.getElementById("loadingTutorial").style.display = "none"
        //     document.getElementById("tutorialSecond").style.display = "block"
        //     //document.getElementById("loadImageTime").style.display="none"
        //     document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
        //     console.log("download finished.")
        //   }
      }, false)
      images.real2.img[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
  for (let n = 0; n < 60; n++) {
    imgReal2[n].getMetadata().then(function(metadata) {
      images.real2.meta[n] = metadata.customMetadata.visType
      console.log(images.real2.meta[n])
    })
  }
  let verifyDownloadTu1 = function() {
    setTimeout(function() {
      let completeTu = images.real1.verify[0]
      for (let j = 1; j < 60; j++) {
        completeTu = completeTu * images.real1.verify[j]
      }
      return completeTu
    }, 200)
  }
  let verifyDownloadTu2 = function() {
    setTimeout(function() {
      let completeTu = images.real2.verify[0]
      for (let j = 1; j < 60; j++) {
        completeTu = completeTu * images.real2.verify[j]
      }
      return completeTu
    }, 200)
  }
  while (verifyDownloadTu1() === 0) {}
  while (verifyDownloadTu2() === 0) {}
  document.getElementById("loadingReal").style.display = "none"
  document.getElementById("realSecond1").style.display = "block"
  document.getElementById("realImage1").style.display = "block"
  //document.getElementById("loadImageTime").style.display="none"
  document.getElementById("giveRealImage1").addEventListener("click", startIntervalReal1, false)
  console.log("download finished.")
}

let startIntervalReal1 = function() {
  console.log("start")

  let goRealSecond = function() {
    document.getElementById("realImage1").style.display = "none"
    document.getElementById("goReal2").style.display = "block"
    document.getElementById("buttonGoReal2").addEventListener("click", function() {
      document.getElementById("goReal2").style.display = "none"
      document.getElementById("realImage2").style.display = "block"
      document.getElementById("real2").style.display = "block"
      document.getElementById("giveRealImage2").addEventListener("click", function() {
        document.getElementById("real2").style.display = "none"
        startIntervalReal2()
      }, false)
    }, false)
  }

  let displayReal1 = function() {
    images.real1.place = document.getElementById("realImage1")
    if (images.time === 0) {
      images.real1.place.appendChild(images.three)
    } else if (images.time === 2) {
      while (images.real1.place.firstChild) images.real1.place.removeChild(images.real1.place.firstChild);
      images.real1.place.appendChild(images.two)
    } else if (images.time === 4) {
      while (images.real1.place.firstChild) images.real1.place.removeChild(images.real1.place.firstChild);
      images.real1.place.appendChild(images.one)
    } else if (images.time > 5) {
      // else if (( (images.time-6) % 21) === 0) {
      //   console.log((images.number))
      //   while (images.real1.place.firstChild) images.real1.place.removeChild(images.real1.place.firstChild);
      //   images.real1.place.appendChild(images.real1.img[images.number])
      //   images.number += 1
      // } else if (( (images.time-6) % 21) === 20) {
      //   while (images.real1.place.firstChild) images.real1.place.removeChild(images.real1.place.firstChild);
      //   images.real1.place.appendChild(images.black)
      // }
      if (((images.time - 6) % 3) === 0) {
        if ((images.number) > 29) {
          clearInterval(timerReal)
          console.log("timer clear")
          while (images.real1.place.firstChild) images.real1.place.removeChild(images.real1.place.firstChild);
          goRealSecond()
        }
        console.log((images.number))
        while (images.real1.place.firstChild) images.real1.place.removeChild(images.real1.place.firstChild);
        images.real1.place.appendChild(images.real1.img[images.number])
        images.number += 1
      } else if (((images.time - 6) % 3) === 2) {
        while (images.real1.place.firstChild) images.real1.place.removeChild(images.real1.place.firstChild);
        images.real1.place.appendChild(images.black)
      }
    }
    console.log(images.time)
    images.time += 1
  }

  document.getElementById("realSecond1").style.display = "none"
  images.time = 0
  images.number = 0
  let timerReal = setInterval(displayReal1, 50) //00)
  //document.getElementById("explain").style.display = "block"
}
// var imgWidth = $('img#sample').width();　 //img#sampleのwidthを調べてimgWidthに代入
// var imgHeight = $('img#sample').height();　 //img#sampleのheightを調べてimgHeightに代入
//
// aspectRatio = imgWidth / imgHeight　 //横幅÷縦幅の値をaspectRatioに代入


let startIntervalReal2 = function() {
  console.log("start")
  //HR, FARの評価は、targetとvigilanceの２枚めにはメタデータを付与しそれをプログラム上で取得、そのデータに基づき判段する。
  //images.real.resultの初期化
  for (let N = 0; N < 60; N++) {
    images.real2.result[N] = 0
  }

  let showRealResult = function() {
    document.getElementById("realImage2").style.display = "none"
    console.log("button")
    //document.getElementById("showResultReal").style.display = "block"
    document.getElementById("showResultReal").style.display = "block"
    document.getElementById("ButtonRealResult").addEventListener("click", function() {
      images.real2.sumFarV = 0
      images.real2.sumMissV = 0
      images.real2.sumFarT = 0
      images.real2.sumMissT = 0
      // for (let N = 0; N < 60; N++) {
      //   if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
      //     images.real2.meta[N] === "vigilance") {
      //     if (images.real2.result[N] !== 1) {
      //       images.real2.sumMissV += 1
      //     }
      //   } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
      //     if (images.real2.result[N] === 1) {
      //       images.real2.sumFarV += 1
      //     }
      //   }
      // }
      console.log("input are")
      for (let N = 0; N < 60; N++) {
        if(images.real2.result[N] === 1){
          console.log(N)
        }
        if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
          images.real2.meta[N] === "target") {
          if (images.real2.result[N] === 0) {
            images.real2.sumMissT += 1
          }
        } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
          if (images.real2.result[N] === 1) {
            images.real2.sumFarT += 1
          }
        }
      }
      images.real2.FarV = images.real2.sumFarV / 30
      images.real2.MissV = images.real2.sumMissV / 30
      images.real2.FarT = images.real2.sumFarT / 30
      images.real2.MissT = images.real2.sumMissT / 30
      document.getElementById("showResultReal").style.display = "none"
      //document.getElementById("showResultreal2").style.display = "none"
      console.log("Target FAR = " + images.real2.FarT)
      console.log("Target Miss = " + images.real2.MissT)
      sendData()
      //document.getElementById("goToRealPart").style.display = "block"
      //document.getElementById("goToRealPart").addEventListener("click", function() {
      //   document.getElementById("goToRealPart").style.display = "none"
      //   document.getElementById("tutorialFirst").style.display = "none"
      // }, false)
    }, false)
  }

  let keyDownFunc = function(e) {
    if (e.keyCode === 32) {
      if (images.key === 0) {
        document.addEventListener("keyup", function() {
          document.getElementById("Memorized2").style.display = "none"
        })
        images.real2.result[(images.number - 1)] = 1
        console.log("number " + (images.number - 1) + " was memorized.")
        document.getElementById("Memorized2").style.display = "block"
        images.key = 1
      }
    }
  }

  let keyUpFunc = function(e) {
    if (e.keyCode === 32) {
      images.key = 0
    }
  }

  let displayReal2 = function() {
    images.real2.place = document.getElementById("realImage2")
    if (images.real2.time === 0) {
      images.real2.place.appendChild(images.three)
    } else if (images.real2.time === 2) {
      while (images.real2.place.firstChild) images.real2.place.removeChild(images.real2.place.firstChild);
      images.real2.place.appendChild(images.two)
    } else if (images.real2.time === 4) {
      while (images.real2.place.firstChild) images.real2.place.removeChild(images.real2.place.firstChild);
      images.real2.place.appendChild(images.one)
    } else if (images.real2.time > 5) {
      document.addEventListener("keypress", keyDownFunc, false)
      document.addEventListener("keyup", keyUpFunc, false)
      if (((images.real2.time - 6) % 5) === 0) {
        if ((images.number) > 59) {
          clearInterval(timerReal)
          console.log("timer clear")
          while (images.real2.place.firstChild) images.real2.place.removeChild(images.real2.place.firstChild);
          document.removeEventListener("keypress", keyDownFunc)
          showRealResult()
        }
        console.log((images.number))
        while (images.real2.place.firstChild) images.real2.place.removeChild(images.real2.place.firstChild);
        images.real2.place.appendChild(images.real2.img[images.number])
        images.number += 1
      } else if (((images.real2.time - 6) % 5) === 4) {
        while (images.real2.place.firstChild) images.real2.place.removeChild(images.real2.place.firstChild);
        images.real2.place.appendChild(images.black)
      }
    }
    images.real2.time += 1
    console.log(images.real2.time)
  }

  document.getElementById("real2").style.display = "none"
  images.real2.time = 0
  images.number = 0
  let timerReal = setInterval(displayReal2, 200) //00)
  //document.getElementById("explain").style.display = "block"
}
//
// let startIntervalReal = function() {
//   images.real.result = {}
//   for (let N = 0; N < 30; N++) {
//     images.real.result[N] = 0
//   }
//
//   let showRealResult = function() {
//     document.getElementById("realImage").style.display = "none"
//     //document.getElementById("showResultReal").style.display = "block"
//     document.getElementById("resultReal").style.display = "block"
//     document.getElementById("ButtonRealResult").addEventListener("click", function() {
//       images.real.sumFarV = 0
//       images.real.sumMissV = 0
//       images.real.sumFarT = 0
//       images.real.sumMissT = 0
//       for (let N = 0; N < 30; N++) {
//         console.log(images.real.meta[N])
//         if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
//           images.real.meta[N] === "vigilance") {
//           if (images.real.result[N] !== 1) {
//             images.real.sumMissV += 1
//           }
//         } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
//           if (images.real.result[N] === 1) {
//             images.real.sumFarV += 1
//           }
//         }
//       }
//       for (let N = 0; N < 30; N++) {
//         if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
//           images.real.meta[N] === "target") {
//           if (images.real.result[N] !== 1) {
//             images.real.sumMissT += 1
//           }
//         } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
//           if (images.real.result[N] === 1) {
//             images.real.sumFarT += 1
//           }
//         }
//       }
//       images.real.FarV = images.real.sumFarV / 22
//       images.real.MissV = images.real.sumMissV / 8
//       images.real.FarT = images.real.sumFarT / 22
//       images.real.MissT = images.real.sumMissT / 8
//       document.getElementById("resultReal").style.display = "none"
//       //document.getElementById("showResultReal").style.display = "none"
//       console.log("Vigilance FAR = " + images.real.FarV)
//       console.log("Vigilance Miss = " + images.real.MissV)
//       sendData()
//       //document.getElementById("goToRealPart").style.display = "block"
//       //document.getElementById("goToRealPart").addEventListener("click", function() {
//       //   document.getElementById("goToRealPart").style.display = "none"
//       //   document.getElementById("tutorialFirst").style.display = "none"
//       // }, false)
//     }, false)
//   }
//
//   let keyDownFuncR = function(e) {
//     if (e.keyCode === 32) {
//       images.real.result[(images.number - 1)] = 1
//       console.log("number " + (images.number - 1) + " was memorized.")
//     }
//   }
//
//   let displayReal = function() {
//     images.real.place = document.getElementById("realImage")
//     if (images.time === 0) {
//       images.real.place.appendChild(images.three)
//     } else if (images.time === 2) {
//       while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//       images.real.place.appendChild(images.two)
//     } else if (images.time === 4) {
//       while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//       images.real.place.appendChild(images.one)
//     } else if (images.time > 5) {
//       document.addEventListener("keydown", keyDownFuncR, false)
//       if ((images.time % 3) === 0) {
//         console.log((images.number))
//         while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//         images.real.place.appendChild(images.real.img[(images.number)])
//         images.number += 1
//         if ((images.number) > 29) {
//           clearInterval(timerReal)
//           console.log("timer clear")
//           while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//           document.removeEventListener("keydown", keyDownFuncR)
//           showRealResult()
//         }
//       } else if ((images.time % 3) === 2) {
//         while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//         images.real.place.appendChild(images.black)
//       }
//     }
//     images.time += 1
//   }
//
//   document.getElementById("giveRealButton").style.display = "none"
//   images.time = 0
//   images.number = 0
//   var timerReal = setInterval(displayReal, 50) //00)
//   //document.getElementById("explain").style.display = "block"
// }

let sendData = function() {
  console.log(images.newPostKey)
  let sendButton = document.getElementById("sendResult")
  sendButton.style.display = "block"
  sendButton.addEventListener("click", function() {
    let db = firebase.database()
    setTimeout(function() {
      // images.address = db.ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real1.course)
      images.address = db.ref("/user-posts/" + user.Name + "/course" + '' + images.real1.course)
      // Write the new post's data simultaneously in the posts list and the user's post list.
      // var updates = {};
      // updates['/posts/' + newPostKey] = postData;
      // updates['/user-posts/' + name + '/' + newPostKey] = postData;
      // images.address.set({
      //   "Far": images.real2.FarV,
      //   "Miss": images.real2.MissV
      // })
      images.result = []
        console.log("results")
      for (let n = 0; n < 60; n++) {
        console.log(images.real2.result[n])
        images.result[n] = {}
        images.result[n].nameV = []
        images.result[n].nameT = []
        images.result[n].resultV = []
        images.result[n].resultT = []
      }
      images.addressSum = db.ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real1.course)
      images.addressSum.update({
        "Far": images.real2.FarT,
        "Miss": images.real2.MissT
      })
      // Write the new post's data simultaneously in the posts list and the user's post list.

      let N = 0
      for (let n = 0; n < 60; n++) {
        if (images.real2.meta[n] === "vigilance") {
          console.log(n)
          images.result[images.real1.course].nameV[N] = '' + n
          images.result[images.real1.course].resultV[N] = images.real2.result[n]
          N += 1
        }
      }
      N = 0
      console.log("targets are")
      for (let n = 0; n < 60; n++) {
        if (images.real2.meta[n] === "target") {
          console.log(n)
          images.result[images.real1.course].nameT[N] = '' + n
          images.result[images.real1.course].resultT[N] = images.real2.result[n]
          N += 1
        }
      }
      for (let n = 0; n < 60; n++) {
        if (typeof images.result[images.real1.course].resultV[n] !== "undefined") {
          // images.addressV = db.ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real1.course + "/vigilance/" + images.result[images.real1.course].nameV[n])
          images.addressV = db.ref("/user-posts/" + user.Name + "/course" + '' + images.real1.course + "/vigilance/" + images.result[images.real1.course].nameV[n])
          images.addressVP = db.ref("/per-image/course" + '' + images.real1.course + "/vigilance/" + images.result[images.real1.course].nameV[n])
          images.addressVPU = db.ref("/per-image-user/course" + '' + images.real1.course + "/vigilance/" + images.result[images.real1.course].nameV[n] + "/" + images.newPostKey)
          images.addressV.update({
            "result": images.result[images.real1.course].resultV[n]
          })
          // images.addressVP.set({
          //   "result": images.result[images.real.course].resultV[n]
          // })
          if ((images.real2.FarV <= 1) && (images.real2.MissV >= 0)) {
            images.addressVPU.set({
              "result": images.result[images.real2.course].resultV[n]
            })
          }
        }
      }
      for (let n = 0; n < 60; n++) {
        if (typeof images.result[images.real1.course].resultT[n] !== "undefined") {
          // images.addressT = db.ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real1.course + "/target/" + images.result[images.real1.course].nameT[n])
          images.addressT = db.ref("/user-posts/" + user.Name + "/course" + '' + images.real1.course + "/target/" + images.result[images.real1.course].nameT[n])
          images.addressTP = db.ref("/per-image/course" + '' + images.real1.course + "/target/" + images.result[images.real1.course].nameT[n])
          images.addressTPU = db.ref("/per-image-user/course" + '' + images.real1.course + "/target/" + images.result[images.real1.course].nameT[n] + "/" + images.newPostKey)
          images.addressT.set({
            "result": images.result[images.real1.course].resultT[n]
          })
          // images.addressTP.set({
          //   "result": images.result[images.real.course].resultT[n]
          // })
          if ((images.real2.FarV <= 1) && (images.real2.MissV >= 0)) {
            images.addressTPU.set({
              "result": images.result[images.real1.course].resultT[n]
            })
          }
        }
      }


    }, 2000)
    sendButton.style.display = "none"
    document.getElementById("lastPage").style.display = "block"
    document.getElementById("onemore").addEventListener("click", function() {
      document.getElementById("lastPage").style.display = "none"
      document.getElementById("realFirst").style.display = "block"
      document.getElementById("ButtonCourse").style.display = "block"
    }, false)
    document.getElementById("end").addEventListener("click", function() {
      document.getElementById("lastPage").style.display = "none"
      document.getElementById("realFirst").style.display = "none"
      document.getElementById("thank").style.display = "block"
    }, false)

  }, false)

}
// //////////////// Initialize Firebase/////////////////////////////////
// console.log("init")

// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBrIVYPj_FoDe8MKkzs6QuFGfkQrY0vM-8",
//   authDomain: "memorability-8c35d.firebaseapp.com",
//   databaseURL: "https://memorability-8c35d.firebaseio.com",
//   projectId: "memorability-8c35d",
//   storageBucket: "memorability-8c35d.appspot.com",
//   messagingSenderId: "86526497736"
// };
// firebase.initializeApp(config);
// //////////////////////////////////////////////////////////////////////



// //////////////////// set global variable //////////////////////////////

// let images = {}
// images.tutorial = {}
// images.tutorial.img = []
// images.tutorial.verify = []
// images.tutorial.meta = []
// images.tutorial.result = []
// images.real = {}
// images.real.meta = []
// let user = {}

// ///////////////////////////////////////////////////////////////////////



// /////////////////// input use data   ////////////////////////////

// //htmlロードが完了したらボタンにイベントを設定
// window.addEventListener("load", function() {
//   document.getElementById("userInfo").style.display = "block"
//   document.getElementById("btnChangeData").addEventListener("click", clickWrite, false)
// }, false)

// window.onerror = function() {
//   //  alert("An error occured.\nPlease restart.")
// }

// //function to post user data
// let writeNewPost = function(name, age, gender) {
//   // A post entry.
//   var postData = {
//     author: name,
//     uid: age,
//     sex: gender
//   }
//   // Get a key for a new Post.
//   images.newPostKey = firebase.database().ref().child('posts').push().key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/posts/' + images.newPostKey] = postData;
//   updates['/user-posts/' + name + '/' + images.newPostKey] = postData;

//   return firebase.database().ref().update(updates);
// }
// //writeNewPost("01", "testuser", "pic", "Test", "This is a test.")

// var clickWrite = function() {
//   console.log(typeof document.getElementById("showNameHtml").value)
//   user.Name = document.getElementById("showNameHtml").value
//   user.Age = document.getElementById("showAgeHtml").value
//   user.Gender = document.getElementById("showGenderHtml").value
//   console.log(user.Name, user.Age, user.Gender) //.displayName, userData.uid, userData.email, userData.emailVerified)
//   if ((typeof user.Name !== "undefined") && (typeof user.Age !== "undefined") && (typeof user.Gender !== "undefined")) {
//     writeNewPost(user.Name, user.Age, user.Gender)
//     document.getElementById("userInfo").style.display = "none"
//     document.getElementById("howTo").style.display = "block"
//     document.getElementById("loadImageTime").style.display = "block"
//     downloadImg();
//   } else {
//     alert("Please fill all.")
//   }
// }
// ////////////////////////////////////////////////////////////////////////////////





// //////////////////////// Explaination////////////////////////////////


// window.addEventListener("load", function() {
//   images.place = document.getElementById("placeForImage")
//   console.log(images.place)
//   images.number = 0
// }, false)


// //display image file in firebase storage
// //get reference to firebase storage
// let storageRef = firebase.storage().ref("sampleImage")
// let imgBlack = storageRef.child("black.png")

// //get reference of a image in image folder
// //after html are loaded, displaying image
// //window.addEventListener("load", function(){
// //  document.getElementById("btnDisplay").addEventListener("click", downloadImg, false)
// //}, false)

// let downloadImg = function() {
//   //get MetaData

//   console.log(images.newPostKey)
//   imgBlack.getMetadata().then(function(metadata) {
//     console.log(metadata)
//   })

//   imgBlack.getDownloadURL().then(function(url) {
//     images.black = new Image(500, 400)
//     images.black.addEventListener("load", downloadImg2, false)
//     images.black.src = url
//   })
// }


// let downloadImg2 = function() {
//   console.log(images.newPostKey)
//   for (let n = 0; n < 6; n++) {
//     let stringPng = ".png"
//     let imgName = '' + n + stringPng
//     console.log(imgName)
//     let imgSample = storageRef.child(imgName)
//     console.log("download start" + imgName)
//     imgSample.getDownloadURL().then(function(url) {
//       //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
//       images[n] = new Image(500, 400)
//       images[n].addEventListener("load", function() {
//         //img.size = ImageGetNaturalSize(img)
//         if (typeof images[5] !== "undefined") {
//           let imageButton = document.getElementById("imageHowTo")
//           imageButton.style.display = "block"

//           document.getElementById("loadImageTime").style.display = "none"
//           document.getElementById("showImageButton").addEventListener("click", startIntervalDisplay, false)
//         }
//       }, false)
//       images[n].src = url
//       console.log("download finished.")
//     }).catch(function(error) {
//       //Handle any Errors
//       console.log(error)
//     })
//   }
// }


// let startIntervalDisplay = function() {
//   console.log(images.newPostKey)
//   document.getElementById("imageHowTo").style.display = "none"
//   document.getElementById("showImageButton").style.display = "none"
//   images.place.style.display = "block"
//   let timerEx = setInterval(displayImages, 500)
//   images.time = 0
//   setTimeout(function() {
//     document.getElementById("explain").style.display = "block"
//     document.getElementById("toTutorialButton").addEventListener("click", function() {
//       startTutorial()
//       clearInterval(timerEx)
//       console.log("event set")
//     }, false)
//   }, 500)
// }

// let displayImages = function() {
//   if ((images.time % 3) === 0) {
//     while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
//     images.place.appendChild(images[images.number])
//     images.number += 1
//     if (images.number > 5) {
//       images.number = 0
//     }
//   } else if ((images.time % 3) === 2) {
//     while (images.place.firstChild) images.place.removeChild(images.place.firstChild);
//     images.place.appendChild(images.black)
//   }
//   images.time += 1
// }

// let startTutorial = function() {
//   console.log("This is tutorial.")
//   document.getElementById("howTo").style.display = "none"
//   document.getElementById("placeForImage").style.display = "none"
//   document.getElementById("explain").style.display = "none"
//   document.getElementById("tutorialFirst").style.display = "block"
//   //   document.getElementById("startTutorialButton").addEventListener("click", TutorialEx, false)
//   // }
//   //
//   // let TutorialEx = function() {
//   document.getElementById("startTutorialButton").style.display = "none"
//   document.getElementById("loadingTutorial").style.display = "block"
//   images.one = new Image(500, 400)
//   images.two = new Image(500, 400)
//   images.three = new Image(500, 400)
//   images.one.srcurl = storageRef.child("one.png")
//   images.two.srcurl = storageRef.child("second.png")
//   images.three.srcurl = storageRef.child("theree.png")
//   downloadOne()
// }
// ////////////////////////////////////////////////////////////////////////////








// ///////////////////////// Tutorial ///////////////////////////////////////////
// //let storageRef = firebase.storage().ref("sampleImage")

// let downloadOne = function() {
//   images.one.srcurl.getDownloadURL().then(function(url) {
//     images.one.addEventListener("load", downloadTwo, false)
//     images.one.src = url
//   })
// }
// let downloadTwo = function() {
//   images.two.srcurl.getDownloadURL().then(function(url) {
//     images.two.addEventListener("load", downloadThree, false)
//     images.two.src = url
//   })
// }
// let downloadThree = function() {
//   images.three.srcurl.getDownloadURL().then(function(url) {
//     images.three.addEventListener("load", downloadImageTutorial, false)
//     images.three.src = url
//   })
// }
// let downloadImageTutorial = function() {
//   let tutorialRef = firebase.storage().ref("tutorial")
//   //images.tutorial.verifyを初期化
//   for (let M = 0; M < 31; M++) {
//     images.tutorial.img[M] = 0
//     images.tutorial.verify[M] = 0
//   }

//   let imgTutorial = []
//   console.log("one, two, threee have been downloaded.")
//   for (let n = 0; n < 31; n++) {
//     let stringPng = ".png"
//     let imgName = '' + n + stringPng
//     console.log(imgName)
//     imgTutorial[n] = tutorialRef.child(imgName)
//     console.log("download start" + imgName)

//     imgTutorial[n].getDownloadURL().then(function(url) {
//       //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
//       images.tutorial.img[n] = new Image(500, 400)
//       images.tutorial.img[n].addEventListener("load", function() {
//         images.tutorial.verify[n] = 1
//         //   //img.size = ImageGetNaturalSize(img)
//         //   if ((typeof images.tutorial.img[31]) !== "undefined") {
//         //     document.getElementById("loadingTutorial").style.display = "none"
//         //     document.getElementById("tutorialSecond").style.display = "block"
//         //     //document.getElementById("loadImageTime").style.display="none"
//         //     document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
//         //     console.log("download finished.")
//         //   }
//       }, false)
//       images.tutorial.img[n].src = url
//     }).catch(function(error) {
//       //Handle any Errors
//       console.log(error)
//     })
//   }

//   for (let n = 0; n < 31; n++) {
//     imgTutorial[n].getMetadata().then(function(metadata) {
//       images.tutorial.meta[n] = metadata.customMetadata.visType
//       console.log(images.tutorial.meta[n])
//     })
//   }
//   let verifyDownloadTu = function() {
//     setTimeout(function() {
//       let completeTu = images.tutorial.verify[0]
//       for (let j = 1; j < 31; j++) {
//         completeTu = completeTu * images.tutorial.verify[j]
//       }
//       return completeTu
//     }, 200)
//   }
//   let verify2 = function() {
//     setTimeout(function() {
//       let completeTu2 = 1
//       for (let t = 0; t < 31; t++) {
//         if (typeof images.tutorial.meta[t] !== "undefined") {
//           completeTu2 = completeTu2 * 1
//         } else {
//           completeTu2 = 0
//         }
//       }
//       return completeTu2
//     }, 500)
//   }
//   while (verifyDownloadTu() === 0) {}
//   while (verify2() === 0) {}
//   document.getElementById("loadingTutorial").style.display = "none"
//   document.getElementById("tutorialSecond").style.display = "block"
//   //document.getElementById("loadImageTime").style.display="none"
//   document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
//   console.log("download finished.")
// }

// let startIntervalTutorial = function() {
//   console.log("start")
//   //HR, FARの評価は、targetとvigilanceの２枚めにはメタデータを付与しそれをプログラム上で取得、そのデータに基づき判段する。
//   //images.tutorial.resultの初期化
//   for (let N = 0; N < 30; N++) {
//     images.tutorial.result[N] = 0
//   }

//   let showTutorialResult = function() {
//     document.getElementById("tutorialImage").style.display = "none"
//     document.getElementById("showResultTutorial").style.display = "block"
//     //document.getElementById("ButtonTutorialResult").style.display = "block"
//     document.getElementById("ButtonTutorialResult").addEventListener("click", function() {
//       images.tutorial.sumFar = 0
//       images.tutorial.sumMiss = 0
//       for (let N = 0; N < 30; N++) {
//         console.log(images.tutorial.meta[N])
//         if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
//           images.tutorial.meta[N] === "vigilance") {
//           if (images.tutorial.result[N] !== 1) {
//             images.tutorial.sumMiss += 1
//           }
//         } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
//           if (images.tutorial.result[N] === 1) {
//             images.tutorial.sumFar += 1
//           }
//         }
//       }
//       images.tutorial.Far = images.tutorial.sumFar / 22
//       images.tutorial.Miss = images.tutorial.sumMiss / 8
//       console.log("FAR = " + images.tutorial.Far)
//       console.log("Miss = " + images.tutorial.Miss)

//       //実際はここでTutorialの結果により本番に進めるか判定
//       document.getElementById("showResultTutorial").style.display = "none"
//       document.getElementById("goToRealPart").style.display = "block"
//       document.getElementById("backToTutorial").style.display = "block"
//       document.getElementById("backToTutorial").addEventListener("click", function() {
//         document.getElementById("backToTutorial").style.display = "none"
//         document.getElementById("goToRealPart").style.display = "none"
//         document.getElementById("giveTutorialImage").style.display = "block"
//         document.getElementById("tutorialImage").style.display = "block"
//         document.getElementById("tutorialExplain").style.display = "block"
//       }, false)
//       document.getElementById("goToRealPart").addEventListener("click", function() {
//         document.getElementById("goToRealPart").style.display = "none"
//         document.getElementById("tutorialFirst").style.display = "none"
//         document.getElementById("backToTutorial").style.display = "none"
//         startReal()
//       }, false)
//     }, false)
//   }

//   let keyDownFunc = function(e) {
//     if (e.keyCode === 32) {
//       document.addEventListener("keyup", function() {
//         document.getElementById("Memorized").style.display = "none"
//       })
//       images.tutorial.result[(images.number - 1)] = 1
//       console.log("number " + (images.number - 1) + " was memorized.")
//       document.getElementById("Memorized").style.display = "block"
//     }
//   }

//   let displayTutorial = function() {
//     images.tutorial.place = document.getElementById("tutorialImage")
//     if (images.time === 0) {
//       images.tutorial.place.appendChild(images.three)
//     } else if (images.time === 2) {
//       while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
//       images.tutorial.place.appendChild(images.two)
//     } else if (images.time === 4) {
//       while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
//       images.tutorial.place.appendChild(images.one)
//     } else if (images.time > 5) {
//       document.addEventListener("keydown", keyDownFunc, false)
//       if ((images.time % 3) === 0) {
//         console.log((images.number))
//         while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
//         images.tutorial.place.appendChild(images.tutorial.img[images.number])
//         images.number += 1
//         if ((images.number) > 29) {
//           clearInterval(timerTutorial)
//           console.log("timer clear")
//           while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
//           document.removeEventListener("keydown", keyDownFunc)

//           showTutorialResult()
//         }
//       } else if ((images.time % 3) === 2) {
//         while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
//         images.tutorial.place.appendChild(images.black)
//       }
//     }
//     images.time += 1
//   }

//   document.getElementById("tutorialExplain").style.display = "none"
//   document.getElementById("giveTutorialImage").style.display = "none"
//   images.time = 0
//   images.number = 0
//   let timerTutorial = setInterval(displayTutorial, 50) //00)
//   //document.getElementById("explain").style.display = "block"
// }
// // var imgWidth = $('img#sample').width();　 //img#sampleのwidthを調べてimgWidthに代入
// // var imgHeight = $('img#sample').height();　 //img#sampleのheightを調べてimgHeightに代入
// //
// // aspectRatio = imgWidth / imgHeight　 //横幅÷縦幅の値をaspectRatioに代入







// //   //From here real experiment

// let startReal = function() {
//   console.log("This is Real.")
//   //document.getElementById("howTo").style.display = "none"
//   //document.getElementById("placeForImage").style.display = "none"
//   //document.getElementById("explain").style.display = "none"
//   document.getElementById("realFirst").style.display = "block"
//   document.getElementById("ButtonCourse").style.display = "block"
//   for (let n = 0; n < 7; n++) {
//     document.getElementById('' + "ButtonCourse" + (n + 1)).addEventListener("click", function() {
//       images.real.course = n + 1
//       //既にプレイしたか判定
//       firebase.database().ref("/user-posts/"+user.Name+"/"+images.newPostKey+"/course"+''+images.real.course+"/Far").once('value').then(function(snapshot){
//         console.log(snapshot._e.T)
//         if(typeof snapshot._e.T === "undefined"){
//           RealEx();
//         } else {
//           alert("You have done this course.")
//             RealEx();
//         }
//       })
//     }, false)
//   }
// }

// let RealEx = function() {
//   document.getElementById("ButtonCourse").style.display = "none"
//   document.getElementById("realExplain").style.display = "none"
//   document.getElementById("loadingReal").style.display = "block"
//   console.log(images.real.course)
//   images.one = new Image(500, 400)
//   images.two = new Image(500, 400)
//   images.three = new Image(500, 400)
//   images.one.srcurl = storageRef.child("one.png")
//   images.two.srcurl = storageRef.child("second.png")
//   images.three.srcurl = storageRef.child("theree.png")
//   downloadOneR()
// }
// //var storageRef = firebase.storage().ref("sampleImage")

// let downloadOneR = function() {
//   console.log("one")
//   images.one.srcurl.getDownloadURL().then(function(url) {
//     images.one.addEventListener("load", downloadTwoR, false)
//     images.one.src = url
//   })
// }
// let downloadTwoR = function() {
//   images.two.srcurl.getDownloadURL().then(function(url) {
//     images.two.addEventListener("load", downloadThreeR, false)
//     images.two.src = url
//   })
// }
// let downloadThreeR = function() {
//   images.three.srcurl.getDownloadURL().then(function(url) {
//     images.three.addEventListener("load", downloadImageReal, false)
//     images.three.src = url
//   })
// }
// let downloadImageReal = function() {
//   let realRef = firebase.storage().ref('' + 'real' + images.real.course)
//   //images.real.verifyを初期化
//   images.real.img = []
//   images.real.verify = []
//   for (let M = 0; M < 31; M++) {
//     images.real.img[M] = 0
//     images.real.verify[M] = 0
//   }
//   let imgReal = []
//   console.log("one, two, threee have been downloaded.")
//   for (let n = 0; n < 31; n++) {
//     let stringPng = ".png"
//     let imgName = '' + n + stringPng
//     console.log(imgName)
//     imgReal[n] = realRef.child(imgName)
//     console.log("download start" + imgName)
//     imgReal[n].getDownloadURL().then(function(url) {
//       //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
//       images.real.img[n] = new Image(500, 400)
//       images.real.img[n].addEventListener("load", function() {
//         images.real.img[n].verify = 1
//         //img.size = ImageGetNaturalSize(img)
//         // if (typeof images.real[31] !== "undefined") {
//         //   document.getElementById("loadingReal").style.display = "none"
//         //   document.getElementById("realSecond").style.display = "block"
//         //   //document.getElementById("loadImageTime").style.display="none"
//         //   document.getElementById("giveRealImage").addEventListener("click", startIntervalReal, false)
//         //   console.log("download finished.")
//         // }
//       }, false)
//       images.real.img[n].src = url
//     }).catch(function(error) {
//       //Handle any Errors
//       console.log(error)
//     })
//   }

//   for (let n = 0; n < 31; n++) {
//     imgReal[n].getMetadata().then(function(metadata) {
//       images.real.meta[n] = metadata.customMetadata.visType
//     })
//   }
//   let verifyDownloadR = function() {
//     setTimeout(function() {
//       let completeR = images.real.verify[0]
//       for (let j = 1; j < 30; j++) {
//         completeR = completeR * images.real.verify[j]
//       }
//       return completeR
//     }, 200)
//   }
//   let verify2 = function() {
//     setTimeout(function() {
//       let complete2 = 1
//       for (let t = 0; t < 31; t++) {
//         if (typeof images.real.meta[t] !== "undefined") {
//           complete2 = complete2 * 1
//         } else {
//           complete2 = 0
//         }
//       }
//       return complete2
//     }, 500)
//   }
//   while (verifyDownloadR() === 0) {}
//   while (verify2() === 0) {}
//   document.getElementById("loadingReal").style.display = "none"
//   document.getElementById("realSecond").style.display = "block"
//   document.getElementById("realImage").style.display = "block"
//   document.getElementById("giveRealButton").style.display = "block"
//   //document.getElementById("loadImageTime").style.display="none"
//   document.getElementById("giveRealImage").addEventListener("click", startIntervalReal, false)
//   console.log("download finished.")
// }

// let startIntervalReal = function() {
//   images.real.result = {}
//   for (let N = 0; N < 30; N++) {
//     images.real.result[N] = 0
//   }

//   let showRealResult = function() {
//     document.getElementById("realImage").style.display = "none"
//     console.log("button")
//     //document.getElementById("showResultReal").style.display = "block"
//     document.getElementById("resultReal").style.display = "block"
//     document.getElementById("ButtonRealResult").addEventListener("click", function() {
//       images.real.sumFarV = 0
//       images.real.sumMissV = 0
//       images.real.sumFarT = 0
//       images.real.sumMissT = 0
//       for (let N = 0; N < 30; N++) {
//         console.log(images.real.meta[N])
//         if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
//           images.real.meta[N] === "vigilance") {
//           if (images.real.result[N] !== 1) {
//             images.real.sumMissV += 1
//           }
//         } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
//           if (images.real.result[N] === 1) {
//             images.real.sumFarV += 1
//           }
//         }
//       }
//       for (let N = 0; N < 30; N++) {
//         if ( //N === 5 || N === 13 || N === 15 || N === 21 || N === 23 || N === 24 || N === 27 || N === 29
//           images.real.meta[N] === "target") {
//           if (images.real.result[N] !== 1) {
//             images.real.sumMissT += 1
//           }
//         } else { //if( N !== 5 && N !== 13 && N !==15 && N !== 21 && N !== 23 && N !== 24 && N !== 27 && N !== 29){
//           if (images.real.result[N] === 1) {
//             images.real.sumFarT += 1
//           }
//         }
//       }
//       images.real.FarV = images.real.sumFarV / 22
//       images.real.MissV = images.real.sumMissV / 8
//       images.real.FarT = images.real.sumFarT / 22
//       images.real.MissT = images.real.sumMissT / 8
//       document.getElementById("resultReal").style.display = "none"
//       //document.getElementById("showResultReal").style.display = "none"
//       console.log("Vigilance FAR = " + images.real.FarV)
//       console.log("Vigilance Miss = " + images.real.MissV)
//       sendData()
//       //document.getElementById("goToRealPart").style.display = "block"
//       //document.getElementById("goToRealPart").addEventListener("click", function() {
//       //   document.getElementById("goToRealPart").style.display = "none"
//       //   document.getElementById("tutorialFirst").style.display = "none"
//       // }, false)
//     }, false)
//   }

//   let keyDownFuncR = function(e) {
//     if (e.keyCode === 32) {
//       images.real.result[(images.number - 1)] = 1
//       console.log("number " + (images.number - 1) + " was memorized.")
//     }
//   }

//   let displayReal = function() {
//     images.real.place = document.getElementById("realImage")
//     if (images.time === 0) {
//       images.real.place.appendChild(images.three)
//     } else if (images.time === 2) {
//       while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//       images.real.place.appendChild(images.two)
//     } else if (images.time === 4) {
//       while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//       images.real.place.appendChild(images.one)
//     } else if (images.time > 5) {
//       document.addEventListener("keydown", keyDownFuncR, false)
//       if ((images.time % 3) === 0) {
//         console.log((images.number))
//         while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//         images.real.place.appendChild(images.real.img[(images.number)])
//         images.number += 1
//         if ((images.number) > 29) {
//           clearInterval(timerReal)
//           console.log("timer clear")
//           while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//           document.removeEventListener("keydown", keyDownFuncR)
//           showRealResult()
//         }
//       } else if ((images.time % 3) === 2) {
//         while (images.real.place.firstChild) images.real.place.removeChild(images.real.place.firstChild);
//         images.real.place.appendChild(images.black)
//       }
//     }
//     images.time += 1
//   }

//   document.getElementById("giveRealButton").style.display = "none"
//   images.time = 0
//   images.number = 0
//   var timerReal = setInterval(displayReal, 50) //00)
//   //document.getElementById("explain").style.display = "block"
// }

// let sendData = function() {
//   console.log(images.newPostKey)
//   let sendButton = document.getElementById("sendResult")
//   sendButton.style.display = "block"
//   sendButton.addEventListener("click", function() {
//     let db = firebase.database()
//     setTimeout(function() {
//       images.address = db.ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real.course)
//       // Write the new post's data simultaneously in the posts list and the user's post list.
//       // var updates = {};
//       // updates['/posts/' + newPostKey] = postData;
//       // updates['/user-posts/' + name + '/' + newPostKey] = postData;
//       images.address.set({
//         "Far": images.real.FarV,
//         "Miss": images.real.MissV
//       })
//       images.result = []
//       for (let n = 0; n < 10; n++) {
//         images.result[n] = {}
//         images.result[n].nameV = []
//         images.result[n].nameT = []
//         images.result[n].resultV = []
//         images.result[n].resultT = []
//       }
//       let N = 0
//       for (let n = 0; n < 30; n++) {
//         if (images.real.meta[n] === "vigilance") {
//           console.log(n)
//           images.result[images.real.course].nameV[N] = '' + n
//           images.result[images.real.course].resultV[N] = images.real.result[N]
//           N += 1
//         }
//       }
//       N = 0
//       for (let n = 0; n < 30; n++) {
//         if (images.real.meta[n] === "target") {
//           console.log(n)
//           images.result[images.real.course].nameT[N] = '' + n
//           images.result[images.real.course].resultT[N] = images.real.result[N]
//           N += 1
//         }
//       }
//       for (let n = 0; n < 10; n++) {
//         if (typeof images.result[images.real.course].resultV[n] !== "undefined") {
//           images.addressV = db.ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real.course + "/vigilance/" + images.result[images.real.course].nameV[n])
//           images.addressVP = db.ref("/per-image/course" + '' + images.real.course + "/vigilance/" + images.result[images.real.course].nameV[n])
//           images.addressVPU = db.ref("/per-image-user/course" + '' + images.real.course + "/vigilance/" + images.result[images.real.course].nameV[n] + "/" + images.newPostKey)
//           images.addressV.update({
//             "result": images.result[images.real.course].resultV[n]
//           })
//           // images.addressVP.set({
//           //   "result": images.result[images.real.course].resultV[n]
//           // })
//           if ((images.real.FarV <= 1) && (images.real.MissV >= 0)) {
//             images.addressVPU.set({
//               "result": images.result[images.real.course].resultV[n]
//             })
//           }
//         }
//       }
//       for (let n = 0; n < 10; n++) {
//         if (typeof images.result[images.real.course].resultT[n] !== "undefined") {
//           images.addressT = db.ref("/user-posts/" + user.Name + "/" + images.newPostKey + "/course" + '' + images.real.course + "/target/" + images.result[images.real.course].nameT[n])
//           images.addressTP = db.ref("/per-image/course" + '' + images.real.course + "/target/" + images.result[images.real.course].nameT[n])
//           images.addressTPU = db.ref("/per-image-user/course" + '' + images.real.course + "/target/" + images.result[images.real.course].nameT[n] + "/" + images.newPostKey)
//           images.addressT.set({
//             "result": images.result[images.real.course].resultT[n]
//           })
//           // images.addressTP.set({
//           //   "result": images.result[images.real.course].resultT[n]
//           // })
//           if ((images.real.FarV <= 1) && (images.real.MissV >= 0)) {
//             images.addressTPU.set({
//               "result": images.result[images.real.course].resultT[n]
//             })
//           }
//         }
//       }


//     }, 2000)
//     sendButton.style.display = "none"
//     document.getElementById("lastPage").style.display = "block"
//     document.getElementById("onemore").addEventListener("click", function() {
//       document.getElementById("lastPage").style.display = "none"
//       document.getElementById("realFirst").style.display = "block"
//       document.getElementById("ButtonCourse").style.display = "block"
//     }, false)
//     document.getElementById("end").addEventListener("click", function() {
//       document.getElementById("lastPage").style.display = "none"
//       document.getElementById("realFirst").style.display = "none"
//       document.getElementById("thank").style.display = "block"
//     }, false)

//   }, false)

// }
