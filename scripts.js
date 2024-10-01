const block = document.getElementById('block');
const hazard = document.getElementById('hazard');
const startWindow = document.getElementById('startWindow');
const startButton = document.getElementById('startButton');
const endWindow = document.getElementById('endWindow');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('Score');


//Score counter set up
let score = 0;
let scoreInterval;
let isAliveInterval;

//Formatting score as '00000'
function formatScore(num) {
    return num.toString().padStart(5, '0');
}

//Score incrementation
function startScoreCounter() {
    scoreInterval = setInterval(function(){
        score++;
        document.getElementById('score').textContent = formatScore(score);
    }, 100); //Runs in centiseconds
}

//Reset the game
function resetGame () {
    //Reset score
    score = 0;
    scoreDisplay.textContent = formatScore(0);

    //Reset block and hazard
    block.classList.remove('jump');
    block.style.display = 'block';
    hazard.style.display = 'block';
    hazard.style.animation = "moveHazard 1s infinite linear";

    //Reset score counter
    clearInterval(scoreInterval);
    startScoreCounter();

    // Restart collision detection
    startCollisionDetection();

}

function startCollisionDetection () {
    isAlive = setInterval(function (){
        //get current block Y position
        let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
        
        //get current hazard  x position
        let hazardLeft = parseInt(window.getComputedStyle(hazard).getPropertyValue("left"));
    
        //detect collision
        if(hazardLeft <200 && hazardLeft >150 && blockTop >= 250) {
            endGame();
        }
    }, 10)
}

//End game and show end screen
function endGame () {

    //Stop animations and clear score
    clearInterval(isAlive);
    clearInterval(scoreInterval);

    //Fade in end screen
    endWindow.style.animation = 'fadeIn 2.5s linear forwards';
    endWindow.style.visibility = 'visible';
    
    //Fade in restart button
    restartButton.style.animation = 'fadeIn 2.5s linear forwards';
    restartButton.style.visibility = 'visible';
    
   //Reset jump class in case block is mid air
   block.classList.remove('jump');

   //Fade out block and hazard
   block.style.animation = 'fadeOut 0.3s linear forwards';
   hazard.style.animation = 'fadeOut 0.3s linear forwards';
}            

//Jump function
function jump() {
    //if statement checks there is no jump so not starting over midjump
    if (block.classList != "jump") {
        block.classList.add("jump");

        //adding a timeout to remove jump class so can jump again
        setTimeout(function (){
            block.classList.remove("jump");
        }, 300)
    }
}

//Start window and start button fade in on game screen
startWindow.style.animation = 'fadeIn 2.5s linear forwards';
startButton.style.animation = 'fadeIn 2.5s linear forwards';

//When start button is pressed start window and button fade out and block fades in
startButton.addEventListener('click', function() {
    //fade out start window and button
    startWindow.style.animation = 'fadeOut 0.5s linear forwards';
    startButton.style.animation = 'fadeOut 0.5s linear forwards';

    //Show hazard and block when button is clicked

    /*need to revise to only fade in block and have hazard start moving after 
    time lapses issue is when use fade in animation jump function stops working 
    need to debug*/
    hazard.style.display = 'block';
    block.style.display = 'block';

    //function that after score gets to 20, hazard starts to come in

    hazard.style.animation = 'moveHazard 1s infinite linear';
    //block.style.animation = 'fadeIn 2.5s linear forwards';

    //Start score counter and collision detection
    startScoreCounter();
    startCollisionDetection();
});

//Restart game when button is clicked
restartButton.addEventListener('click', function(){
    //Hide end window and restart button
    endWindow.style.animation = 'fadeOut 0.5s linear forwards';
    restartButton.style.animation = 'fadeOut 0.5s linear forwards';

    block.style.animation = 'fadeIn 0.3s linear forwards';
    hazard.style.animation = 'fadeIn 0.3s linear forwards';

    hazard.style.animation = 'moveHazard 1s infinite linear';

    //Call reset function
    resetGame();
})

document.addEventListener("keydown", function (event){
    jump();
})