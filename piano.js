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
        case "C#":
            var X = new Audio('notes/notes_X.mp3');
            X.play();
            break;
        case "Y":
        case "y":
        case "D#":
            var Y = new Audio('notes/notes_Y.mp3');
            Y.play();
            break;
        case "Z":
        case "z":
        case "F#":
            var Z = new Audio('notes/notes_Z.mp3');
            Z.play();
            break;
        case "S":
        case "s":
        case "G#":
            var S = new Audio('notes/notes_S.mp3');
            S.play();
            break;
        case "T":
        case "t":
        case "A#":
            var T = new Audio('notes/notes_T.mp3');
            T.play();
            break;
    }

};
// function btnModifier(currentKey) {

//     var pressedbtn = document.querySelector("." + currentKey);
//     pressedbtn.classList.add("pressed");
//     setTimeout(function () {
//         pressedbtn.classList.remove("pressed");
//     }, 100);

// }
document.addEventListener("keydown", function (event) {
    makeSound(event.key);
    // btnModifier(event.key);
});

// document.addEventListener("keydown",function(event){
//     makeSound(event.key);
//     buttonAnimation(event.key);
//   });
//   function buttonAnimation(currentKey)
//   {
//     var activebutton=document.querySelector("."+currentKey);
//     activebutton.classList.add("pressed");
//     setTimeout(function(){
//       activebutton.classList.remove("pressed");
//     },100);
//   }



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
// saveBtn = document.querySelector(".savebtn");

recBtn.addEventListener("click", record);
playBtn.addEventListener("click", playSong);
// saveBtn.addEventListener("click", saveSong);
function record() {

    recBtn.classList.toggle("recording");
    if (isRecording()) {
        startRecording();
    }
    else {
        stopRecording();
    }
}
// console.log(" in piano ")
function isRecording() {
    return recBtn != null && recBtn.classList.contains("recording");
}
function startRecording() {
    playBtn.classList.remove("activated");
    // saveBtn.classList.remove("activated");
    startTime = Date.now();
    playedNotes = [];
    recordTime = [];
}
function stopRecording() {
    // playSong();
    playBtn.classList.add("activated");
    // saveBtn.classList.add("activated");

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
var allSong=[];
var prevSong=firebase.database().ref("recordings/"+ID);
prevSong.on("value",(snapshot)=>{
    const obj=snapshot.val();
    allSong.push({obj});
})
function saveSong() {
    const SongName = document.getElementById("songname").value;
     var Ref=firebase.database().ref("recordings/"+ ID);
     var obj={songname: SongName,music: playedNotes,time: recordTime};
     allSong.push({obj});
    Ref.set(allSong);

}

var ID="";
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("index.html")
    }
    else {
        document.getElementById("user").innerHTML = "Hello, " + user.email
        
        ID=user.uid;
    }
})

console.log("hu")
function logout() {
    firebase.auth().signOut().then(() => {
        location.replace("index.html")
    })

}

console.log("database")

console.log("database")
