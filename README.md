Background
My project is a top-down 2D game that receives keyboard inputs from the user. The user uses WASD or the arrow keys to control a player character and navigate a pre-determined map filled with obstacles and enemies. The game's camera will follow the player's movements around the map. The map is pre-loaded with obstacles and entities, but more enemies will be dynamically created and destroyed during gameplay. The player character gains experience points and chooses from a random selection of new abilities when they collect enough experience points. The player loses the game when they run out of health points. The player's score is determined by how long they survive on the map. The game's genre is action-idle (not unlike Vampire Survivors and Brotato).


Functionality & MVPs
In outRun, users will be able to:

Freely explore a map with WASD.
Collide with other entities on the map via a hitbox.
Automatically attack nearby enemies with character abilities.
Lose health points upon colliding with enemies and gain experience points when enemies are defeated.
Choose from a random selection of character upgrades upon level up.
Load at least two different maps from the main menu that each dynamically generate enemies.


In addition, this project will include:

A visually appealing main menu with character customization functionality.
Music that can be muted or adjusted.
A pause menu with quit and restart functionality.
A README that gives context for users unfamiliar with the game.


Wireframes
https://wireframe.cc/icylla
![Picture of wireframe](relative%20./wireframe.png?raw=true "Wireframe")


Technologies, Libraries, APIs
The game renders in Canvas and its logic is handled by Node in the browser. It uses webpack to handle file dependencies. All visible entities will render with a free, public access sprite image from https://spritedatabase.net/. The game will (tentatively) use matter.js from https://brm.io/matter-js/ to handle the physics of object collisions.

Implementation Timeline
Friday Afternoon & Weekend
Allow for user keyboard input to move character. Create entity collision detection that prevents player movement. Set up basic background image for the map. Adjust canvas height and width if necessary. Switch from setInterval() to requestAnimationFrame() if necessary. Install babel and sass dependencies.

Monday
Create enemy class. Create enemy generation functionality. Give enemies basic AI to pursue player character. Allow enemies to damage player health. Create ability class. Allow player abilities to automatically damage enemies. Reward player with experience as enemies are defeated.

Tuesday
Create event class. Create levelUp event. Create more abilities that player can add to their player character on level-up. Tweak enemy count, health points, and number of environment objects to make game challenging.

Wednesday
Give player character and enemies sprites. Create mainMenu event. Give background an image that reflects environment collision boxes. Create pauseMenu event. Implement background music that is toggleable.

Thursday Morning
Deploy to GitHub pages and create production README.