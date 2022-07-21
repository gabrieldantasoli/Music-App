let Time = document.querySelector(".time .beggin");
let MusicDuration = document.querySelector(".time .end");
currentOperation = "";

function addPop() {
    if (currentOperation == "add") {
        addMusic();
        next();
    }else{
        removeMusic();
        previous();
    }
}

function getMusicas() {
    if (localStorage.getItem("listaMusicas") != null) {
      return localStorage.getItem("listaMusicas");
    } else {
        localStorage.setItem("listaMusicas",[]);
        localStorage.setItem("currentlyIndex",0);
        return localStorage.getItem("listaMusicas");  
    }
}
 
function setMusicas(musicas) {
    localStorage.setItem("listaMusicas",musicas);
}

function addMusic() {
    let musicas = getMusicas().split(",");
    let musica = document.querySelector("#nameMusic").value;
    if (musica.trim() != "") {
        musicas.push(musica.trim());
    }
    setMusicas(musicas);
}

function removeMusic() {
    let musicas = getMusicas().split(",");
    let musica = document.querySelector("#nameMusic").value;
    if (musica.trim() != "") {
        musicas.splice(musicas.indexOf(musica.trim()),1); 
    }         
    setMusicas(musicas);                                         
}

document.querySelector("#add").addEventListener("click",function () {
    currentOperation = "add";      
    document.querySelector("#form").style.display = "flex";             
});
document.querySelector("#remove").addEventListener("click",function () {
    currentOperation = "remove";                
    document.querySelector("#form").style.display = "flex";                    
});
document.querySelector("#complete").addEventListener("click",function () {
    addPop();
    document.querySelector("#form").style.display = "none";          
    document.querySelector("#form").value = "";                              
});

let Music = document.querySelector('audio');                                      

const UPDATE = () => {
  MusicDuration.textContent = SecondsToMinutes(Math.floor(Music.duration)); 
};
                                         
document.getElementById('play').addEventListener('click',play_music);
document.getElementById('pause').addEventListener('click',pause_music);
Music.addEventListener('timeupdate',update_progress);

const previous = () => {
  let MusicIndex = localStorage.getItem("currentlyIndex");
  MusicIndex --;
  localStorage.setItem("currentlyIndex",MusicIndex);
  MusicIndex = localStorage.getItem("currentlyIndex");
  let musicas = getMusicas().split(",");
  if (musicas.length > 1) {
    if (MusicIndex<1){
      MusicIndex = getMusicas().split(",").length-1;
      localStorage.setItem("currentlyIndex",MusicIndex);
    }
    PLAY(MusicIndex);
    UPDATE();
  }
};

const next = () => {
  let MusicIndex = localStorage.getItem("currentlyIndex");
  MusicIndex ++;
  localStorage.setItem("currentlyIndex",MusicIndex);
  let musicas = getMusicas().split(",");
  if (musicas.length > 1) {
    if (MusicIndex > (musicas.length-1)){
        MusicIndex = 1;
        localStorage.setItem("currentlyIndex",MusicIndex);
    }
    PLAY(localStorage.getItem("currentlyIndex"));
    UPDATE();
  }
};   

document.querySelector('#previous').addEventListener('click',previous);
document.querySelector('#next').addEventListener('click',next);

function play_music(){
  Music.play();
  UPDATE(); 
  document.getElementById('pause').style.display = "block";
  document.getElementById('play').style.display = "none";
}                       
                                          
function pause_music() {
  Music.pause();
  document.getElementById('pause').style.display = "none";
  document.getElementById('play').style.display = "block";
}
 
function PLAY(MusicIndex) {
  let musicas = getMusicas().split(",");
  let source = "audios/"+musicas[MusicIndex];  
  let musicName = musicas[MusicIndex].split("_").join(" ").replace(".mp3"," ");
  document.querySelector("#musicBox").textContent = musicName;
  Music.setAttribute('src',source);
  Music.addEventListener('loadeddata',() => {
    update_progress();
    MusicDuration.textContent = SecondsToMinutes(Math.floor(Music.duration));
  });
  document.body.append(Music);
  document.getElementById('pause').style.display = "none";
  document.getElementById('play').style.display = "block";
}

function SecondsToMinutes(seconds) {
  let Minutes = Math.floor(seconds/60);
  let Seconds = seconds%60;
  if (Seconds < 10){
    Seconds = '0' + Seconds;
  }
  return `${Minutes}:${Seconds}`;
}

function update_progress() {
  progress.value = (Music.currentTime/(Music.duration/100));
  if (progress.value>=100 && document.getElementById('one').classList == "repeat1 active"){
    next(); 
    previous();                         
    play_music(); 
  }else if (progress.value>=100 && document.getElementById('two').classList == "repeat1 active"){
    next(); 
    play_music();                 
  }
  Time.textContent = SecondsToMinutes(Math.floor(Music.currentTime));
} 

function changeTime(value){
  Music.currentTime = Music.duration*(value/100);
}

document.querySelector("#refresh") .addEventListener("click",() => {
  let one = document.querySelector("#one");
  one.classList.toggle("active");   
  let two = document.querySelector("#two");       
  if (one.classList == "repeat1 active" && two.classList ==  "repeat1 active") {
    two.classList.remove("active");
  }
})         
document.querySelector("#forward") .addEventListener("click",() => {
  let one = document.querySelector("#one");                                
  let two = document.querySelector("#two") ;   
  two.classList.toggle("active"); 
  if (one.classList == "repeat1 active" && two.classList ==  "repeat1 active") {
    one.classList.remove("active");
  }  
})              

next();