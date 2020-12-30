// simple function to generate a unique ID for Appsheet

function genRandomKey() { 
  var ans = ["a","b","c","d","e","f","g","h","i","j","k","l",
           "m","n","o","p","q","r","s","t","u","v","w","x",
           "y","z","0","1","2","3","4","5","6","7","8","9"];
  var key = [];
  for (i=1; i<=8; i++) {
    var index = Math.floor(Math.random() * ans.length);
    selected = ans.splice(index,1).toString();
    key.push(selected);
  }
  var result = key.join("");
  return result;
}