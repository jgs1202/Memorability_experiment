// Initialize Firebase
console.log("init")
var config = {
  apiKey: "AIzaSyAmw_qUkLApLVvcpJZ8FthhAiWM0-7Z5AU",
  authDomain: "memorability-a0c21.firebaseapp.com",
  databaseURL: "https://memorability-a0c21.firebaseio.com",
  projectId: "memorability-a0c21",
  storageBucket: "memorability-a0c21.appspot.com",
  messagingSenderId: "355761335744"
};
firebase.initializeApp(config);

//authentication start
console.log("auth start")
var provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  console.log("auth ended")
  document.getElementById("auth").style.display = "block"
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});




//function to post user data
function writeNewPost(username, uid, emailaddress, verified) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    email: emailaddress,
    emailVerified: verified
  };
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
//writeNewPost("01", "testuser", "pic", "Test", "This is a test.")

window.addEventListener("load", function() {

  document.getElementById("displayAuth").addEventListener("click", viewAuth, false)
  console.log("event is set.")
}, false)

var viewAuth = function(e) {
  const authData = firebase.auth().currentUser
  let divInfo = document.getElementById("userInfo")
  divInfo.style.display = "block"
  let showNameJs = document.getElementById("showNameHtml")
  let showAddressJs = document.getElementById("showAddressHtml")
  let showIdJs = document.getElementById("showIdHtml")
  showNameJs.textContent = authData.displayName
  showAddressJs.textContent = authData.email
  showIdJs.textContent = authData.uid
}


var db = firebase.database();
// var chatAll = db.ref("/chat/all");
// //DB内容が変更されたとき実行される
// chatAll.on("value", function(snapshot) {
//   document.getElementById("textMessage").innerText = snapshot.val().message;
// });
// //入力内容を更新した時
// var changeData = function() {
//   var message = document.getElementById("message").value;
//   chatAll.set({
//     message: message
//   });
// }
var clickWrite = function() {
  console.log("click")
  var userData = firebase.auth().currentUser
  console.log(firebase.auth().currentUser.displayName) //.displayName, userData.uid, userData.email, userData.emailVerified)
  let divInfo = document.getElementById("userInfo")
  divInfo.style.display = "none"
  document.getElementById("auth").style.display = "none"
  document.getElementById("howTo").style.display = "block"
  document.getElementById("loadImageTime").style.display = "block"
  writeNewPost(userData.displayName, userData.uid, userData.email, userData.emailVerified)
  downloadImg(images);
}
//htmlロードが完了したらボタンにイベントを設定
window.addEventListener("load", function() {
  console.log(document.getElementById("btnChangeData"))
  document.getElementById("btnChangeData").addEventListener("click", clickWrite, false)
}, false)


//display image file in firebase storage
//get reference to firebase storage
var storageRef = firebase.storage().ref("sampleImage")
let imgBlack = storageRef.child("black.png")
//get reference of a image in image folder
//after html are loaded, displaying image
//window.addEventListener("load", function(){
//  document.getElementById("btnDisplay").addEventListener("click", downloadImg, false)
//}, false)
let images = {}
var downloadImg = function(images) {
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
    var imgSample = storageRef.child(imgName)
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
window.addEventListener("load", function() {
  images.place = document.getElementById("placeForImage")
  console.log(images.place)
  images.number = 0
}, false)
let startIntervalDisplay = function() {
  images.place.style.display = "block"
  document.getElementById("imageHowTo").style.display = "none"
  var timerEx = setInterval(displayImages, 500)
  document.getElementById("explain").style.display = "block"
  document.getElementById("toTutorialButton").addEventListener("click", function() {
    startTutorial()
    clearInterval(timerEx)
  }, false)
  console.log("event set")
  images.time = 0
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
  document.getElementById("startTutorialButton").addEventListener("click", TutorialEx, false)
}

let TutorialEx = function() {
  document.getElementById("startTutorialButton").style.display = "none"
  document.getElementById("tutorialExplain").style.display = "none"
  document.getElementById("loadingTutorial").style.display = "block"
  images.one = new Image(500, 400)
  images.two = new Image(500, 400)
  images.three = new Image(500, 400)
  images.one.srcurl = storageRef.child("one.png")
  images.two.srcurl = storageRef.child("second.png")
  images.three.srcurl = storageRef.child("theree.png")
  downloadOne()
}
//var storageRef = firebase.storage().ref("sampleImage")

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
  images.tutorial = {}
  //images.tutorial.verifyを初期化
  for (let M = 0; M < 32; M++) {
    images.tutorial[M] = 0
    images.tutorial[M].verify = 0
  }
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 32; n++) {
    let stringPng = ".png"
    let imgName = '' + n + stringPng
    console.log(imgName)
    var imgTutorial = tutorialRef.child(imgName)
    console.log("download start" + imgName)
    imgTutorial.getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.tutorial[n] = new Image(500, 400)
      images.tutorial[n].addEventListener("load", function() {
        images.tutorial[n].verify = 1
        //   //img.size = ImageGetNaturalSize(img)
        //   if ((typeof images.tutorial[31]) !== "undefined") {
        //     document.getElementById("loadingTutorial").style.display = "none"
        //     document.getElementById("tutorialSecond").style.display = "block"
        //     //document.getElementById("loadImageTime").style.display="none"
        //     document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
        //     console.log("download finished.")
        //   }
      }, false)
      images.tutorial[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
  let verifyDownloadTu = function () {
    let completeTu = images.tutorial[0].verify
    for (let j = 1; j < 32; j++) {
      completeTu = completeTu * images.tutorial[j].verify
    }
    return completeTu
  }
  while (verifyDownloadTu() === 0) {}
  document.getElementById("loadingTutorial").style.display = "none"
  document.getElementById("tutorialSecond").style.display = "block"
  //document.getElementById("loadImageTime").style.display="none"
  document.getElementById("giveTutorialImage").addEventListener("click", startIntervalTutorial, false)
  console.log("download finished.")
}

let startIntervalTutorial = function() {
  console.log("start")
  images.tutorial.result = {}
  //images.tutorial.resultの初期化
  for (let N = 0; N < 31; N++) {
    images.tutorial.result[N] = 0
  }

  let showTutorialResult = function() {
    document.getElementById("tutorialImage").style.display = "none"
    document.getElementById("showResultTutorial").style.display = "block"
    document.getElementById("ButtonTutorialResult").addEventListener("click", function() {
      for (let N = 0; N < 31; N++) {
        console.log(images.tutorial.result[N])
      }
      //実際はここでTutorialの結果により本番に進めるか判定
      document.getElementById("ButtonTutorialResult").style.display = "none"
      document.getElementById("goToRealPart").style.display = "block"
      document.getElementById("goToRealPart").addEventListener("click", function() {
        document.getElementById("goToRealPart").style.display = "none"
        document.getElementById("tutorialFirst").style.display = "none"
        startReal()
      }, false)
    }, false)
  }

  let keyDownFunc = function(e) {
    if (e.keyCode === 32) {
      images.tutorial.result[(images.number - 1)] = 1
      console.log("number " + (images.number - 1) + " was memorized.")
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
        images.tutorial.place.appendChild(images.tutorial[(images.number)])
        images.number += 1
        if ((images.number) > 31) {
          clearInterval(timerTutorial)
          console.log("timer clear")
          document.removeEventListener("keydown", event)
          concole.log("remove keydown")
          showTutorialResult()
        }
      } else if ((images.time % 3) === 2) {
        while (images.tutorial.place.firstChild) images.tutorial.place.removeChild(images.tutorial.place.firstChild);
        images.tutorial.place.appendChild(images.black)
      }
    }
    images.time += 1
  }

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
  document.getElementById("ButtonLv1").addEventListener("click", RealEx, false)
}

let RealEx = function() {
  document.getElementById("ButtonLv1").style.display = "none"
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
  for (let M = 0; M < 32; M++) {
    images.real[M] = 0
    images.real[M].verify = 0
  }
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 32; n++) {
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
  let verifyDownloadR = function () {
    let completeR = images.real[0].verify
    for (let j = 1; j < 32; j++) {
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
  for (let N = 0; N < 31; N++) {
    images.real.result[N] = 0
  }

  let showRealResult = function() {
    document.getElementById("realImage").style.display = "none"
    document.getElementById("showResultReal").style.display = "block"
    document.getElementById("ButtonRealResult").addEventListener("click", function() {
      for (let N = 0; N < 31; N++) {
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
        if ((images.number) > 31) {
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
