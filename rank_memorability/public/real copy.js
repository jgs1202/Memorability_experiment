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
images.shuffle = []

images.intervalTime = 500
images.firstTime = 5
images.secondTime = 10

images.start = 0
images.count = 0
images.vis = 3
images.targets = 1
images.course = 0

//////////////////////////////////////////////////////////////



///////////////////// use data and set course ///////////////////

console.log(FORM)

window.addEventListener('load', function() {
  //check previous data
  images.name = FORM.name

  images.parSet = FORM.course[0]
  console.log(FORM.course[0])
  console.log(images.parSet)

  //make course random
  images.ref = []
  for (let j = 0; j < images.vis; j++) {
    for (let i = 0; i < images.targets; i++) {
      images.ref[i + images.targets * j] = images.parSet + '/vis' + '' + j + '/' + i
    }
  }
  console.log(images.ref);

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

  console.log(images.name)
  document.h1.v1.value = images.name
  images.newPostKey = firebase.database().ref().child('posts').push().key
  firebase.database().ref('user/' + images.name + '/times').update({
    'keys': images.newPostKey
  })
  descideCourse()
}, false)


let courseSelect = function() {
  console.log(images.courseCheck);
  // remove images.ref[i] when imagds.couseCheck[i] == 1
  for (let i = 0; i < images.ref.length; i++) {
    if (images.courseCheck[i] === 1) {
      console.log(i)
      images.front = images.ref.slice(0, i)
      images.back = images.ref.slice(i + 1, images.ref.length)
      images.ref = images.front.concat(images.back)
      i -= 1
    }
    console.log(images.ref);
  }
  // shuffle the oder of images.ref
  for (let i = images.ref.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    let tmp = images.ref[i]
    images.ref[i] = images.ref[r];
    images.ref[r] = tmp;
  }
  console.log(images.ref.length);
  console.log(images.ref)

  VerifyEnd()

}

let waitCheck = function() {
  check()
  console.log(FORM)
}

//check coursecheck
let check = function() {
  for (let i = 0; i < images.ref.length; i++) {
    if (typeof images.courseCheck[i] === 'undefined') {
      setTimeout(waitCheck, 300)
      console.log(images.courseCheck)
      break
    } else if (i === images.targets * images.vis - 1) {

      console.log(images.courseCheck)
      courseSelect()
    }
  }
}

let descideCourse = function() {
  images.courseCheck = []
  images.database = firebase.database()
  //　3コースについて既にプレイしたか検証
  for (let n = 0; n < images.targets * images.vis; n++) {
    images.database.ref('user/' + images.name + '/real/' + images.ref[n]).once('value').then(function(snapshot) {
      console.log(snapshot._e)
      console.log(parseInt(snapshot.ge.path.n[4][3]) * images.targets + parseInt(snapshot.ge.path.n[5])) //._.B.value)
      if (typeof snapshot._e._.B.value === "undefined") {
        images.courseCheck[parseInt(snapshot.ge.path.n[4][3]) * images.targets + parseInt(snapshot.ge.path.n[5])] = 0
      } else {
        images.courseCheck[parseInt(snapshot.ge.path.n[4][3]) * images.targets + parseInt(snapshot.ge.path.n[5])] = 1
        // console.log(snapshot.ge.path.n[3])
      }
    })
  }

  check()
  console.log(images.ref)
}

let VerifyEnd = function() {
  console.log('course is ' + '' + images.course)
  if (images.course === images.ref.length) {
    document.h2.v2.value = images.name
    document.getElementById('complete').style.display = 'block'
    document.getElementById('toNextStep2').style.display = 'block'
    document.getElementById('loading').style.display = 'none'
  } else {
    startDownload()
  }
}


///////////////////////////////////////////////////////////////



////////////////////// load image ////////////////////////////

let startDownload = function() {
  console.log('Download starts.')
  images.one = new Image(400, 250)
  images.two = new Image(400, 250)
  images.three = new Image(400, 250)
  images.white = new Image(400, 250)
  images.white2 = new Image(400, 250)
  images.white3 = new Image(400, 250)
  images.storageRef = firebase.storage().ref("images")
  images.one.srcurl = images.storageRef.child("one.png")
  images.two.srcurl = images.storageRef.child("second.png")
  images.three.srcurl = images.storageRef.child("theree.png")
  images.white.srcurl = images.storageRef.child('white.png')
  images.white2.srcurl = images.storageRef.child('white.png')
  images.white3.srcurl = images.storageRef.child('white.png')
  downloadWhite()
}

let downloadWhite = function() {
  images.white.srcurl.getDownloadURL().then(function(url) {
    images.white.addEventListener("load", downloadWhite2, false)
    images.white.src = url
  })
}
let downloadWhite2 = function() {
  images.white.removeEventListener("load", downloadWhite2)
  images.white2.srcurl.getDownloadURL().then(function(url) {
    images.white2.addEventListener("load", downloadWhite3, false)
    images.white2.src = url
  })
}
let downloadWhite3 = function() {
  images.white2.removeEventListener("load", downloadWhite3)
  images.white3.srcurl.getDownloadURL().then(function(url) {
    images.white3.addEventListener("load", downloadOne, false)
    images.white3.src = url
  })
}
let downloadOne = function() {
  images.white3.removeEventListener("load", downloadOne)
  images.one.srcurl.getDownloadURL().then(function(url) {
    images.one.addEventListener("load", downloadTwo, false)
    images.one.src = url
  })
}
let downloadTwo = function() {
  images.one.removeEventListener("load", downloadTwo)
  images.two.srcurl.getDownloadURL().then(function(url) {
    images.two.addEventListener("load", downloadThree, false)
    images.two.src = url
  })
}
let downloadThree = function() {
  images.two.removeEventListener("load", downloadThree)
  images.three.srcurl.getDownloadURL().then(function(url) {
    images.three.addEventListener("load", downloadImageTutorial, false)
    images.three.src = url
  })
}
let downloadImageTutorial = function() {
  images.three.removeEventListener("load", downloadImageTutorial)
  images.tutorialRef = firebase.storage().ref("real/" + images.ref[ images.course ])
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
    images.verify[n] = 0
    images.imgName = '' + n + '.png'
    console.log(images.imgName)
    imgTutorial[n] = images.tutorialRef.child(images.imgName)
    console.log("download start" + images.imgName)

    imgTutorial[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.img[n] = new Image(400, 250)
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
  document.getElementById('correct').style.display = 'none'
  document.getElementById('miss').style.display = 'none'
  document.getElementById('complete').style.display = 'none'
  document.getElementById('limit').style.display = 'none'
  document.getElementById("loading").style.display = "none"
  console.log("download finished.")
  if (images.start === 0) {
    document.getElementById('start1st').style.display = 'block'
    document.getElementById('buttonStart1st').addEventListener('click', firstSection, false)
    images.start = 1
  } else if (images.start === 1) {
    firstSection()
  }
}


let firstSection = function() {
  document.getElementById('buttonStart1st').removeEventListener('click', firstSection)
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
    while (images.tutorial1.targetPlace[3].firstChild) images.tutorial1.targetPlace[3].removeChild(images.tutorial1.targetPlace[3].firstChild);
    images.tutorial1.targetPlace[3].appendChild(images.white2)
    while (images.tutorial1.targetPlace[4].firstChild) images.tutorial1.targetPlace[4].removeChild(images.tutorial1.targetPlace[4].firstChild);
    images.tutorial1.targetPlace[4].appendChild(images.white3)
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
      // for (let i = 0; i < 8; i++) {
      //   while (images.tutorial1.targetPlace[i].firstChild) images.tutorial1.targetPlace[i].removeChild(images.tutorial1.targetPlace[i].firstChild);
      // }
      while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
      // images.tutorial1.targetPlace[1].appendChild(images.white)
      document.getElementById('cellCenter').textContent = '+'
      // while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
      setTimeout(goTutorialSecond, 2000)
    }
  }
  console.log(images.time)
  images.time += 1
}

let goTutorialSecond = function() {
  console.log('end')
  // document.getElementById('1stTable').style.display = 'none'
  // document.getElementById('start2nd').style.display = 'block'
  // document.getElementById('buttonStart2nd').addEventListener('click', secondSection, false)
  secondSection()
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
    images.tutorial2.centerPlace.textContent = ''
    // while (images.tutorial2.targetPlace[1].firstChild) images.tutorial2.targetPlace[1].removeChild(images.tutorial2.targetPlace[1].firstChild);
    // images.tutorial2.targetPlace[1].appendChild(images.white)
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
      // document.getElementById('cellCenter').textContent = '' + images.secondTime
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
      }
      showResult()
    } else if ((images.time % 2) === 0) {
      // document.getElementById('cellCenter').textContent = '' + (images.secondTime - (images.time / 2 - 3))
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
    // icon: "warning",
    showCancelButton: true,
    showConfirmButton: true,
    buttons: true,
    customClass: 'swal-wide'
    // dangerMode: true,
  }, function(inputValue) {
    console.log(inputValue)
  }).catch(swal.noop).then((result) => {
    console.log(result)
    if (result) {
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
  images.address = firebase.database().ref("/user/" + images.name + '/real/' + images.ref[images.course])
  images.resultAdd = firebase.database().ref('/result/' + images.ref[images.course])
  images.resultNameAdd = firebase.database().ref('/result/' + images.ref[images.course] + "/" + images.name)
  document.getElementById('1stTable').style.display = 'none'
  if (parseInt(images.tutorial2.answer) === images.targetNumber) {
    document.getElementById('correct').style.display = 'block'
    images.resultAdd.set({
      "result": 'correct'
    })
    images.resultNameAdd.set({
      "result": 'correct'
    })
    images.address.set({
      "result": 'correct'
    })
  } else if (images.end === 1) {
    images.end = 0
    document.getElementById('limit').style.display = 'block'
    images.resultAdd.set({
      "result": 'time limit'
    })
    images.resultNameAdd.set({
      "result": 'time limit'
    })
    images.address.set({
      "result": 'time limit'
    })
  } else {
    document.getElementById('miss').style.display = 'block'
    images.resultAdd.set({
      "result": 'miss'
    })
    images.resultNameAdd.set({
      "result": 'miss'
    })
    images.address.set({
      "result": 'miss'
    })
  }
  images.course += 1
  VerifyEnd()
  images.tutorial2.answer = 100
}

// document.h1.v1.value = images.name
// document.getElementById('toNextStep').style.display = 'block'
// document.getElementById('submit').style.display = 'toNextStep'
