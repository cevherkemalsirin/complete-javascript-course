'use strict';
//if the message was an id we would use #message
//returns html element as an object
document.querySelector(".message");
//to get text from this element 
document.querySelector(".message").textContent;

/*document is a special object that we have access in js. It 
 serves as an entry point to the DOM

 DOM is not a part of JS it is part of a WEB API


 document.querySelector(".number").textContent = 23;
 document.querySelector(".score").textContent = 100;
 document.querySelector(".guess").value = 100;
*/
const INITAL_SCORE = 20;
let secretNumber = Math.trunc((Math.random() * 20)) + 1;
let score = INITAL_SCORE;
let highScore = 0;

function UpdateInfo(message, decrecementNum = 1)
{
    document.querySelector(".message").textContent = message;
    score -= decrecementNum;
    document.querySelector(".score").textContent = score;
}

function ResetGame()
{ 
    score = INITAL_SCORE;
    secretNumber = Math.trunc((Math.random() * 20)) + 1;
    document.querySelector(".message").textContent = "Start Guessing...";
    document.querySelector(".number").textContent = "?";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".guess").value = "";
    document.querySelector(".score").textContent = "20";
    document.querySelector("body").style.backgroundColor = "#222";
}

function WinGame()
{
    document.querySelector(".message").textContent = "You Found it";
    document.querySelector("body").style.cssText = "background-color: green;";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    if(highScore < score)
    {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
    }
}

function LoseGame()
{
    UpdateInfo("Game is Over!");
    score = 0;
}


document.querySelector(".again").addEventListener("click",ResetGame);
document.querySelector(".check").addEventListener("click",function()
{
    const guess = Number(document.querySelector(".guess").value);

    if(score)
    {
        if(!guess)
        {
            UpdateInfo("⛔ No Number!",0);
        }
        else if(guess > secretNumber)
        {
            UpdateInfo("Too Big");
        }
        else if(guess < secretNumber)
        {
            UpdateInfo("Too Small");
        }
        else if (guess === secretNumber)
        {
            WinGame();
        }

    }
    else
    {
        LoseGame();
    }
  
} 
);
