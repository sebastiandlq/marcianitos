# Marcianitos Game
A game made in HTML, CSS and javascript vanilla.
A kind of a copy of Space Invaders. 
You control your ship with the A,D, Left Arrow, Right Arrow and buttons on the side of the game screen; and shoot with W, Space, Up Arrow or the button below the game screen. Your objective is to destroy all the aliens who will also shoot at you, if you're shot 5 times, you die and the game is over.

The game is made using the canvas label in HTML. All the codes are inside the "scripts" folder, and the main file is "main.js". It uses the requestanimationframe() to update frame by frame the game, and inside has two important functions update and draw, update is in charge of the logic of the game, and draw is in charge of drawing in the canvas every object of the game. Every object in the game has a cordinate(x and y), a width and heigth and an update and draw function. "player.js", "enemy.js" and "shots.js" are object files. But the enemies and shots are only class templates. "enemyGroup.js" is in charge of creating the group of enemies and controlling their behaivor as a group. "input.js" is in charge of telling wich button is the user pressing and if the player object should move and in what direction. And "collisions.js" has a function that evaluates if two objects are hitting each other.

For creating the game I used as a reference this video https://www.youtube.com/watch?v=QTcIXok9wNY 

If you want to try the game is in 
https://sebastiandlq.github.io/marcianitos/
