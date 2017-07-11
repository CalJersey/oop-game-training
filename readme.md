<!--
Creator: <Name>
Location: SF
-->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

### User Stories & Game Mechanics
1. Game requires a minimum of 2 players. Maximum TBD.
2. Users, in order from 1-n will be able to enter their name, choose their "action Key" and choo,e a car from pre-determined set of cars.
2. Cars will line up vertically at right side of screen.
3. At the top of screen a traffic light will appear showing red.
4. Timer will appear in/on/around traffic light, starting from 5
4. When timer reaches 0, traffic light will turn green and GO! will appear on screen and disappear when first user hits their action key.
5. New timer will be instatiated for Traffic light with max interval of 2 seconds, countdown will not show, when timer reaches 0 light will change color and new countdown will start. 
6. While the light is green players need to press their key as quickly as possible. Speed will only increase for individual keypresses, not if key is held down;
7. Each key press will increase their vehicles speed by TBD increment. Speed will be measured in pixels/second. Base speed
  TBD. 
8. Randomly the traffic light will switch to Red for between 10 milliseconds to 2 seconds.
9. While the light is red, the vehicle of any player who presses his key will decrease in speed by progressive amounts which
  increase with each keypress cycle (1st red: -2, 2nd red: -4, 3rd red: -6, 4th red: -8, etc.). Speed cannot be less than 0.
10. First car to reach finish line (Pixels from start line: TBD) wins.
11. Winner's name is displayed flashing in center of screen. Confetti animation. Button appears for New Game.

### Data Structures for "Race" (Independent Practice)
Let's consider object types Player, Car, Timer, StopLight, Race, actionKey
1. Player:
-name (str),
-playerNumber (number),
-car (obj) car obj instance
-isWinner() (function - return boolean winner or no)
-actionKey (obj) Key obj instance

2. Car
-Image (Str) relative path to image file
-speed (number) 
-increaseSpeed(units) - function increase speed property by n units
-decreaseSpeed(units) - function decrease speed property by n units

3. Timer
-StartValue(val) (number) count down from val
-isCounting (boolean) timer running down
-Start (function) begin counting down
-isExpired (boolean) Done Counting
-Expire (function) set isExpired = true
-setVal(max,setMax) determine value of countdown StartValue (seconds), must be <= max. if setMax = 1 then StartValue = max;
-AutoRestart (boolean) default = false; whether timer should start over when it expires

4. StopLight
-isGreen (boolean) is light color === green
-isRed (boolean) is light color === red
-setColor(color) set color = color
-timer (obj) timer object (max = 3, setMax = 0)
-displayCountDown (boolean) should stoplight display countdown timer

5. Race
-numCars (number) number of cars >=2 <=4;
-winner (car) car that won
-startLight (obj StopLight) (setColor(Red), type = traffic, timerObj.max = 5, timerObj.setmax = true)
-speedLight (obj, Stoplight (setColor(green), type = single, timerObj.max = 2, timerObj.AutoRestart = true;
-isRunning (boolean) is race currently in progress

6. ActionKey
-charCode - Ascii code for key
-EventListeners (leverage built in JS event listeners)

Work with a partner to list some properties and methods of cards, the game itself, and a particular pair.

* List the type of each property (number, boolean, `Card`, etc.).
* List the parameters that each method will take.
* Don't forget a constructor!

### User Stories

1. A user will be able to specify the number of players in the game, from 2-4;
  * build responsive display that can accomodate 2, 3, or 4 cars
  
2. Each user will be able to input their name and select a car.
  *User input form
  -text field for name, radio button with images for car, and 1 char text field for actionKey (must be unique bw all users)
  -onSubmit -> instatiates a new user with values chosen
  -adds users car to the display at the start line
  -cycles through users until all users are created, then displays start race button/image
  
3. User can Click on start race
  -traffic light appears showing red. 
   -countdown starts at five. 
   -At 0 light turns green. 
   -Race.isRunning = 1; Keypress events now register and increase car speed;
   -traffic light alternates bw red and green on random intervals from 0-2 seconds
   -if player hits action key while light is green car accelerates 1 unit per key press
   -if player hits action key while light is red car decreases speed at intervals describe in summary above
   -whichever car reaches finish line first wins

4. Winning car triggers user name to display in center screen in decorated text "Username Wins!". 
  -confetti effect ovver screen.
  -new race button appears- race track clears & user can begin player selection process again

###Potential Challenges / Development Questions

1. determine bw keypress and keyhold, so players cannot just hold key down to accelerate continuous
2. is JS fast and reliable enough to fairly run this game? will all eventListeners have same priority?
3. single car image or a few different ones based on speed, acceleration, in the lead, etc.
4. Track all players finish times

### Deliverable

Design user stories, data structures, development stories, and potential challenges for a **racing game** in which two players use the keyboard to control "cars" that race across the screen.

Here are some popular bonus features that would affect your data structure plan:

1. How would you make your player's "cars" use custom images?
2. Can a player type in their name to see custom win messages?
3. Can you enable a reset button to restart the race?
4. How about a win counter that spans across multiple races?

As you work, you can edit this README to add a section at the top with your name, a link to the original repository, and a 3-5 sentence reflection on completing this assignment. Push your updates to GitHub and add a link to the repo to the "My Work" section of your website!
