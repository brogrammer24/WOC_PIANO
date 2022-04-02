console.log(" in piano ")


var nob = document.querySelectorAll(".btn").length;
for(var i=0; i<nob; i++)
{
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){
        var key=this.innerHTML;
        makeSound(key);
    });
}
function makeSound(key)
{
    switch(key){
        case "C":
        case "c":
            
            var C =new Audio('notes/notes_C.mp3');
            C.play();
             break;
            case "D":
            case "d":
                var D=new Audio('notes/notes_D.mp3');
                D.play();
                break;
        case "E":
        case "e":
          var E=new Audio('notes/notes_E.mp3');
          E.play();
          break; 
          
         case "F":
             case "f":
                 var F=new Audio('notes/notes_F.mp3');
                 F.play();
                 break;
         case "G":
        case "g":
            var G=new Audio('notes/notes_G.mp3');
            G.play();
            break;        
       case "A":
           case "a":
               var A=new Audio('notes/notes_A.mp3');
               A.play();
               break;

         case "B":
             case "b":
                 var B=new Audio('notes/notes_B.mp3');
                 B.play();
                 break;
       case "X":
           case "x":
           var X=new Audio('notes/notes_X.mp3');
           X.play();
           break;
        case "Y":
            case "y":
                var Y=new Audio('notes/notes_Y.mp3');
                Y.play();
                break;
        case "Z":
         case "z":
        var Z=new Audio('notes/notes_Z.mp3');
        Z.play();
        break;  
        case "S":
         case "s":
        var S=new Audio('notes/notes_S.mp3');
        S.play();
        break;  
        case "T":
            case "t":
           var T=new Audio('notes/notes_T.mp3');
           T.play();
           break;       
    }
}
document.addEventListener("keydown",function(event){
    makeSound(event.key);
});

firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }
    else{
        document.getElementById("user").innerHTML= "Hello, "+user.email
    }
})

function logout(){
    firebase.auth().signOut().then(()=>{
        location.replace("index.html")
    })
      
}
