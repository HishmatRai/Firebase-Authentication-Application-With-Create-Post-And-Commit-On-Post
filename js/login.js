
// **************************** render to sign up page*******************************************************

function signup(){
    window.location.href="./../signup/signup.html";
}
// **************************** get data from which is login now *******************************************************

let email = document.getElementById("email");
let password =  document.getElementById("password");
let btn = document.getElementById("btn");
let showError = document.getElementById("showError");
const database =  firebase.database().ref('/');

// **************************** login function *******************************************************

btn.addEventListener('click',()=>{
    let obj = {
        email : email.value,
        password : password.value
    }
// **************************** chek this user is sign up or not *******************************************************

    firebase.auth().signInWithEmailAndPassword(obj.email, obj.password)
    .then((res)=>{
    database.child("CurrentUser/" + res.user.uid).on("value" , current =>{
    current = current.val();
    localStorage.setItem("userData" , JSON.stringify(current));
  window.location.href = './../home/home.html';
    console.log(res);
  })
    
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        showError.innerHTML = "Please Enter Correct Email & Password";
      
      });
    
    })