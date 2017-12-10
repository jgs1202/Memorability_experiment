////////////////////receive data//////////////////////////////
let FORM = new　 Array();
parse()

function　 parse() {　　　 // 関数にしなくてもいいのですが、一応
  var　 buffer = location.search.substr(1);　　
  var　 pairs = buffer.split("&");
  for (let　 i　 in 　pairs) {　　　　
    var　 pair = pairs[i].split("=");　　　　
    FORM[pair[0]] = unescape(pair[1].replace("+", " "));　　
  }
}
/////////////////////////////////////////////////////////////



///////////////////// set variables //////////////////////////
images = []
images.tutorial1 = []
images.tutorial2 = []
images.intervalTime = 200
images.shuffle = []
for (let j = 0; j < 8; j++) {
  images.shuffle[j] = j
}
for (let i = images.shuffle.length - 1; i > 0; i--) {
  let r = Math.floor(Math.random() * (i + 1));
  let tmp = images.shuffle[i]
  images.shuffle[i] = images.shuffle[r];
  images.shuffle[r] = tmp;
}
for (let i = 0; i < 8; i++) {
  if (images.shuffle[i] === 0) {
    images.targetNumber = i
  }
}

images.firstTime = 2
images.secondTime = 5

//////////////////////////////////////////////////////////////



///////////////////// use data and set course ///////////////////

console.log(FORM)

window.addEventListener('load', function() {

  let descideCourse = function() {
    images.tutorial1.courseCheck = []
    images.database = firebase.database()
    //　3コースについて既にプレイしたか検証
    for (let n = 0; n < 3; n++) {
      images.database.ref('user/' + images.name + '/tutorial/' + '' + n).once('value').then(function(snapshot) {
        console.log(snapshot.ge.path.n[3]) //._.B.value)
        if (typeof snapshot._e._.B.value === "undefined") {
          images.tutorial1.courseCheck[snapshot.ge.path.n[3]] = 0
          console.log(snapshot.ge.path.n[3])
        } else {
          images.tutorial1.courseCheck[snapshot.ge.path.n[3]] = 1
          console.log(snapshot.ge.path.n[3])
        }
      })
    }
    let waitCheck = function() {
      check()
      console.log('wait')
    }
    //check coursecheck
    let check = function() {
      for (i = 0; i < 3; i++) {
        if (typeof images.tutorial1.courseCheck[i] === 'undefined') {
          setTimeout(waitCheck, 300)
          console.log(images.tutorial1.courseCheck)
          break
        } else if (i === 2) {
          courseSelect()
          console.log(images.tutorial1.courseCheck)
        }
      }
    }
    let courseSelect = function() {
      for (let m = 0; m < 3; m++) {
        if (images.tutorial1.courseCheck[m] === 0) {
          images.tutorial1.course = m
          console.log(m)
          startDownload()
          break
        } else if ( m === 2 ){
          document.getElementById('complete').style.display = 'block'
          document.getElementById('loading').style.display = 'none'
        }
      }
    }
    check()
    console.log(images.name)
  }

  //check previous data
  images.name = FORM.v1
  console.log(images.name)
  document.h1.v1.value = images.name
  images.newPostKey = firebase.database().ref().child('posts').push().key
  firebase.database().ref('user/' + images.name + '/times').set({
    'keys': images.newPostKey
  })
  descideCourse()
}, false)


///////////////////////////////////////////////////////////////



////////////////////// load image ////////////////////////////

let startDownload = function() {
  console.log('Download starts.')
  images.one = new Image(300, 200)
  images.two = new Image(300, 200)
  images.three = new Image(300, 200)
  images.white = new Image(300.200)
  images.white2 = new Image(300.200)
  images.storageRef = firebase.storage().ref("images")
  images.one.srcurl = images.storageRef.child("one.png")
  images.two.srcurl = images.storageRef.child("second.png")
  images.three.srcurl = images.storageRef.child("theree.png")
  images.white.srcurl = images.storageRef.child('white.png')
  images.white2.srcurl = images.storageRef.child('white.png')
  downloadWhite()
}

let downloadWhite = function() {
  images.white.srcurl.getDownloadURL().then(function(url) {
    images.white.addEventListener("load", downloadWhite2, false)
    images.white.src = url
  })
}
let downloadWhite2 = function() {
  images.white2.srcurl.getDownloadURL().then(function(url) {
    images.white2.addEventListener("load", downloadOne, false)
    images.white2.src = url
  })
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
  images.img = []
  images.verify = []
  let imgTutorial = []
  console.log("one, two, threee have been downloaded.")
  for (let n = 0; n < 8; n++) {
    images.imgName = '' + n + '.png'
    console.log(images.imgName)
    imgTutorial[n] = images.tutorialRef.child(images.imgName)
    console.log("download start" + images.imgName)

    imgTutorial[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.img[n] = new Image(300, 200)
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
      for (let j = 1; j < 8; j++) {
        completeTu = completeTu * images.verify[j]
      }
      return completeTu
    }, 200)
  }
  while (verifyDownloadTu() === 0) {}
  document.getElementById("loading").style.display = "none"
  console.log("download finished.")
  document.getElementById('start1st').style.display = 'block'
  document.getElementById('buttonStart1st').addEventListener('click', firstSection, false)
}


let firstSection = function() {
  document.getElementById('start1st').style.display = 'none'
  document.getElementById('1stTable').style.display = 'block'
  images.time = 0
  images.number = 0
  images.tutorial1.centerPlace = document.getElementById('cellCenter')
  images.tutorial1.targetPlace = []
  for (let i = 0; i < 8; i++) {
    images.tutorial1.targetPlace[i] = document.getElementById('cell' + '' + i)
  }
  console.log(images.white)
  console.log(images.tutorial1.targetPlace[0])
  images.timer1 = setInterval(displayTutorial1, images.intervalTime)
}

let displayTutorial1 = function() {
  if (images.time === 0) {
    while (images.tutorial1.targetPlace[1].firstChild) images.tutorial1.targetPlace[1].removeChild(images.tutorial1.targetPlace[1].firstChild);
    images.tutorial1.targetPlace[1].appendChild(images.white)
    // while (images.tutorial1.targetPlace[3].firstChild) images.tutorial1.targetPlace[3].removeChild(images.tutorial1.targetPlace[3].firstChild);
    // images.tutorial1.targetPlace[3].appendChild(images.white2)
    images.tutorial1.centerPlace.appendChild(images.three)
  } else if (images.time === 2) {
    while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
    images.tutorial1.centerPlace.appendChild(images.two)
  } else if (images.time === 4) {
    while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
    images.tutorial1.centerPlace.appendChild(images.one)
  } else if (images.time > 5) {
    if (images.time == 6) {
      console.log((images.number))
      while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
      images.tutorial1.centerPlace.appendChild(images.img[0])
    } else if ((images.time) > 6 + images.firstTime * 2 - 1) {
      clearInterval(images.timer1)
      console.log("timer clear")
      for (let i = 0; i < 8; i++) {
        while (images.tutorial1.targetPlace[i].firstChild) images.tutorial1.targetPlace[i].removeChild(images.tutorial1.targetPlace[i].firstChild);
      }
      while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
      goTutorialSecond()
    }
  }
  console.log(images.time)
  images.time += 1
}

let goTutorialSecond = function() {
  console.log('end')
  document.getElementById('1stTable').style.display = 'none'
  document.getElementById('start2nd').style.display = 'block'
  document.getElementById('buttonStart2nd').addEventListener('click', secondSection, false)
}

let secondSection = function() {
  console.log('start')
  document.getElementById('start2nd').style.display = 'none'
  document.getElementById('1stTable').style.display = 'block'
  images.time = 0
  images.tutorial2.centerPlace = document.getElementById('cellCenter')
  images.tutorial2.targetPlace = []
  for (let i = 0; i < 8; i++) {
    images.tutorial2.targetPlace[i] = document.getElementById('cell' + '' + i)
  }
  console.log(images.tutorial2.targetPlace[4])
  images.timer2 = setInterval(displayTutorial2, images.intervalTime)
}

let displayTutorial2 = function() {
  if (images.time === 0) {
    while (images.tutorial2.targetPlace[1].firstChild) images.tutorial2.targetPlace[1].removeChild(images.tutorial2.targetPlace[1].firstChild);
    images.tutorial2.targetPlace[1].appendChild(images.white)
    // while (images.tutorial2.targetPlace[3].firstChild) images.tutorial2.targetPlace[3].removeChild(images.tutorial2.targetPlace[3].firstChild);
    // images.tutorial2.targetPlace[3].appendChild(images.white2)
    images.tutorial2.centerPlace.appendChild(images.three)
  } else if (images.time === 2) {
    while (images.tutorial2.centerPlace.firstChild) images.tutorial2.centerPlace.removeChild(images.tutorial2.centerPlace.firstChild);
    images.tutorial2.centerPlace.appendChild(images.two)
  } else if (images.time === 4) {
    while (images.tutorial2.centerPlace.firstChild) images.tutorial2.centerPlace.removeChild(images.tutorial2.centerPlace.firstChild);
    images.tutorial2.centerPlace.appendChild(images.one)
  } else if (images.time > 5) {
    if (images.time == 6) {
      while (images.tutorial2.centerPlace.firstChild) images.tutorial2.centerPlace.removeChild(images.tutorial2.centerPlace.firstChild);
      document.getElementById('cellCenter').textContent = '' + images.secondTime
      for (let n = 0; n < 8; n++) {
        console.log((images.number))
        while (images.tutorial2.targetPlace[n].firstChild) images.tutorial2.targetPlace[n].removeChild(images.tutorial2.targetPlace[n].firstChild);
        images.tutorial2.targetPlace[n].appendChild(images.img[images.shuffle[n]])
        images.tutorial2.targetPlace[n].addEventListener('click', chooseTarget, false)
      }
    } else if ((images.time) > 5 + images.secondTime * 2) {
      clearInterval(images.timer2)
      images.end = 1
      console.log("timer clear")
      for (let n = 0; n < 8; n++) {
        while (images.tutorial2.targetPlace[n].firstChild) images.tutorial2.targetPlace[n].removeChild(images.tutorial2.targetPlace[n].firstChild);
        images.tutorial2.targetPlace[n].removeEventListener('click', chooseTarget)
        showResult()
      }
    } else if ((images.time % 2) === 0 ){
      document.getElementById('cellCenter').textContent = '' + ( images.secondTime - (images.time/2 - 3) )
    }
  }
  console.log(images.time)
  images.time += 1
}

let chooseTarget = function(e) {
  console.log(document.getElementById(e.path[1].id))
  document.getElementById(e.path[1].id).style.border = '3px solid #81F7F3'
  swal({
    title: "Is your chice this?",
    icon: "warning",
    buttons: true,
    // dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      clearInterval(images.timer2)
      document.getElementById(e.path[1].id).style.border = '0'
      for (let n = 0; n < 8; n++) {
        while (images.tutorial2.targetPlace[n].firstChild) images.tutorial2.targetPlace[n].removeChild(images.tutorial2.targetPlace[n].firstChild);
        images.tutorial2.targetPlace[n].removeEventListener('click', chooseTarget)
      }
      if (images.end !== 1) {
        images.tutorial2.answer = e.path[1].id[4]
      }
      console.log(images.tutorial2.answer)
      showResult()
    } else {
      document.getElementById(e.path[1].id).style.border = '0'
    }
  })
  console.log(e.path[1].id)
}

let showResult = function() {
  console.log(typeof images.tutorial2.answer, typeof images.targetNumber)

  ////////////////  send data  ////////////////////////////////////////////
  images.address = firebase.database().ref("/user/" + images.name + '/tutorial/' + '' + images.tutorial1.course)

  document.getElementById('1stTable').style.display = 'none'
  if (parseInt(images.tutorial2.answer) === images.targetNumber) {
    document.getElementById('correct').style.display = 'block'
    images.address.set({
      "result": 'correct'
    })
  } else if (images.end === 1) {
    document.getElementById('limit').style.display = 'block'
    images.address.set({
      "result": 'time limit'
    })
  } else {
    document.getElementById('miss').style.display = 'block'
    images.address.set({
      "result": 'miss'
    })
  }
  document.getElementById('toNextStep').style.display = 'block'
}
