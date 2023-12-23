'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
let currentUser = {};
let timer;

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const GetCurrentDate = function(isHourIncluded = false)
{
    const nowDate = new Date();
    const dateObject = {
      year: nowDate.getFullYear(),
      month: nowDate.getMonth() + 1,
      day: nowDate.getDate(),
    };
    if(isHourIncluded)
    {
      dateObject.Hour = nowDate.getHours(),
      dateObject.min = nowDate.getMinutes(),
      dateObject.second = nowDate.getSeconds()
    }
    return  dateObject;
}

const FormatDate = function(date)
{
  const option = {
    day:"2-digit",
    month:"2-digit", 
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit"
  }
  return new Intl.DateTimeFormat(currentUser.locale,option).format(date);
}

//countDown 



const StartCountDown = function()
{
  let countdown = 120;
  function timer()
  {
    let min = Math.trunc(countdown / 60);
    let second = countdown % 60;
    labelTimer.textContent = `${min}`.padStart(2,"0")+":"+`${second}`.padStart(2,"0");
    countdown--;

    if(countdown === 0)
    {
      clearInterval(tick);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
  };


  timer();
  const tick = setInterval(timer,1000);
  //to stop from outside
  return tick;
  
}


const FormatCurrency = function(money)
{
  const option = {
    style:"currency",
    currency:currentUser.currency, 
  }
  return new Intl.NumberFormat(currentUser.locale,option).format(money);
}

const DisplayMovements = function(movements)
{
  //empty the container text
  containerMovements.innerHTML = "";
 
  movements.forEach((movement, index )=> {
    const transactionType = movement >= 0  ? "deposit" : "withdrawal";
    const HTML = `
    <div class="movements__row">
          <div class="movements__type movements__type--${transactionType}">${index + 1} ${transactionType}</div>
            <div class="movements__date">${FormatDate(new Date(currentUser.movementsDates[index]))}</div> 
          <div class="movements__value">${FormatCurrency(movement)}</div>
        </div>
    `
    /*beforebegin : before the element
      afterbegin : after the element but in the begining
      beforeEnd : after the element but before the end
      afterend : after the element 
    */
    containerMovements.insertAdjacentHTML("afterbegin", HTML);
  });

}


/*Reduce method makes an array into a variable. Can be used to find max, min, total, etc. 
Parameters are : call back function and accumulator default value
Callback function params : acamulator, current, index, array.
*/
// function to show current balance  on the account

const CalculateBankBalance = function(currentAcc)
{
  currentAcc.totalBalance = currentAcc.movements.reduce((acum, movement) => {
    return acum + movement;
  }, 0);

  labelBalance.textContent = `${FormatCurrency(currentAcc.totalBalance)}`;
}


//function to display in, out and interest
const DisplaySummary = function (currentAcc)
{
  // display income
  const income = currentAcc.movements.filter((movement)=> movement > 0).
  reduce((accum,movement) => accum + movement,0);
  labelSumIn.textContent = `${FormatCurrency(income)}`;
  //display outgoing
  const outgoing = currentAcc.movements.filter((movement)=> movement < 0).
  reduce((accum,movement) => accum + movement,0);
  labelSumOut.textContent = `${FormatCurrency(Math.abs(outgoing))}`;
  //take interest rate as 1.2
  const interest = currentAcc.totalBalance * currentAcc.interestRate / 100;
  labelSumInterest.textContent = `${FormatCurrency(interest)}`;
}


function LoadAccount(account)
{

  DisplayMovements(account.movements);
  CalculateBankBalance(account);
  DisplaySummary(account);
}



btnLogin.addEventListener("click", function(e) {
  e.preventDefault();//buttons that are created under forms, default behaviour is refresh pages
  currentUser = accounts.find((acc) => inputLoginUsername.value === acc.username);
  inputLoginUsername.value = inputLoginPin.value ="";
  inputLoginUsername.blur();
  inputLoginPin.blur();
  if(currentUser && currentUser.pin === currentUser.pin)
  {
    labelWelcome.textContent = `${currentUser.owner.split(" ")[0]} Welcome, Have a Nice Day!`
    LoadAccount(currentUser);
    containerApp.style.opacity = 1;
    labelDate.textContent = FormatDate(new Date());
    if(timer) clearInterval(timer); 
   timer = StartCountDown();
  }
  else
  {
    alert("PIN or Username is wrong!");
  }
});

btnTransfer.addEventListener("click", function(e)
{
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferAccount = accounts.find((acc) => acc.username === inputTransferTo.value);

  if(transferAccount && amount <= currentUser.totalBalance && !isNaN(amount))
  {
    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferAmount.blur();
    inputTransferTo.blur();
    currentUser.movements.push(-amount);
    transferAccount.movements.push(amount);
    currentUser.movementsDates.push((new Date()).toISOString());
    LoadAccount(currentUser);
    console.log("money sent");
  }
  else
  {
    console.log("Money cant send");
  }



});


btnClose.addEventListener("click", function(e)
{
  e.preventDefault();
  if(inputCloseUsername.value === currentUser.username && Number(inputClosePin.value) === currentUser.pin)
  {
    
    inputClosePin.value = inputCloseUsername.value = "";
    inputClosePin.blur();
    inputCloseUsername.blur();
    containerApp.style.opacity = 0;
    //now delete account
    console.log(accounts.findIndex((acc)=> acc.username === currentUser.username));
    accounts.splice(accounts.findIndex((acc)=> acc.username === currentUser.username),1);
  }
  else
  {
    console.log(inputCloseUsername.value, currentUser.username, inputClosePin,currentUser.pin );
  }

}
);

//taking loan. If any one of the movement is bigger than  10% of the loan amount you can take a loan

btnLoan.addEventListener("click", function(e)
{
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
  if(currentUser.movements.some((mov) => mov > amount * 0.1) && amount > 0)
  {
    currentUser.movements.push(amount);
    LoadAccount(currentUser);
  }


});

//sorting the list. One click sorts from bigger to low. One more click reverse back.
let sorted = false;
btnSort.addEventListener("click", function(e)
{
  console.log(currentUser.movements);
  e.preventDefault();
  const sortedMovements = [...currentUser.movements];
  sortedMovements.sort((a,b) => b-a);
  sorted ?  DisplayMovements(currentUser.movements): DisplayMovements(sortedMovements);
  sorted = !sorted;
  console.log("sorted is ",sorted);
  console.log(currentUser.movements);
});


//Usernames needed to be created out of initals of first and last name

const CreateUsernames = function(accounts)
{
  accounts.forEach(account => {
      account.username = account.owner.split(" ").map((word)=>word[0]).join("").toLowerCase();
      let name = "cevher";
    });
}
CreateUsernames(accounts); 


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
In javascript all numbers presented as floating point numbers.

*/

//numeric sperators

//hard to read number
const diemeter = 287460000000; 
//we can write it like this. JS engine will ignore underscore
const diemeter2 = 287_460_000_000;
const priceCents = 354_99;

//bigInt, is a big number data,
//max value in js is 
console.log(2 ** 53 - 1);
//or
console.log(Number.MAX_SAFE_INTEGER);

//we can write bigger numbers as like this
const bigNum = 2483259193249134929149129313n;
console.log(bigNum);
//or
console.log(BigInt(48384302));
//you cant make bigint and normal int operations but can use compare operators

/*

// Create a date

const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0)); // gives 1970
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 1970 + 3 days


// Working with dates
//starts with year, month day hour min secs
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); //gets the day
console.log(future.getDay()); // gets the day in a week, sunday start with index of 0
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // makes date in a packed version
// gets the time passed since 1970 in miliseconds
console.log(future.getTime());
//gets miliseconds since 1970
console.log(Date.now());

*/

console.log(new Date("2020-07-26T12:01:20.894Z"));

//console.log(+new Date()) nad console.log(new Date()) one gives miliseconds one gives date.
//operations between dates make in miliseconds. 
console.log(new Date() - new Date("2020-07-26T12:01:20.894Z"));


//SetTimeout and setInterval
/*
SetTimeOut works once , after given seconds. SetInterval works in intervals forever unless being stopped
*/

//After 5 seconds reveal baby gender, After miliseconds every parameter is also function parameter
/*
const revealGender = setTimeout((text) => { 
  const gender = Math.trunc(Math.random() * 2) === 0 ? "boy! " : "girl! "; 
  console.log(text+gender);
  
});

//to run function over and over again we use set interval

const clock = setInterval(() => {
  const date = new Date();
  const time  = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  console.log(time);
}, 1000);

//to stop we use clearInterval or to use settimeout clearTimeout
setTimeout(() => {
  clearInterval(clock);
}, 5000);

*/