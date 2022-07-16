function changeRgbActive() {
  let rgbOpen = document.querySelector("#rgbOpen");
  let rgbClose = document.querySelector("#rgbClose");
  rgbOpen.classList.toggle("active");
  rgbClose.classList.toggle("active");
}
document.querySelector("#rgbOpen").addEventListener("click",changeRgbActive);
document.querySelector("#rgbClose").addEventListener("click",changeRgbActive);

function changeRainbow() {
  let rainbow = document.querySelector("body");
  let double = document.querySelector(".double");
  double.classList.toggle("active");
  rainbow.classList.toggle("rainbow");
}
document.querySelector("#imgRainbow").addEventListener("click",changeRainbow);
document.querySelector(".double").addEventListener("click",changeRainbow);

function changeColor(n) {
  if (n == 1){
    document.body.style.setProperty("--color1",document.querySelector("#color1").value);
    localStorage.setItem("color1",document.querySelector("#color1").value);
  }else if (n == 2) {
    document.body.style.setProperty("--color2",document.querySelector("#color2").value);
    localStorage.setItem("color2",document.querySelector("#color2").value);
  }
}

if (localStorage.getItem("color1") == null){
  localStorage.setItem("color1","#00ffc0");
}else {
  document.body.style.setProperty("--color1",localStorage.getItem("color1"));
  document.querySelector("#color1").value = localStorage.getItem("color1");
}
if (localStorage.getItem("color2") == null){
  localStorage.setItem("color2","#00a9ff");
}else {
  document.body.style.setProperty("--color2",localStorage.getItem("color2"));
  document.querySelector("#color2").value = localStorage.getItem("color2");
}

function changeDayMode() {
  document.querySelector("body").classList.toggle("active");
  document.querySelector("#startApp img").classList.toggle("active");
}
document.querySelector("#dayMode").addEventListener("click",changeDayMode);
document.querySelector("#nightMode").addEventListener("click",changeDayMode);

document.querySelector("#loadApp").addEventListener("click",startApp);
function startApp() {
  document.querySelector("#startApp").classList.toggle("active");
  document.querySelector("#musics").classList.toggle("active");
}

document.querySelector("#settings").addEventListener("click",musicController);
document.querySelector("#closeMusicControler").addEventListener("click",musicController);
function musicController() {
  document.querySelector("#musicController").classList.toggle("active");
}