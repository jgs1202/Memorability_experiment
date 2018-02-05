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
images.intervalTime = 500
images.shuffle = []
images.totalCourse = 3 //0
images.firstTime = 2 //0
images.secondTime = 60
images.totalNumber = 4
images.start = 0

//////////////////////////////////////////////////////////////



///////////////////// use data and set course ///////////////////

console.log(FORM)

window.addEventListener('load', function() {
  //check previous data
  images.name = FORM.v1
  console.log(images.name)
  document.h1.v1.value = images.name
  images.newPostKey = firebase.database().ref().child('posts').push().key
  firebase.database().ref('user/' + images.name + '/times').update({
    'keys': images.newPostKey
  })
  descideCourse()
}, false)


let courseSelect = function() {
  for (let m = 0; m < images.totalCourse; m++) {
    if (images.tutorial1.courseCheck[m] === 0) {
      images.tutorial1.course = m
      console.log(m)
      startDownload()
      break
    } else if (m === images.totalCourse - 1) {
      document.h2.v2.value = images.name
      document.getElementById('complete').style.display = 'block'
      document.getElementById('toNextStep2').style.display = 'block'
      document.getElementById('loading').style.display = 'none'
    }
  }
}

let waitCheck = function() {
  check()
  console.log(FORM)
}

//check coursecheck
let check = function() {
  for (let i = 0; i < images.totalCourse; i++) {
    if (typeof images.tutorial1.courseCheck[i] === 'undefined') {
      setTimeout(waitCheck, 300)
      console.log(images.tutorial1.courseCheck)
      break
    } else if (i === images.totalCourse - 1) {
      courseSelect()
      console.log(images.tutorial1.courseCheck)
    }
  }
}

let descideCourse = function() {

  for (let j = 0; j < images.totalNumber; j++) {
    images.shuffle[j] = j
  }
  for (let i = images.shuffle.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    let tmp = images.shuffle[i]
    images.shuffle[i] = images.shuffle[r];
    images.shuffle[r] = tmp;
  }
  for (let i = 0; i < images.totalNumber; i++) {
    if (images.shuffle[i] === 0) {
      images.targetNumber = i
    }
  }

  images.tutorial1.courseCheck = []
  images.database = firebase.database()
  //　3コースについて既にプレイしたか検証
  for (let n = 0; n < images.totalCourse; n++) {
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
  check()
  console.log(images.name)
}


///////////////////////////////////////////////////////////////



////////////////////// load image ////////////////////////////

let startDownload = function() {
  console.log('Download starts.')
  images.one = new Image(500, 500)
  images.two = new Image(500, 500)
  images.three = new Image(500, 500)
  images.white = new Image(500, 240)
  images.white2 = new Image(500, 470)
  images.white3 = new Image(500, 500)
  images.white4 = new Image(500, 500)
  images.targetImg = new Image(500, 500)
  images.storageRef = firebase.storage().ref("images")
  images.one.srcurl = images.storageRef.child("one.png")
  images.two.srcurl = images.storageRef.child("second.png")
  images.three.srcurl = images.storageRef.child("theree.png")
  images.white.srcurl = images.storageRef.child('white.png')
  images.white2.srcurl = images.storageRef.child('white.png')
  images.white3.srcurl = images.storageRef.child('white.png')
  images.white4.srcurl = images.storageRef.child('white.png')
  images.tutorialRef = firebase.storage().ref("tutorial/" + images.tutorial1.course)
  images.targetImg.srcurl = images.tutorialRef.child('target.png')
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
    images.white3.addEventListener("load", downloadWhite4, false)
    images.white3.src = url
  })
}
let downloadWhite4 = function() {
  images.white3.removeEventListener("load", downloadWhite4)
  images.white4.srcurl.getDownloadURL().then(function(url) {
    images.white4.addEventListener("load", downloadOne, false)
    images.white4.src = url
  })
}
let downloadOne = function() {
  images.white4.removeEventListener("load", downloadOne)
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
    images.three.addEventListener("load", downloadTarget, false)
    images.three.src = url
  })
}
let downloadTarget = function() {
  images.three.removeEventListener("load", downloadTarget)
  images.targetImg.srcurl.getDownloadURL().then(function(url) {
    images.targetImg.addEventListener('load', downloadImageTutorial, false)
    images.targetImg.src = url
  })
}
let downloadImageTutorial = function() {
  images.targetImg.removeEventListener("load", downloadImageTutorial)
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
  for (let n = 0; n < images.totalNumber; n++) {
    images.verify[n] = 0
    images.imgName = '' + n + '.png'
    console.log(images.imgName)
    imgTutorial[n] = images.tutorialRef.child(images.imgName)
    console.log("download start" + images.imgName)

    imgTutorial[n].getDownloadURL().then(function(url) {
      //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
      images.img[n] = new Image(500, 500)
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
      for (let j = 1; j < images.totalNumber; j++) {
        completeTu = completeTu * images.verify[j]
      }
      return completeTu
    }, 200)
  }
  while (verifyDownloadTu() === 0) {}
  console.log(images.tutorialRef)
  document.getElementById('correct').style.display = 'none'
  document.getElementById('miss').style.display = 'none'
  document.getElementById('complete').style.display = 'none'
  document.getElementById('limit').style.display = 'none'
  document.getElementById("loading").style.display = "none"
  images.wPlace0 = document.getElementById('W0')
  images.wPlace1 = document.getElementById('W1')
  images.wPlace2 = document.getElementById('W2')
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
  document.getElementById('Title').style.display = 'none'
  document.getElementById('buttonStart1st').removeEventListener('click', firstSection)
  document.getElementById('start1st').style.display = 'none'
  document.getElementById('1stTable').style.display = 'block'
  images.time = 0
  images.number = 0
  images.tutorial1.centerPlace = document.getElementById('cellCenter')
  images.tutorial1.targetPlace = []
  for (let i = 0; i < images.totalNumber; i++) {
    images.tutorial1.targetPlace[i] = document.getElementById('cell' + '' + i)
  }
  console.log(images.white)
  console.log(images.tutorial1.targetPlace[0])
  images.timer1 = setInterval(displayTutorial1, images.intervalTime)
}

let displayTutorial1 = function() {
  if (images.time === 0) {
    // while (images.wPlace0.firstChild) images.wPlace0.removeChild(images.wPlace0.firstChild);
    // while (images.wPlace1.firstChild) images.wPlace1.removeChild(images.wPlace1.firstChild);
    // while (images.wPlace2.firstChild) images.wPlace2.removeChild(images.wPlace2.firstChild);
    while (images.tutorial1.targetPlace[0].firstChild) images.tutorial1.targetPlace[0].removeChild(images.tutorial1.targetPlace[0].firstChild);
    images.tutorial1.targetPlace[0].appendChild(images.white2)
    // while (images.tutorial1.targetPlace[1].firstChild) images.tutorial1.targetPlace[1].removeChild(images.tutorial1.targetPlace[1].firstChild);
    // images.tutorial1.targetPlace[1].appendChild(images.white2)
    // while (images.tutorial1.targetPlace[2].firstChild) images.tutorial1.targetPlace[2].removeChild(images.tutorial1.targetPlace[2].firstChild);
    // images.tutorial1.targetPlace[2].appendChild(images.white3)
    // while (images.tutorial1.targetPlace[3].firstChild) images.tutorial1.targetPlace[3].removeChild(images.tutorial1.targetPlace[3].firstChild);
    // images.tutorial1.targetPlace[3].appendChild(images.white2)
    // images.tutorial1.centerPlace.appendChild(images.three)
    images.tutorial1.centerPlace.textContent = '3'
  } else if (images.time === 2) {
    // while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
    // images.tutorial1.centerPlace.appendChild(images.two)
    images.tutorial1.centerPlace.textContent = '2'
  } else if (images.time === 4) {
    // while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
    // images.tutorial1.centerPlace.appendChild(images.one)
    images.tutorial1.centerPlace.textContent = '1'
  } else if (images.time > 5) {
    if (images.time == 6) {
      console.log((images.number))
      // while (images.wPlace2.firstChild) images.wPlace2.removeChild(images.wPlace2.firstChild);
      while (images.tutorial1.targetPlace[0].firstChild) images.tutorial1.targetPlace[0].removeChild(images.tutorial1.targetPlace[0].firstChild);
      images.tutorial1.targetPlace[0].appendChild(images.white)
      // while (images.tutorial1.targetPlace[1].firstChild) images.tutorial1.targetPlace[1].removeChild(images.tutorial1.targetPlace[1].firstChild);
      // images.wPlace0.appendChild(images.white2)
      // images.wPlace1.appendChild(images.white3)
      // images.wPlace2.appendChild(images.white)
      images.tutorial1.centerPlace.textContent = ''
      while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
      images.tutorial1.centerPlace.appendChild(images.targetImg)
    } else if ((images.time) > 6 + images.firstTime * 2 - 1) {
      // while (images.tutorial1.centerPlace.firstChild) images.tutorial1.centerPlace.removeChild(images.tutorial1.centerPlace.firstChild);
      // images.tutorial1.targetPlace[1].appendChild(images.white)
      // images.tutorial1.targetPlace[0].appendChild(images.white4)
      while (images.tutorial1.targetPlace[0].firstChild) images.tutorial1.targetPlace[0].removeChild(images.tutorial1.targetPlace[0].firstChild);
      images.tutorial1.targetPlace[0].appendChild(images.white2)
      clearInterval(images.timer1)
      console.log("timer clear")
      // for (let i = 0; i < images.totalNumber; i++) {
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
  images.time = 6
  images.tutorial2.centerPlace = document.getElementById('cellCenter')
  images.tutorial2.targetPlace = []
  for (let i = 0; i < images.totalNumber; i++) {
    images.tutorial2.targetPlace[i] = document.getElementById('cell' + '' + i)
  }
  console.log(images.tutorial2.targetPlace[4])
  images.timer2 = setInterval(displayTutorial2, images.intervalTime)
}

let displayTutorial2 = function() {
  if (images.time === 0) {
    // while (images.tutorial2.targetPlace[0].firstChild) images.tutorial2.targetPlace[0].removeChild(images.tutorial2.targetPlace[0].firstChild);
    // images.tutorial2.targetPlace[0].appendChild(images.white2)
    images.tutorial2.centerPlace.textContent = '3'
    // while (images.tutorial2.targetPlace[1].firstChild) images.tutorial2.targetPlace[1].removeChild(images.tutorial2.targetPlace[1].firstChild);
    // images.tutorial2.targetPlace[1].appendChild(images.white)
    // while (images.tutorial2.targetPlace[3].firstChild) images.tutorial2.targetPlace[3].removeChild(images.tutorial2.targetPlace[3].firstChild);
    // images.tutorial2.targetPlace[3].appendChild(images.white2)
    // images.tutorial2.centerPlace.appendChild(images.three)
  } else if (images.time === 2) {
    // while (images.tutorial2.centerPlace.firstChild) images.tutorial2.centerPlace.removeChild(images.tutorial2.centerPlace.firstChild);
    // images.tutorial2.centerPlace.appendChild(images.two)
    images.tutorial2.centerPlace.textContent = '2'
  } else if (images.time === 4) {
    // while (images.tutorial2.centerPlace.firstChild) images.tutorial2.centerPlace.removeChild(images.tutorial2.centerPlace.firstChild);
    // images.tutorial2.centerPlace.appendChild(images.one)
    images.tutorial2.centerPlace.textContent = '1'
  } else if (images.time > 5) {
    if (images.time == 6) {
      images.tutorial2.centerPlace.textContent = ''
      document.getElementById('noChoice').style.display = 'block'
      while (images.tutorial2.centerPlace.firstChild) images.tutorial2.centerPlace.removeChild(images.tutorial2.centerPlace.firstChild);
      // document.getElementById('cellCenter').textContent = '' + images.secondTime
      for (let n = 0; n < images.totalNumber; n++) {
        console.log((images.number))
        while (images.tutorial2.targetPlace[n].firstChild) images.tutorial2.targetPlace[n].removeChild(images.tutorial2.targetPlace[n].firstChild);
        images.tutorial2.targetPlace[n].appendChild(images.img[images.shuffle[n]])
        // images.tutorial2.targetPlace[n].addEventListener('click', checkKey, false)
      }
      document.addEventListener('keydown', checkKey, false)
      document.getElementById('noIdea').addEventListener('click', chooseNone, false)
      images.startTime = new Date()
    } else if ((images.time) > 5 + images.secondTime * 2) {
      images.endTime = new Date()
      clearInterval(images.timer2)
      images.extime = images.time / 2
      images.end = 1
      console.log("timer clear")
      for (let n = 0; n < images.totalNumber; n++) {
        while (images.tutorial2.targetPlace[n].firstChild) images.tutorial2.targetPlace[n].removeChild(images.tutorial2.targetPlace[n].firstChild);
      }
      document.removeEventListener('keydown', checkKey)
      showResult()
    } else if ((images.time % 2) === 0) {
      // document.getElementById('cellCenter').textContent = '' + (images.secondTime - (images.time / 2 - 3))
    }
  }
  console.log(images.time)
  images.time += 1
}

let checkKey = function(e){
  console.log(e.keyCode)
  images.key = "None"
  if (e.keyCode == 84){
    images.key = 0
  }
  else if (e.keyCode == 89){
    images.key =1
  }
  else if (e.keyCode == 71){
    images.key = 2
  }
  else if (e.keyCode == 72){
    images.key = 3
  }
  if (images.key != 'None'){
    images.endTime = new Date()
    chooseTarget()
  }
}

let chooseTarget = function() {
  // console.log(document.getElementById(e.path[1].id))
  // document.getElementById(e.path[1].id).style.border = '3px solid #81F7F3'
  // swal({
  //   title: "Is your chice this?",
  //   // icon: "warning",
  //   showCancelButton: true,
  //   showConfirmButton: true,
  //   buttons: true,
  //   customClass: 'swal-wide'
  //   // dangerMode: true,
  // }, function(inputValue) {
  //   console.log(inputValue)
  // }).catch(swal.noop).then((result) => {
  //   console.log(result)
  //   if (result) {
  clearInterval(images.timer2)
  images.extime = images.endTime - images.startTime
  images.extime += ' ms'
  // document.getElementById(e.path[1].id).style.border = '0'
  document.getElementById('noIdea').removeEventListener('click', chooseNone)
  for (let n = 0; n < images.totalNumber; n++) {
    while (images.tutorial2.targetPlace[n].firstChild) images.tutorial2.targetPlace[n].removeChild(images.tutorial2.targetPlace[n].firstChild);
  }
  document.removeEventListener('keydown', checkKey)
  if (images.end !== 1) {
    images.tutorial2.answer = images.key
  }
  console.log(images.tutorial2.answer)
  showResult()
  // } else {
  //   document.getElementById(e.path[1].id).style.border = '0'
  // }
}

let chooseNone = function() {
  swal({
    title: "No idea?",
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
      images.extime = images.time / 2
      for (let n = 0; n < images.totalNumber; n++) {
        while (images.tutorial2.targetPlace[n].firstChild) images.tutorial2.targetPlace[n].removeChild(images.tutorial2.targetPlace[n].firstChild);
      }
      document.removeEventListener('click', checkKey)
      if (images.end !== 1) {
        images.tutorial2.answer = 'None'
      }
      console.log(images.tutorial2.answer)
      showResult()
    } else {
      document.getElementById(e.path[1].id).style.border = '0'
    }
  })
}



let showResult = function() {
  console.log(typeof images.tutorial2.answer, typeof images.targetNumber)

  ////////////////  send data  ////////////////////////////////////////////
  images.address = firebase.database().ref("/user/" + images.name + '/tutorial/' + '' + images.tutorial1.course)

  document.getElementById('1stTable').style.display = 'none'
  document.getElementById('noChoice').style.display = 'none'
  if (parseInt(images.tutorial2.answer) === images.targetNumber) {
    document.getElementById('correct').style.display = 'block'
    images.address.set({
      "result": 'correct',
      'time': images.extime
    })
  } else if (images.end === 1) {
    images.end = 0
    document.getElementById('limit').style.display = 'block'
    images.address.set({
      "result": 'time limit',
      'time': images.extime
    })
  } else {
    document.getElementById('miss').style.display = 'block'
    images.address.set({
      "result": 'miss',
      'time': images.extime
    })
  }
  descideCourse()
  images.tutorial2.answer = 100
  images.key = 'None'
}

//
// // document.h1.v1.value = images.name
// // document.getElementById('toNextStep').style.display = 'block'
// // document.getElementById('submit').style.display = 'toNextStep'
