## Hackie Chrome Dino

In this chapter you will be learning how to kinda what we call "hack" (but its not) the [Chrome://Dino](chrome://dino) Game -- A Mini Game In Google Chrome browser, You may trigger it by going offline or just goto `chrome://dino` in chrome browser.

#### Alright, Now Let's Get Into It !

1. Open The Dev Tools ( F12 )
2. Get To Console
3. Type `Runner.instance_.gameOver = function(){}` and hit enter ( important : read `*` )
4. Now Click The Dino Or Press Space And You Will See The Game Will Never End Even If You Hit An obstacles.

#### Now Let Me Explain What Just Happened 

So, when you run the code `Runner.instance_.gameOver = function(){}` you basically just set the game over function into nothing. Which means everytime you hit an obstacles like cactus, it will automatically run `Runner.instance_.gameOver` and the game over. 

#### Now Let's Make It Even Hackier 

Again, Open The Dev Tools And Get To Console ( if you closed ) and Run `Runner.instance_.setSpeed(100)`. You Can Set Any Value Inside `()`. This Code Will Actually Make The Dino Run Faster As The Number You Set Higher.

#### Important 

* : Run `const original = Runner.instance_.gameOver` before you run `Runner.instance.gameOver = function(){}`. So with this code you create a variable that saves the original `gameOver()` function. If you want to recover back the game, just run `Runner.instance_.gameOver = original` and everything is back to normal ! ( or you can just close and open the page )
