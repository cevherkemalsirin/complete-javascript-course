'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
let currentUser = {};

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



const DisplayMovements = function(movements)
{
  //empty the container text
  containerMovements.innerHTML = "";
 
  movements.forEach((movement, index )=> {
    const transactionType = movement >= 0  ? "deposit" : "withdrawal";
    const HTML = `
    <div class="movements__row">
          <div class="movements__type movements__type--${transactionType}">${index + 1} ${transactionType}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement}€</div>
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

  labelBalance.textContent = `${currentAcc.totalBalance}€`;
}


//function to display in, out and interest
const DisplaySummary = function (currentAcc)
{
  // display income
  const income = currentAcc.movements.filter((movement)=> movement > 0).
  reduce((accum,movement) => accum + movement,0);
  labelSumIn.textContent = `${income}€`;
  //display outgoing
  const outgoing = currentAcc.movements.filter((movement)=> movement < 0).
  reduce((accum,movement) => accum + movement,0);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;
  //take interest rate as 1.2
  const interest = currentAcc.totalBalance * currentAcc.interestRate / 100;
  labelSumInterest.textContent = `${interest}€`;
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
    LoadAccount(currentUser);
    containerApp.style.opacity = 1;
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







/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const exampleArray = ['a','b','c','d','e','f','g'];
//1) slice method does not change original array

//slice,given one parameter slices from given index until the end of the array:

console.log(exampleArray.slice(2));  //c d e f g

// minus values stars from end

console.log(exampleArray.slice(-2)); // f g

console.log(exampleArray.slice(1,5)); // b c d e 

console.log(exampleArray.slice(2,-2)); // c d e

//splice method: Splice changes the original array. Works like slice

console.log(exampleArray.splice(-2));
console.log(exampleArray);// a b c d e 

//Reverse method . Reverses array and changes original array
console.log(exampleArray.reverse());

//join method joins array into string

console.log(exampleArray.join("-")); //e-d-c-b-a;


//new "at" method

//instead of using this
exampleArray[0];
//you can use 
exampleArray.at(0);
//only difference you can get the end variable like this
console.log(exampleArray.at(-1)); //a



//forEach method: 

const positiveNumbers = [200, 450, -400, 3000, -650, -130, 70, 1300];

//note: in foreach, break and continue do not work
//note: we can use index and full aray in foreach. Just be careful parameter order
positiveNumbers.forEach(function(number, index, arr) {
  if(number < 0)
  {
    number = Math.abs(number);
  }
  console.log(`${index + 1 } is ${number} a member of ${arr}`);
})


//foreach works with sets and map, but sets have no index so its empty param

// Map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});


*/


//Challange 1:
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀



const juliaDogs = [3, 5, 2, 12, 7];
const kateDogs = [4, 1, 15, 8, 3];

function CheckDogs(dogsJulia, dogsKate)
{
  const newJuliaDog = dogsJulia.slice(1,4);
  const allDogAges = [...newJuliaDog, ...dogsKate];
  allDogAges.forEach((element, index) => {
    const dogAge = element > 3 ? "an adult" : "a puppy";
     console.log(`Dog number ${index + 1} is ${dogAge}`);
    
  });
}

CheckDogs(juliaDogs, kateDogs);
*/

//map method:
/*
takes function and creates new array with the each elements 
according to the function result foreach like function

*/

/*

const movementsUSD = [430, 1000, 700, 50, 90];
const USDtoEUR_Rate = 1.1;
const movementsEUR = movementsUSD.map((movement) => movement * USDtoEUR_Rate );

console.log(movementsEUR);

*/


//console.log("accounts are: \n", accounts);

/*
//filter method, it is like foreach but returns bool, if true, element
//is added to the new array.

const numbers = [1,24,-345,12,-54,45,-23];

const positiveNumbers = numbers.filter(number => {return number > 0;});

console.log(positiveNumbers);

*/



// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function(dogAges)
{
  let humanAges = dogAges.map((dogAge) => 
  {
      if(dogAge <= 2) 
      {
          return dogAge * 2;
      } 
      else
      {
          return 16 + (dogAge * 4); 
      }
  }
  )
  console.log(humanAges);

  humanAges = humanAges.filter((dogAge) => { return dogAge > 18;});  
  console.log(humanAges);

 const total = humanAges.reduce((acum,age)=>{return acum + age;},0);
 console.log(total / humanAges.length); 
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])); 
*/

// find method: exactly like filter method but returns the first value not array. FindIndex() it returns the index.

/*

some and every methods:

some and every takes function that checks something. Some checks if even one of them meets the condition and returns true.
every checks every single element in the array and if all of them satisfies the condition then returns true.


const exArray = [2,300,32,13,35];

console.log(exArray.some((element)=> element % 7 === 0)); //true
console.log(exArray.every((element)=> element > 0)); //true

*/

/*
const exArray2 = [2,300,32,13,35];

//sort. String arrays can be sorted without any parameter.But when you need to sort number array.
//then you need to have extra parametered function, sorting mutates the array

exArray2.sort((a,b) => a-b); // if positive swap, if negative do nothing. sorts smaller to bigger

console.log(...exArray2);   
*/

/*

///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Emprty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
*/

/*

//exercises

//1) get total of balance for every account
let total = 0;
accounts.forEach(acc => { 
  
   total += acc.movements.reduce((accum,current) => current + accum ,0)

  
});

console.log(total); 

//2) get number of deposits more than 1000

const numberOfBigDeposits = accounts.flatMap((acc) => acc.movements).filter((movement) => movement >= 1000).length;
console.log(numberOfBigDeposits); 

//3) create and object which holds sum of widhdrawls and deposits

const sumHolderObject = accounts.flatMap((acc)=> acc.movements).reduce((accum,current)=> {
    if(current > 0)
    {
       accum.deposits += current;
    }
    else
    {
       accum.withdrawl += current;
    }
    return accum;
},{ deposits:0,withdrawl:0});  

console.log(sumHolderObject); 
*/



///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//1)
dogs.forEach(dog => {
  dog.recomendedFood = Math.round(dog.weight ** 0.75 * 28 );
  console.log(dog.recomendedFood);  
}); 

//2)
const sarahDog = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(sarahDog.curFood > sarahDog.recomendedFood * 1.10 ? "Ate too much":
 sarahDog.curFood < sarahDog.recomendedFood * 0.90 ? "Ate too less" : "Ate optimum");

 //3)

 const ownersEatTooMuch = dogs.filter((dog) => dog.curFood > dog.recomendedFood * 1.10).flatMap((dog)=>dog.owners);
 const ownersEatTooLittle = dogs.filter((dog) => dog.curFood < dog.recomendedFood * 0.90).flatMap((dog)=>dog.owners);

 console.log(ownersEatTooMuch)

 //4)
  console.log(`${ownersEatTooMuch.join(" and ")} eat too much!`);
  console.log(`${ownersEatTooLittle.join(" and ")} eat too little!`);

  //5)
  console.log(dogs.some((dog) => dog.curFood === dog.recomendedFood));

  //6)
  const eatingOkey = (dog) => (dog.curFood < dog.recomendedFood * 1.1 && dog.curFood > dog.recomendedFood * 0.9);
  
  console.log(dogs.some(eatingOkey));

  //7)
  const eatingOkayDogs = dogs.filter(eatingOkey);

  //8)
  const dogsCopy = [...dogs];
  console.log(dogsCopy);
  dogsCopy.sort((d1,d2) => d2.recomendedFood - d1.recomendedFood);
  console.log(dogsCopy);








  
