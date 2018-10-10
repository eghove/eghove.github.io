//GLOBAL VARIABLES----------------------------------------------

const words = ["summit", "surly", "schells", "fulton", "indeed","bang", "bauhaus","fitgers", "finnegans", "insight", "invictus", "lynnlake", "modist", "pyres", "sisyphus", "sociable", "utepils", "waldmann", "voyageur"]; // array for the word bank
let maxWords = words.length;
let wins = 0;
let wordSelected="";
let lettersGuessed=[];
let letterToCheck;
let numberOfGuesses=10;
let splitWord=[]; //creates an empty array
let guessInProgress=[]; //sets up the blank array for guess in progress
let correctLetters=[]; //empty array where the correct letters go



//---FUNCTIONS----------------------------------------------------

//Prepares the hangman blanks
function prepareGuessInProgress () {
    spaces=splitWord.length; // sets spaces equal the length of the splitWord array
    for (i=0; i < spaces; i++) { // for loop that pushes the appropriate number of blanks into guessInProgress
        guessInProgress.push(" __ "); 
    }
  }


//The tester function that tests letters guessed against the word selected
function tester (e) {
  for(i=0; i<splitWord.length; i++) {
    if(e==splitWord[i]) {
      correctLetters.push(e);
      //console.log('correct letter' + e);
      for (j=0; j<correctLetters.length; j++) {
        if(splitWord[i]=correctLetters[j]) {
          guessInProgress[i] = correctLetters[j];
        } // else guessInProgress[i] = "*";
      } 
     }
    }
}

  

//this function iterates wins variable and prints it to the screen
function wonGame() {
    wins++;
    document.getElementById("wins").innerHTML = wins;

}

//the random number generator
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//to check the current letter guessed against those already guessed in the lettersGuesed array
var checkLetter = function(element) {
    return element === letterToCheck;
}

//PRINT FUNCTIONS
function printGuesses () {
    document.getElementById("guessesRemaining").innerHTML = numberOfGuesses;
}

function printLettersGuessed() {
    document.getElementById("printLettersGuessed").innerHTML = lettersGuessed;
}


//Selects a random word from the words array
function wordSelector() {
    let randomNumber=0; //creates a local variable randomNumber
    randomNumber=getRandomInt(maxWords); //sets randomNumber equal to getRandomInt call
    wordSelected=words[randomNumber]; // sets global variable to random index value of words array
    console.log(wordSelected); // for debugging
}

//Splits the word selected into individual letters
function wordSplitter(value) {
    splitWord=value.split(""); // splits the string apart into its constituents into the splitWord array
//    console.log(splitWord); //debugging
//    console.log(splitWord.length); //debugging
}



//Takes however long the target word is, creates that many spaces, and prints it on the webpage
function printSpaces() {
    document.getElementById("spaces").innerHTML=guessInProgress.join(" ");
}

//Tests to see if the player won
function didIWin() {
    let counter = 0;
    for (k = 0; k < wordSelected.length; k++) {
      if (guessInProgress[k] === wordSelected[k]) {
        counter++;
      }
    }
    if (counter === wordSelected.length) {
        return true;
     // console.log("You won!");
    } else return false; //console.log("Keep trying");
  }

//Keep playing function
function keepPlaying() {
    if (lettersGuessed.some(checkLetter)) { //if any checkletter matches any already in lettersguess array, true
        console.log("Already guessed!");//debug
    } else {
        numberOfGuesses--;
        lettersGuessed.push(event.key); // pushes the letter typed into the lettersGuessed array
        console.log(lettersGuessed); // debug purposes
        printLettersGuessed();
        tester(event.key);
        printSpaces();
        printGuesses();
        if(didIWin()===true) {
            wonGame();
            resetGame();
        }
    }
}

//Reset Game function, resets the game
function resetGame() {
    numberOfGuesses=10; // reset number of guesses   
    lettersGuessed=[]; // reset letters guessed
    guessInProgress=[]; //resets guessInProgress
    correctLetters=[]; // resets correct letters
    splitWord=[]; // resets splitWord
    wordSelector(); // selects the word
    wordSplitter(wordSelected); //splits the selected word apart
    prepareGuessInProgress(); // prepares the guessInProgress array with requisite number of blanks
    printGuesses(); // displays total number of guesses
    printSpaces(); // displays contents of guessInProgress on page
}

// ---------------------GAMEPLAY---------------------------------------------

//Initial Load of Game
resetGame();

//Once a key is pressed
document.onkeyup = function(event) {
    letterToCheck = (event.key); //set letterToCheck to the letter typed on keyboard
    if (numberOfGuesses > 0 && didIWin()===false) { // while there are still guesses remaining, do this:
        keepPlaying();
    } else  {     // once guesses are exhausted do this:
            if(didIWin()===true) {
                wonGame();
                resetGame();
            } else if (didIWin()===false) 
                resetGame();
        }
    }
