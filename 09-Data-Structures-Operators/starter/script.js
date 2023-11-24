'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*
//object desructing

const {name, openingHours, categories} = restaurant;

console.log(name,openingHours,categories); 

//if we wanted to have different variables

const {name: restuarantName, openingHours: hours, categories: tags} = restaurant;

console.log(restuarantName,hours,tags);  

//default parameters for the safe net for undefined things

const {menu:MissingMenu = [], starterMenu:starters = []} = restaurant;

console.log(MissingMenu, starters); 


//nested objects

const {fri:{open,close}} = openingHours;

console.log(open,close);

*/

/*
SECTION 1

//destructing an array
const arr = [2,3,4];

const [a,b,c] = arr;

console.log(a,b,c); // 2 3 4

//just take first 2 
const [first,second] = restaurant.categories;

console.log(first,second); 


//take first one and 3rd one and skip second
let [x, , z] = restaurant.categories;

console.log(x,z);

//swap variables 

[x,z] = [z,x];
console.log(x,z);

//nested array destructing

const nested = [2,4,[3,5]];

const [i, ,[k,l]] = nested;

console.log(i, k , l); //2 3 5

*/


/*
... spread operator

only used in places where variables seperated by ,  (ex: function parameters,
  arrays etc.)

gets whole arrays variables put them out



  
const array1 = ["cevher", "kemal", 23];
const array2 = ["male",...array1]; // paste array variables here

console.log(array2);

console.log(...array2);

const newMenu = [...restaurant.mainMenu, "kavurma"];
const mainMenuCopy = [...restaurant.mainMenu] //shallow copy

//merge 2 arrays

const menu = [...newMenu,...mainMenuCopy];

console.log(...menu);


//spread operators work on all iterables not only with arrays
//strings, maps, sets and objects(not iterable)

const str = "jonas";

const letters = [...str];

console.log(letters); 

const newRestuarantObject = {founded:1923 , ...restaurant, founder: "cevher"}; // coppied shallow copy

console.log(newRestuarantObject);

*/

//REST OPERATOR 

/*
rest operator makes the opposite of spread operator. Packs variables together

*/
/*
const arr = [1,2,...[3,4]]; //spread because right hand side of = operator

const [a,b, ...others] = [1,2,3,4,5]; // right side of operators so rest

console.log(others); // array [3,4,5]

//for objects

const {sat, ...weekdays} = restaurant.openingHours;

console.log(weekdays); // object with fri and thursday

//functions

function Add(...others)
{
  let total = 0;
  for(let i = 0; i<others.length; i++)
  {
    total += others[i];
  }

  return total;
}

console.log(Add(1,2,34,5,3));

const x = [2,3,4];
console.log(Add(...x)); // using spread operator to pass into rest operator

*/


//In JS || operator dont only return boolean but any data type and use any data type
/*
console.log(3 || "cevher"); // in c++ returns 1 but in js 3. If it is true returns first value

console.log("" || "cevher"); //returns cevher since "" false

console.log(true || 0); //returns true

console.log(undefined || null); //both is false so returns null

console.log(0 && "cevher"); //returns the first false value or last true value if all true
*/

//  ?? operator it is like || but doesnt fail at 0 but null and false



// Coding challange 1:


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.14,
    team2: 6.5,
  },
};


/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (above). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

/*
//1)
//const Bayern_players = game.players[0];
//const Dortmund_players = game.players[1];
//or
const [Bayern_players,  Dortmund_players ] = game.players;
const [goalkeeper, ...fieldPlayers] = Bayern_players;
const allPlayers = [...Bayern_players, ...Dortmund_players];
const players1Final = [...Bayern_players, 'Thiago', 'Coutinho','Perisic'];
const {team1, x:draw, team2} = game.odds;

function printGoals(...players)
{
  console.log(players);
}


--------------------------------------------------------------------------

*/


/*
//------------------------------------------------------
// For of loop, it is like foreach in c++, foreach in js takes a function

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for(const food of menu)
{
  console.log(food); 
}

//if we want to get an index when can get menu as an array with an index

for (const food of menu.entries())
{
  console.log(food[0]); // 0 to six
  console.log(food[1]); // menus
} 

//even better with array destruction

for (const [index, food] of menu.entries())
{

  console.log(index, " is menu = " ,food);
}

//looping objects

//for keys object.key(obj) gets key , object.value(obj) gets values, 
//object.entries(obj) which gets array with key and value



*/



//Challange 2

/* -----------------------------------------------------------------
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console 
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

//1)
/*
for(const [index , player ] of game.scored?.entries() ?? console.log(" there is no score. "))
{
  console.log(`${player} is scored ${index + 1}`);
}  

//2)
let average = 0;
const odds = Object.values(game.odds);
for( const odd of odds)
{
  average += odd;
}

console.log(average / odds.length);

//3)
for(const [team,odd] of Object.entries(game.odds))
{
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(teamStr + " odds are " + odd); 
} 

//4)
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
*/


//SETS

/*

sets are unique collection of data. You can not receive a single member from it but it is
useful when you need to remove dublicates
Methods are: add, clear, has, delete and size
*/

/*
const setArray = ["cevher", "kemal","sirin","cevher","ekmek"];

const newset = new Set(setArray); // can take array

console.log(newset); //removed duplicate cevher
console.log(newset.has("cevher")); // true
newset.delete("kemal");
newset.add("kurek");
console.log(newset.size); //4
//using spread operator to create new array from set

let uniqueArray = [2,3,3,3,4,5,4,4,2,2,6];
uniqueArray = [...(new Set(uniqueArray))];
console.log(uniqueArray);  //2 3 4 5 6
*/


//MAPS


/*
in objects, keys are always strings. In map a key can be any type.
*/

/*

const mapEx = new Map();

mapEx.set("key", 33);
mapEx.set(1,33).set("eric", [2,3]); //set returns the current map.
mapEx.delete("eric");
mapEx.has("key");
console.log(mapEx); 


// You can initiate maps like this: 

const questMap = new Map([["question", " What is the best food ? "],
                         [1," manti"],
                         [2, " durum"],
                         [3," sutlac"],
                         [true, " that is correct."],
                         [false, " that is not correct."]]);

//you can get a map from an object.entiries 
const entryEx = new Map (Object.entries(restaurant.openingHours));

console.log(questMap.get("question"));
for(const [key,value] of questMap)
{
  if(typeof key === 'number')
  {
    console.log(key + value);
  }
} 
const answer = Number(prompt("Please enter an answer! "));
console.log(questMap.get(answer === 3));



maps are faster than objects and sets are faster than arrays. Use maps if you want 
to key value releationship. Use objects if you use function in them or reading from json file since it is formatted for json
*/


//Challange 3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
/*
//1)
const eventArray = [...new Set(gameEvents.values())];
console.log(eventArray);

//2)
gameEvents.delete(64);

//3)
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

//4)
for(const [min,event] of gameEvents )
{
  let str = "";
  min <=45 ? str = "[First Half]" : str ="[Second Half]";
  console.log(`${str} ${min} : ${event}`);
}

*/


//CHALLANGE 4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener("click", function() {

  let textBoxString = document.querySelector("textarea").value;
  let textArray = textBoxString.split("\n");
  for (let [index,text] of textArray.entries())
  {
    text = text.trim();
    text = text.replaceAll("_", "");
    console.log(text.padEnd(20) + "  " + "✅".repeat(index + 1));
  }

});
*/

//---------------------------------------------------------------------------

// String Methods Practice 
//Convert below text to given text in comments

const flightsEx =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const lineArray = flightsEx.split("+");
let infoTxt, fromTxt, toTxt, hourTxt;
for(const line of lineArray)
{
  let cleanTxt = "";
  [infoTxt,fromTxt,toTxt,hourTxt] = line.split(";");
  infoTxt = infoTxt.replaceAll("_"," ");
  infoTxt.includes("Delayed") ? cleanTxt =+ "⚠️" : cleanTxt = "";

  fromTxt = fromTxt.slice(0,3).toUpperCase();
  toTxt = toTxt.slice(0,3).toUpperCase();

  hourTxt = hourTxt.replace(":", "h");

  cleanTxt = `${infoTxt} from ${fromTxt} to ${toTxt} (${hourTxt})`;

  console.log(cleanTxt); 
}


