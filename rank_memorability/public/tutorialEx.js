let FORM = new　 Array();
parse();

function　 parse() {　　　 // 関数にしなくてもいいのですが、一応
  　　
  var　 buffer = location.search.substr(1);　　
  var　 pairs = buffer.split("&");

  　　
  for (var　 i　 in 　pairs) {　　　　
    var　 pair = pairs[i].split("=");　　　　
    FORM[pair[0]] = unescape(pair[1].replace("+", " "));　　
  }
}

window.addEventListener('load', function() {
  console.log(FORM)
  console.log(document.getElementById('submit'))
  let Name = FORM.v1
  console.log(Name)
  document.h1.v1.value = Name
}, false)
