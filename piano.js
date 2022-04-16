let hrs = mins = secs = ms = "0" + 0, startWatch;
let startTime, playedNotes, recordTime, recordedSong;
document.getElementById("submitVal").addEventListener("submit", (event) => {
    event.preventDefault()
})

const keys = document.querySelectorAll(".btn");
var nob = document.querySelectorAll(".btn").length;
for (var i = 0; i < nob; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
        var key = this.innerHTML;
        makeSound(key);
    });
}
const White_Keys=['z','x','c','v','b','n','m',',','.','/'];
const Black_Keys=['s','d','g','h','j','l',';'];
const whitekeys=document.querySelectorAll(".btn.white");
const blackkeys=document.querySelectorAll(".btn.black");


window.makeSound = function (key) {
    if (isRecording()) {
        recordNote(key);
    }
    switch (key) {
        case "C":
        case "c":


            var C = new Audio('notes/notes_C.mp3');
            C.play();
            break;
        case "D":
        case "d":
            var D = new Audio('notes/notes_D.mp3');
            D.play();
            break;
        case "E":
        case "e":
            var E = new Audio('notes/notes_E.mp3');
            E.play();
            break;

        case "F":
        case "f":
            var F = new Audio('notes/notes_F.mp3');
            F.play();
            break;
        case "G":
        case "g":
            var G = new Audio('notes/notes_G.mp3');
            G.play();
            break;
        case "A":
        case "a":
            var A = new Audio('notes/notes_A.mp3');
            A.play();
            break;

        case "B":
        case "b":
            var B = new Audio('notes/notes_B.mp3');
            B.play();
            break;
        case "X":
        case "x":
        case "Db":
            var X = new Audio('notes/notes_X.mp3');
            X.play();
            break;
        case "Y":
        case "y":
        case "Eb":
            var Y = new Audio('notes/notes_Y.mp3');
            Y.play();
            break;
        case "Z":
        case "z":
        case "Gb":
            var Z = new Audio('notes/notes_Z.mp3');
            Z.play();
            break;
        case "S":
        case "s":
        case "Ab":
            var S = new Audio('notes/notes_S.mp3');
            S.play();
            break;
        case "T":
        case "t":
        case "Bb":
            var T = new Audio('notes/notes_T.mp3');
            T.play();
            break;
    }
    


};

document.addEventListener("keydown", function (event) {
     if(event.repeat){
         return;
     }
    const IndexOfWhite=White_Keys.indexOf(event.key);
    const IndexOfBlack=Black_Keys.indexOf(event.key);
    if(IndexOfWhite>-1)
    {
        makeSound(whitekeys[IndexOfWhite].innerHTML);
       btnModifier(whitekeys[IndexOfWhite].innerHTML);
          
    }
    if(IndexOfBlack>-1){
        makeSound(blackkeys[IndexOfBlack].innerHTML);
        btnModifier(blackkeys[IndexOfBlack].innerHTML);
        
    }
    

});


  function btnModifier(currentkey)
  {
      console.log(currentkey)
    var activebutton=document.querySelector("."+currentkey);
    
    activebutton.classList.add("modify");
    
    setTimeout(function(){
        activebutton.classList.remove("modify");
        
    },200);
   
  }



const startBtn = document.querySelector(".start"),
    stopBtn = document.querySelector(".stop"),
    resetBtn = document.querySelector(".reset");
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", Stop);
resetBtn.addEventListener("click", reset);


function start() {
    startBtn.classList.add("active");
    stopBtn.classList.remove("inactive");
    startWatch = setInterval(function () {
        ms++;
        ms = ms < 10 ? "0" + ms : ms;
        if (ms == 100) {
            secs++;

            if (secs < 10) {
                secs = "0" + secs;
            }
            ms = "0" + 0;
            console.log(secs);
        }

        if (secs == 60) {
            mins++;
            if (mins < 10) {
                mins = "0" + mins;
            }
            secs = "0" + 0;
        }
        if (mins == 60) {
            hrs++;

            if (hrs < 10) {
                hrs = "0" + hrs;
            }
            mins = "0" + 0;
        }

        showTime();
    }, 10);
}

function Stop() {

    startBtn.classList.remove("active");
    stopBtn.classList.remove("inactive");

    clearInterval(startWatch);

}

function reset() {

    startBtn.classList.remove("active");
    stopBtn.classList.remove("inactive");

    hrs = mins = secs = ms = "0" + 0;
    clearInterval(startWatch);
    showTime();
}
function showTime() {
    document.querySelector(".milliseconds").innerText = ms;
    document.querySelector(".seconds").innerText = secs;
    document.querySelector(".minutes").innerText = mins;
    document.querySelector(".hour").innerText = hrs;

}
console.log(" in piano ")
const recBtn = document.querySelector(".recbtn"),
    playBtn = document.querySelector(".playbtn");


recBtn.addEventListener("click", record);
playBtn.addEventListener("click", playSong);

function record() {

    recBtn.classList.toggle("recording");
    if (isRecording()) {
        startRecording();
    }
    else {
        stopRecording();
    }
}

function isRecording() {
    return recBtn != null && recBtn.classList.contains("recording");
}
function startRecording() {
    playBtn.classList.remove("activated");
    
    startTime = Date.now();
    playedNotes = [];
    recordTime = [];
}
function stopRecording() {
    
    playBtn.classList.add("activated");
    

}
function playSong() {
    console.log("playing song");
    console.log(playedNotes);
    console.log(recordTime);
    if (playedNotes.length === 0) {
        return;
    }

    else {
        var numNotes = playedNotes.length;
        for (var i = 0; i < numNotes; i++) {
            doSetTimeout(i);


        }
    }
}


function recordNote(note) {
    playedNotes.push(note);
    recordTime.push(Date.now() - startTime);

}
function doSetTimeout(i) {
    setTimeout(function () {

        makeSound(playedNotes[i]);

    }, recordTime[i]);
}
var allSong = [];
var prevSong = firebase.database().ref("recordings/");
prevSong.on("value", (snapshot) => {
    const arr = snapshot.val();
    for (var i = 0; i < arr.length; i++) {
        allSong.push(arr[i]);
    }
    for (var i = 0; i < allSong.length; i++) {
        if(allSong[i].username==ID){
        var ul = document.getElementById("songList");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(allSong[i].songid));
        li.setAttribute("class", "allsongs");
        ul.appendChild(li);
        }
    }
    const songs = document.querySelectorAll(".allsongs");
    var nos = document.querySelectorAll(".allsongs").length;
    for (var i = 0; i < nos; i++) {
        
        songs[i].addEventListener("click", function () {
            
            var sn= this.innerHTML;
            for (var j = 0; j < allSong.length; j++) {
                if (allSong[j].username == ID && allSong[j].songid == sn) {
                    for (var k = 0; k < (allSong[j].music).length; k++) {
                        setTheTime(k,j);
                        console.log("help")
                    }

                }
            }
        })
    }
    const final=snapshot.val(); //
    function setTheTime(i,x){
        setTimeout(function(){
                      makeSound((final[x].music)[i]);
                  },(final[x].time)[i]);
    }
})

function saveSong() {
    const SongName = document.getElementById("songname").value;
    var Ref = firebase.database().ref("recordings/");


    allSong.push({ username: ID, songid: SongName, music: playedNotes, time: recordTime });
    Ref.set(allSong);
    var ul = document.getElementById("songList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(SongName));
    li.setAttribute("class", "allsongs");
    ul.appendChild(li);
}


var ID = "";
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("index.html")
    }
    else {
        document.getElementById("user").innerHTML = "Hello, " + user.email

        ID = user.uid;
    }
})

console.log("hu")
function logout() {
    firebase.auth().signOut().then(() => {
        location.replace("index.html")
    })

}

