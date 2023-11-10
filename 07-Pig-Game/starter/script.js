'use strict';

const player1name = document.querySelector("#name--0");
const player2name = document.querySelector("#name--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const P1score = document.querySelector("#score--0");
const P2score = document.querySelector("#score--1");
const P1currentScore = document.querySelector("#current--0");
const P2currentScore = document.querySelector("#current--1");
const dieImage = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

const MAX_SCORE = 100;

let score = 0;


RestartGame();


function isPlayer1()
{
    return player1.classList.contains("player--active");
}

function ChangePlayer()
{
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
}

function ChangeDieImg(num)
{
    dieImage.src = 'dice-${num}.png';
}

function RollDice()
{
    let randomDie = Math.trunc(Math.random() * 6) + 1;
    ChangeDieImg(randomDie)
    if(randomDie !== 1)
    {
        score  += randomDie;
        isPlayer1() ? P1score.textContent = score : P2score.textContent = score;
    }
    else
    {
        score = 0;
        isPlayer1() ? P1score.textContent = 0 : P2score.textContent = 0;
        ChangePlayer();
    }

}

function HoldScore()
{
    if(isPlayer1())
    {
        P1currentScore.textContent = Number(P1currentScore.textContent) + Number(P1score.textContent);
        P1score.textContent = 0
    }
    else
    {
        P2currentScore.textContent = Number(P2currentScore.textContent) + Number(P2score.textContent);
        P2score.textContent = 0;
    }
      CheckWin();
      score = 0;
      ChangePlayer();
}


function CheckWin()
{

    if(Number(P1currentScore.textContent) >= MAX_SCORE || Number(P2currentScore.textContent) >= MAX_SCORE )
    {
        if(isPlayer1())
        {
            player1name.textContent += " WON!";
        }
        else
        {
            player2name.textContent += " WON!";
        }

        rollBtn.removeEventListener("click", RollDice);
        holdBtn.removeEventListener("click", HoldScore);
    }

}

function RestartGame()
{
    player1name.textContent = "PLAYER 1";
    player2name.textContent = "PLAYER 2";
    score = 0;
    P1score.textContent = "0";
    P2score.textContent = "0";
    P1currentScore.textContent = "0";
    P2currentScore.textContent = "0";
    dieImage.src = "dice-1.png";
    rollBtn.addEventListener("click", RollDice);
    holdBtn.addEventListener("click", HoldScore);
}

    newBtn.addEventListener("click", RestartGame);