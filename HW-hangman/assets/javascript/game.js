/** variables */
// array of word options
let words = [ "BMW", "Mercedes-Benz", "Porsche", "Audi", "Volkswagon"];
let lettersGuessed = [];
let numberSpaces = [];
let wrongLetters = [];
let guessRemain = 8;
let wins = 0; 
let randomNumber ;
let computerChoice ;
let computerArray ;
let losses = 0;

function init() {
  numberSpaces = [];
  guessRemain = 10;
  document.getElementById("guesses-remaining").textContent = guessRemain;
  lettersGuessed = [];
  document.getElementById("already-guessed").textContent = lettersGuessed;
  randomNumber = Math.floor((Math.random() * 5));
  computerChoice = words[randomNumber]; 
  computerArray = Array.from(computerChoice);
  console.log(computerArray);
  for (var i=0; i < computerArray.length; i++) {
    numberSpaces.push("_");
    document.getElementById("blanks").textContent = numberSpaces.join(" ");
  }
}
init ();

document.onkeyup = function(event) { 
  userText = event.key;
    if (computerArray.includes(userText) === true) {
      for (var i=0; i < computerArray.length; i++) {
        if (computerArray[i] === userText) {
        numberSpaces[i] = userText; 
        document.getElementById("blanks").textContent = numberSpaces.join(" ");
        } 
      }
    } else {
      lettersGuessed.push(userText);
      console.log(lettersGuessed);
      document.getElementById("already-guessed").textContent = lettersGuessed.sort();
      console.log(computerArray.includes(userText));
      guessRemain--;
      document.getElementById("guesses-remaining").textContent = guessRemain;
    }
  if (guessRemain === 0 ) {
    // alert("you lose");
    losses++; 
    document.getElementById("losses").textContent = losses;
    init();
  }
  if (computerArray.toString() == numberSpaces.toString()) {
    wins++;
    document.getElementById("win-win").textContent = wins;
    init();
  } 


}