// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var mistakes = 0;
var myInterval;

function startGame(){
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  generatePattern();
  clueHoldTime = 1000;
  mistakes = 0;
  updateMistakeCount();
  
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence()
}
function generatePattern() {
  for (var i = 0; i < pattern.length; i++) {
    pattern[i] = getRandomInt(1, 5);
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function stopGame() {
  gamePlaying = false;
  guessCounter = 0;
  progress = 0;
  
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  context.resume()
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  clueHoldTime -= 100;
  clearInterval(myInterval);
  startTimer();
}

function startTimer() {
  //timeLeft
  var element = document.getElementById("timeLeft");
  var seconds = 59; 
  myInterval = setInterval(function () {
    seconds--;
    if (seconds == 0) {
      loseGame();
    }
    var strSeconds = seconds.toString();
    if (strSeconds.length == 1) {
      strSeconds = "0" + strSeconds;
    }
    element.innerHTML = "00:" + strSeconds;
  }, 1000);
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
  clearInterval(myInterval);
}

function winGame(){
  stopGame();
  alert("Game Over. You won!");
}

function guess(btn){
  
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  else {
    if (pattern[guessCounter] == btn) { //if guess is correct
      if (guessCounter == progress) {  //if turn is over
        if (pattern.length-1 == progress) { //if this is the last turn
          winGame();
        }
        else {
          progress++;
          playClueSequence();
        }
      }
      else {
        guessCounter++;
      }
    }
    else {
      
      mistakes++;
      updateMistakeCount();
      if (mistakes == 3) {
        loseGame(); 
      }
      else {
        playClueSequence();
      }
    }
  }
}

function updateMistakeCount() {
  document.getElementById("mistakesCount").innerHTML = "Mistakes Count: " + mistakes;
}