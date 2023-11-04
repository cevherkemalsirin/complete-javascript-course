'use strict';

/*
document.querySelector(".message").textContent = "You have won 🎉";

document.querySelector(".number").textContent = 13;

document.querySelector(".score").textContent = 100;

document.querySelector(".guess").value = 100;

*/

const START_SCORE = 20;

let randomNum = GetRandomNumber(20);

let startScore = START_SCORE;

let highScore = 0;


function GetRandomNumber(num) 
{
    return Math.trunc(Math.random() * num) + 1;
}


function Reset()
{
    randomNum = GetRandomNumber(20);
    startScore = START_SCORE;
    document.querySelector(".score").textContent = startScore;
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = '';
}

document.querySelector(".again").addEventListener("click",Reset);

function WonGame()
{
    document.querySelector(".message").textContent = "Correct Number 🎉";
    if(highScore < startScore)
    {
        highScore = startScore;
        document.querySelector(".highscore").textContent = highScore;
    }

    //css manipulation
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = randomNum;
   
}



document.querySelector(".check").addEventListener("click", function()   { 
    const guess = Number(document.querySelector(".guess").value);

    let message = document.querySelector(".message").textContent;

    if(!guess)
    {
        document.querySelector(".message").textContent = " No Number is Given! 🤢";
    }
    else if(guess === randomNum)
    {
        WonGame();
    }
    else
    {
        if(startScore > 0)
            {
                if(guess > randomNum)
                    document.querySelector(".message").textContent = "Wrong 🤢. Go lower";
                else
                    document.querySelector(".message").textContent = "Wrong 🤢. Go Higher";

                startScore--;
            }
        else
        {
            document.querySelector(".message").textContent = "You lost the game 🤢";
        }
    }
    document.querySelector(".score").textContent = startScore;
})