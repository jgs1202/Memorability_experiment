////////////////////receive data//////////////////////////////
let FORM = new　 Array();
parse()

function　 parse() {　　　 // 関数にしなくてもいいのですが、一応
  var　 buffer = location.search.substr(1);　　
  var　 pairs = buffer.split("&");
  for (var　 i　 in 　pairs) {　　　　
    var　 pair = pairs[i].split("=");　　　　
    FORM[pair[0]] = unescape(pair[1].replace("+", " "));　　
  }
}
/////////////////////////////////////////////////////////////



///////////////////// set variables //////////////////////////
images = []
images.tutorial1 = []
images.tutorial2 = []



//////////////////////////////////////////////////////////////



///////////////////// use data and set course ///////////////////

console.log(FORM)

window.addEventListener('load', function() {

  let descideCourse = function() {
    images.tutorial1.courseCheck = []
    images.database = firebase.database()
    //　3コースについて既にプレイしたか検証
    for (i = 0; i < 3; i++) {
      images.database.ref('user/' + Name + '/tutorial/' + '' + i).once('value').then(function(snapshot) {
        console.log(snapshot._e._.B.value)
        if (typeof snapshot._e._.B.value === "undefined") {
          images.tutorial1.courseCheck[i] = 0
          console.log('undefined')
        } else {
          images.tutorial1.courseCheck[i] = 1
          console.log('undefined')
        }
      })
    }
    let waitCheck = function() {
      check()
    }
    //check coursecheck
    let check = function() {
      for (i = 0; i < 3; i++) {
        if (typeof images.tutorial1.courseCheck[i] === 'undefined') {
          setTimeout(waitCheck, 300)
          console.log(images.tutorial1.courseCheck)
          break
        }
        else if (i === 2){
          courseSelect()
          console.log(images.tutorial1.courseCheck)
        }
      }
    }
    let courseSelect = function(){
      for (i = 0; i < 3; i++) {
        if (images.tutorial1.courseCheck[i] === 0) {
          images.tutorial.course = i
          startDownload()
          break
        }
      }
    }
    check()
  }

  //check previous data
  let Name = FORM.v1
  console.log(Name)
  document.h1.v1.value = Name
  images.newPostKey = firebase.database().ref().child('posts').push().key
  firebase.database().ref('user/' + Name + '/times').set({
    'keys': images.newPostKey
  })
  descideCourse()
}, false)


///////////////////////////////////////////////////////////////



////////////////////// load image ////////////////////////////

let startDownload = function() {
  console.log('Download starts.')
  images.one = new Image(500, 400)
  images.two = new Image(500, 400)
  images.three = new Image(500, 400)
  images.storageRef = firebase.storage().ref("images")
  images.one.srcurl = images.storageRef.child("one.png")
  images.two.srcurl = images.storageRef.child("second.png")
  images.three.srcurl = images.storageRef.child("theree.png")
  downloadOne()
}

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
  images.tutorialRef = firebase.storage().ref("tutorial/" + images.tutorial1.course)
  // //images.tutorial.verifyを初期化
  // images.tutorial1[0] =
  //   for (let M = 0; M < 15; M++) {
  //     images.tutorial1.img[M] = 0
  //     images.tutorial1.verify[M] = 0
  //     images.tutorial2.img[M] = 0
  //     images.tutorial2.verify[M] = 0
  //   }
  images.img =
    images.verify = []
  let imgTutorial = []
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 9; n++) {
    images.imgName = '' + n + '.png'
    console.log(images.imgName)
    imgTutorial[n] = images.tutorialRef.child(images.imgName)
    console.log("download start" + images.imgName)

    imgTutorial[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.img[n] = new Image(500, 400)
      images.img[n].addEventListener("load", function() {
        images.verify[n] = 1
      }, false)
      images.img[n].src = url
    }).catch(function(error) {
      //Handle any Errors
      console.log(error)
    })
  }
  // for (let n = 0; n < 30; n++) {
  //   imgTutorial2[n].getMetadata().then(function(metadata) {
  //     images.tutorial2.meta[n] = metadata.customMetadata.visType
  //     console.log(images.tutorial2.meta[n])
  //   })
  // }
  let verifyDownloadTu = function() {
    setTimeout(function() {
      let completeTu = images.verify[0]
      for (let j = 1; j < 9; j++) {
        completeTu = completeTu * images.verify[j]
      }
      return completeTu
    }, 200)
  }
  while (verifyDownloadTu() === 0) {}
  document.getElementById("loading").style.display = "none"
  console.log("download finished.")
  document.getElementById('start1st').style.display = 'block'
  document.getElementById('start1st').addEventListener('click', firstSection, false)
}


let firstSection = function() {
  document.getElementById('start1st').style.display = 'none'
  document.getElementById('1stTable').style.display = 'block'
}
