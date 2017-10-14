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
document.getElementById("auth").style.display="block"
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

window.addEventListener("load", function(){

  document.getElementById("displayAuth").addEventListener("click", viewAuth, false)
  console.log("event is set.")
  },false)

var viewAuth = function(e){
  const authData = firebase.auth().currentUser
  let divInfo = document.getElementById("userInfo")
  divInfo.style.display="block"
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
  console.log(firebase.auth().currentUser.displayName)//.displayName, userData.uid, userData.email, userData.emailVerified)
  let divInfo = document.getElementById("userInfo")
  divInfo.style.display="none"
  document.getElementById("auth").style.display="none"
  document.getElementById("howTo").style.display="block"
  document.getElementById("imgSample").style.display="block"
  writeNewPost(userData.displayName, userData.uid, userData.email, userData.emailVerified)
  downloadImg();
}
//htmlロードが完了したらボタンにイベントを設定
window.addEventListener("load", function() {
  console.log(document.getElementById("btnChangeData"))
  document.getElementById("btnChangeData").addEventListener("click", clickWrite, false)
  }, false)


//display image file in firebase storage
//get reference to firebase storage
var storageRef = firebase.storage().ref("sampleImage")
//get reference of a image in image folder
let stringPng = ".png"
let imgNumber = 0
//after html are loaded, displaying image
//window.addEventListener("load", function(){
//  document.getElementById("btnDisplay").addEventListener("click", downloadImg, false)
//}, false)
var downloadImg = function(){
  console.log(imgNumber.toString)
  let imgName = ''+imgNumber + stringPng
  console.log(imgName)
  imgNumber += 1
  var imgSample = storageRef.child(imgName)
  console.log("download start.")
  imgSample.getDownloadURL().then(function(url){
    //document.getElementById("imgSample").style.backgroundImage = "url("+url+")"
    let imgPlace = document.getElementById("imgSample")
    let img = new Image(1000,1000)
    img.addEventListener("load", function(){
      //img.size = ImageGetNaturalSize(img)
      imgPlace.appendChild(img)
    }, false)
    img.src = url
    console.log("download finished.")
  }).catch(function(error){
    //Handle any Errors
    console.log(error)
  })
}
