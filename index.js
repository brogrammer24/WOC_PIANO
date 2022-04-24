console.log("i am in");
document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})
const eyeButton=document.getElementById("eyeBtn");
eyeButton.addEventListener("click",visibility);

const eye=document.getElementById("icon");


function visibility(){
 const passwordInp=document.getElementById("password");
 if(passwordInp.type==="password"){
     passwordInp.type="text";
     eye.innerText="visibility_off";
 }
 else{
     passwordInp.type="password";
     
     eye.innerText="visibility";
 }

}

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("piano.html")
        
        document.getElementById("user").innerHTML="Hello, "+user.email
    }
    
})


function login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

function signUp(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

function forgotPass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}