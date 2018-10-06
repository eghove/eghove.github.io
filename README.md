# word-guess-game
Homework 3: Word Guess Game

This interactive web-game produced as part of the homework for The Coding Bootcamp, Cohort 8, through the University of Minnesota's College of Continuing Education.

The purpose of the game is to simulate a game of hangman where the words the user is prompted to guess are breweries in Minnesota. 

Upon loading, the page selects a word from the word bank at random. As the user guesses letters by striking keys on the keyboard, those letters are checked against the word selected. If a correct letter is guessed, it is displayed on the screen in its proper place. All letters guessed are also displayed on the screen. The user gets 10 attempts to correctly guess the word. Each guess decreases a guess counter. If the word is guessed correctly within 10 attempts, the win count iterates by one, and the game resets. If the user does not guess the game within 10 attempts, the game resets. Eventually, I would like to code the game to display different historical photos of Minnesota's breweries each time the game resets.

There is a hiccup in the gameplay that I haven't been able to fix. There is a space between winning or losing the game when the user has to strike an extra key (that's not stored anywhere) in order to get the game to reset. Any suggestions are welcome!
