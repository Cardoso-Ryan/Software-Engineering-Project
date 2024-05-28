# Quiz Samurai
Welcome to Quiz Samurai! This is a web-based game project developed for our Software Engineering course at the University of Luxembourg. In this project, we've created a game inspired by the popular Fruit Ninja, but with our own unique twist.

## Introduction
Quiz Samurai is a fun and interactive game where players use a virtual samurai sword to slice various bamboos that fall from the top of the screen. 
The objective is simple: slice as many bamboos as possible while avoiding slicing any bombs that may also appear.

## Features
* Slicing Mechanism: Players can slice bamboos by swiping their mouse cursor across the screen.
* Multiple bamboos: Bamboos will keep falling down for the entirety of the game, while they also speed up with each increment of the level
* Bomb Avoidance: Bombs will occasionally appear among the bamboos; slicing a bomb will result in a loss of points.

## Technologies Used
* Frontend: HTML5, CSS3, JavaScript
* Game Engine: Phaser3.js

## How to Play
To play the game locally, follow these steps:

1. Clone this repository to your local machine using git clone.
2. Navigate to the project directory.
3. Open `index.html` in your preferred web browser.
4. We used `Live Share` as VSCode extension to run our webpage directly.

## Home Page
* Access the home page through `index.html`.
* Navigate to either the Quiz or Game section using the navigation menu.

## Game
* Open game.html to start the game.
* Select the desired difficulty and play the game by slicing bamboos and avoiding bombs.

## Quiz
* Open quiz.html to start the quiz.
* Choose a category and answer the questions.

## Configuration
The game is built using the Phaser 3 framework. The configuration is set in the game.js file. In HomeScene.js file, all the images and sounds are preloaded in advance for the Playscene.js there is the full game logic.

## Scenes
* HomeScene (HomeScene.js): Preloads assets and starts the PlayScene.
* PlayScene (PlayScene.js): Main game logic including handling bamboo, bombs, scoring, and difficulty levels.

## Credits
* Ryan Cardoso Lopes
* Filomeno Antunes
* Alejandro Balboni

## Acknowledgements
We'd like to thank Volker Müller for his guidance and support throughout this project.

Enjoy playing Quiz Samurai!