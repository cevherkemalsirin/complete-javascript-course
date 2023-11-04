'use strict';

const btnRollDice = document.querySelector(".btn--roll");
const btnHoldDice = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const player1Current = document.querySelector("#current--0");
const player2Current = document.querySelector("#current--1");
const player1El = document.querySelector(".player--0");
const player2El = document.querySelector(".player--1");
const player1Name = document.querySelector("#name--0");
const player2Name = document.querySelector("#name--1");
const player1Score = document.querySelector("#score--0");
const player2Score = document.querySelector("#score--1");


player1Score.textContent = 0;
player2Score.textContent = 0;

let isPlayer1 = true;
let gameOver = false;
const WIN_SCORE = 100;

function NewGame()
{
    player1Current.textContent = 0;
    player2Current.textContent = 0;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    gameOver = false;
    isPlayer1 = true;
    player1Name = "PLAYER 1";
    player2Name = "PLAYER 2";
    player1El.classList.toggle("player--active");
    player2El.classList.toggle("player--active");
}

function Bust()
{
    //score is 0;
    isPlayer1 ? player1Current.textContent = 0 : player2Current.textContent = 0;
    SwapPlayer();
}

function ShowDice(diceNum)
{
    let sourceText =  "./dice-"+ diceNum + ".png";
    document.querySelector(".dice").src =  sourceText;
}

function CheckWin()
{
    if(+player1Score.textContent >= WIN_SCORE) 
    {
        player1Name.textContent = "PLAYER 1 HAS WON";
        gameOver = true;
    }
    else if(+player2Score.textContent >= WIN_SCORE)
    {
        player2Name.textContent = "PLAYER 2 HAS WON";
        gameOver = true;
    }
}

function Hold()
{
    if(!gameOver)
    {
        if(isPlayer1)
        {
            player1Score.textContent = Number(player1Current.textContent) + Number( player1Score.textContent);
        }
        else
        {
            player2Score.textContent = Number(player2Current.textContent) +  Number(player2Score.textContent);
        }

        CheckWin();
        Bust();
    }
}

function RollDice()
{
    if(!gameOver)
    {
        let diceNum = Math.trunc(Math.random() * 6) + 1;
        ShowDice(diceNum);

        if(isPlayer1)
        {
            player1Current.textContent = Number(player1Current.textContent) + diceNum;
        }
        
        else
        {
            player2Current.textContent = Number(player2Current.textContent) + diceNum;
        }
        
        if(diceNum === 1)
        {
            Bust();
        }
    }
}

function SwapPlayer()
{
    isPlayer1 = !isPlayer1;
    player1El.classList.toggle("player--active");
    player2El.classList.toggle("player--active");
}


    btnRollDice.addEventListener("click",RollDice);
    btnHoldDice.addEventListener("click",Hold);
    btnNewGame.addEventListener("click",NewGame);


