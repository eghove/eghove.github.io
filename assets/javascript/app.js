

//GLOBAL VARIABLES

//trivia questions object

$(document).ready(function() { //wrapping all of this in this onready function

//Trivia questions object grabbed these questions and facts from https://conversationstartersworld.com/space-trivia-questions/ Image from Giphy
var triviaQuestions = [
    {
        text: 'How many planets are there in our solar system?',
        options: ['8', '9', '10', '7'],
        correctAnswer: '8',
        image: 'assets/images/pluto-flyby.gif',
        fact: 'Four are terrestrial planets which include Mercury, Venus, Earth and Mars. The other four are giant planets which include Jupiter, Saturn, Uranus and Neptune. Pluto was declassified as a planet in August 2006. Sorry Pluto! In 2014, the hypothetical planet dubbed Planet Nine was discovered, but its existence has not yet been confirmed.'
    },

    {
        text: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Neptune', 'Jupiter', 'Mars'],
        correctAnswer: 'Jupiter',
        image: 'assets/images/jupiter.gif',
        fact: 'Jupiter is the largest planet in our solar system in terms of mass, volume, and surface. Jupiter’s diameter is roughly 11 times that of Earth. Jupiter’s mass is one thousandth that of the sun but 2.5 times the mass of all the planets in our solar system combined.'
    },

    {
        text: 'What is the most common type of star in the Milky Way?',
        options: ['Yellow dwarf stars', 'Blue giant stars', 'Neutron stars', 'Red dwarf stars'],
        correctAnswer: 'Red dwarf stars',
        image: 'assets/images/calvin-hobs-stars.gif',
        fact: 'Red dwarf stars make up an estimated ¾ of all stars found in the Milky Way. The surface temperature of red dwarf stars is less than 4,000 Kelvin, and they have a very low luminosity and therefore cannot be easily seen. In fact, from Earth not one red dwarf star can be seen with the naked eye.'
    },

    {
        text: 'Which NASA space flight was the last manned mission to the moon?',
        options: ['Apollo 17', 'Apollo 20', 'Ares 4', 'Luna 50'],
        correctAnswer: 'Apollo 17',
        image: 'assets/images/apollo17.gif',
        fact: 'Apollo 17 launched on December 7, 1972, as the first night launch done by NASA. It was also the final mission of NASA’s Apollo program. Apollo 17 was the last time humans traveled beyond low Earth orbit. The mission also boasted that at the time it had the longest moon landing, largest lunar samples, longest time in orbit, and the longest total moonwalks.'
    },

    {
        text: 'How many minutes was the shortest manned space flight?',
        options: ['120', '10', '90', '15'],
        correctAnswer: '15',
        image: 'assets/images/liftoff.gif',
        fact: 'This occurred on May 5, 1961 when Alan Shepard achieved an altitude of 115 miles in NASA’s Freedom 7. He was also the first American in space. Shepard later went on to become the oldest person to walk on the surface of the moon. He achieved this in 1971 during the Apollo 14 mission. At the time, he was 47 years old.'
    },

    {
        text: 'How many moons are in our Solar System?',
        options: ['40', '181', '263', '97'],
        correctAnswer: '181',
        image: 'assets/images/moon-silent-film.gif',
        fact: "These moons (also known as natural satellites) vary greatly in size and quantity per planet. For example, the largest moon is Jupiter’s Ganymede, and the smallest is Mars's Deimos. Ganymede has a diameter of 3,273 miles, and Deimos has a diameter of 7 miles."
    },

    {
        text: 'What is the largest type of star in the universe?',
        options: ['Red supergiant stars', 'Blue supergiant stars', 'Neutron stars', 'Yellow dwarf stars'],
        correctAnswer: 'Red supergiant stars',
        image: 'assets/images/big-one.gif',
        fact: "Red supergiant stars have the largest volume of all the stars in the known universe and are classified as K or M spectral types. Red supergiant stars are several hundreds, to over a thousand times, the radius of our sun. Many scientists believe that the star UY Scuti is the largest red supergiant star in the universe. It has a volume 5 billion times that of the Sun."
    },

    {
        text: 'What is the closest star to the Sun?',
        options: ['Wolf 359', 'Sirius', 'Proxima Centauri', 'Epsilon Eridani'],
        correctAnswer: 'Proxima Centauri',
        image: 'assets/images/shatner.gif',
        fact: "Proxima Centauri is a red dwarf star located in Alpha Centauri system, which is in the Centaurus constellation. Alpha Centauri is actually a triple star system with Proxima Centauri being the closest to the sun. It is 4.24 light years away from the Sun, and is not visible to the naked eye from Earth."
    },

    {
        text: 'What is the farthest distance from Earth a manned mission has traveled?',
        options: ['4 light-years', '41,652 miles', '248,655 miles', '12 parsecs'],
        correctAnswer: '248,655 miles',
        image: 'assets/images/houston-problem.gif',
        fact: "This was achieved during the Apollo 13 mission which launched on April 11, 1970. During the mission an oxygen tank exploded. The explosion forced the crew to abort its mission to land on the moon. The Apollo 13 mission launched at 13:13 military time, and the explosion occurred two days after launch on April 13, 1970. That’s a lot of 13’s if you are the superstitious type!"
    }

];

//correct answers counter
var correctA=0;

//incorrect answers counter
var incorrectA=0;

//boolean for correct/incorrect answers
var correct=false;

//boolean to track if the user answered the question in proper amount of time
var timesUp=false;

//used in questionCountDown
var timer;

//used in tCardCountDown
var tccardTimer;

//used to iterate our way through the questions
let loopcounter=0; 


//CHECKS IF THE ANSWER THE USER SELECTS
function checkGuess (obj) {
        //console.log('onclick is active');
        $( ".answerBlock").on("click", function(){
            console.log('click function is fired!')
            guessSelected=$(this).attr("id", ); //may not need this
            guessText=$(this).text(); // takes the text from the answer selected, puts it here
            if (guessText===obj.correctAnswer){ // checks to see if the answer guessed is the right answer
                correctA++;
                correct=true;
            } else {
                incorrectA++;
                correct=false;};
                renderTitleCard(obj) // moves on to the title card       
        });
    }; 

//RENDERS THE TITLE CARD BETWEEN QUESTIONS
function renderTitleCard(obj) {
    clearTimeout(timer);
    tCardCountdown(10, obj);
    $( '#triviaSpace').empty(); //empties out the previous stuff
    var correctAnswer=$("<div id='correctAnswer'>");
    correctAnswer.text('The correct answer is: ' + obj.correctAnswer);

    var factText=$("<div id='factText'>");
    factText.text(obj.fact);
    var verdict = $("<div class='verdict'>"); 
    var image = $("<img src=" + obj.image  + ">");
    if (correct===true) {
        verdict.addClass("correct");
        verdict.text("YOU ARE CORRECT!");
    }; 
    if (correct===false) {
        verdict.addClass("incorrect");
        verdict.text("YOU ARE WRONG!");
    }; 
    if (timesUp===true) {
        verdict.addClass("times-up");
        verdict.text("TIME'S UP!");
    };

    $( '#triviaSpace').append(verdict).append(correctAnswer).append(factText).append(image);
}

//TRACKS TIME IN THE TITLE CARD BETWEEN QUESTIONS
function tCardCountdown (secs, obj) {
    if (secs < 1) {
        loopcounter++;
        clearTimeout(tccardTimer);
        timesUp=false;
        gamePlay();
    } else {
    $( "#timer" ).html('<p> Time Until Next Question: ' + secs + ' seconds</p>');
    secs--;
    tccardTimer = setTimeout(tCardCountdown, 1000, secs, obj);;
    }
}


//TRACKS TIMES IN THE QUESTIONS, RUNS THE GAME
function questionCountdown (secs, obj) {
    if (secs < 1) {
        clearTimeout(timer);
        timesUp=true;
        renderTitleCard(obj)
        console.log("times up!");
    } else {
    $( "#timer" ).html('<p> Time Remaining: ' + secs + ' seconds</p>');
    renderQuestion(obj);
    checkGuess(obj);
    secs--;
    timer = setTimeout(questionCountdown, 1000, secs, obj);;
    }
}


//BUILDS THE QUESTIONS AND POTENTIAL ANSWERS
function renderQuestion(obj) {
    $(".ruleText").addClass("hidden");
    $('#timer').removeClass("hidden");
    $("#triviaSpace").removeClass("hidden");
    $("#triviaSpace").empty(); // empties out the previous stuff
    var triviaBlock = $("<div>"); //creating an empty div, assigning it to this variable
    var questionText = $('<h3 id="questionText">'); // creates the div for the Trivia Question
    questionText.text(obj.text); // pulls in the question text, puts it in the div for questionText
    questionText.append("<br><br>");
    triviaBlock.append(questionText); // appends the questionText to the triviaBlock div
    $( "#triviaSpace").append(triviaBlock); // Renders the trivia block so far
    //need to build the for loop for possible answers
    for (i=0; i<4; i++) {
        var answerBlock = $('<p class="answerBlock">'); 
        answerBlock.text(obj.options[i]).attr("id", "answer" + i);
        $( "#triviaSpace").append(answerBlock);
    };
};

//CALLS questionCountdown for each each question
function gamePlay () {
    if(loopcounter < triviaQuestions.length) {
        questionCountdown(15, triviaQuestions[loopcounter]);
    } else {
        gameOver();
    };
}

//RESETS THE GAME
function reset() {
    correctA=0;
    incorrectA=0;
    timesUp=false;
    loopcounter=0; 
    correct=false;
    questionCountdown(15, triviaQuestions[loopcounter]);
}

//WHAT HAPPENS WHEN THE GAME IS OVER
function gameOver() {
    $( '#timer' ).empty() //empties out the timer div
    $( '#triviaSpace' ).empty() //empties out the triviaSpace Div
    var gameOver = $("<h2 id='gameOver'>");
    gameOver.text("GAME OVER!");
    var scoreBoard = $("<div id='scoreBoard'>")
    scoreBoard.html('<h4>Correct Answers: ' + correctA + '</h4> <br> <h4>Incorrect Answers: ' + incorrectA + '</h4>');
    var resetButton=$("<button id='reset'>Play Again? </button>")
    $( '#triviaSpace' ).append(gameOver).append(scoreBoard).append(resetButton);
    $( "#reset").on("click", function(){ // if the reset button is clicked, reset the game
        reset();
    })

}

//GAME PLAY

//initial call

$( "#start").on("click", function(){ // if the reset button is clicked, reset the game
    reset();
    $("#start").addClass("hidden");
})

}); //end of ready wrap function