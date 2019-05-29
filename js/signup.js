// **************************** get data from user *******************************************************

let fulltName = document.getElementById("fulltName");
let contactNum = document.getElementById("contactNum");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document.getElementById("btn");
let showError = document.getElementById("showError");


const dataBase = firebase.database().ref(`/`);
// **************************** data submit button *******************************************************

 btn.addEventListener('click', ()=>{     
    let obj = {
      fulltName : fulltName.value,
      contactNum : contactNum.value,
        email : email.value,
        password : password.value

    }
    console.log(obj)
// **************************** user email save in firebase authentication *******************************************************

    firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password)
    .then((res)=>{
      obj.id= res.user.uid;
dataBase.child(`CurrentUser/${res.user.uid}`).set(obj);

window.location.href = './../login/login.html';

console.log(res);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        showError.innerHTML = "Please Enter Correct Email & Password"
     
      });

 }
 )

 
