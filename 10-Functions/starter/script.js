'use strict';
/*

in javascript there is no pass by ref. Only pass by value. But objects
pass by ref even tho it is not called like that.

functions are objects, They have their own methods as well

higher class functions : Functions that take function as a parameter or 
return a function or both.
*/

/*
const lufthansa = {
airline: "lufthansa",
iataCode: "LH",
bookings: [],
book(flightNum, name)
{
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode} with ${flightNum}`);

    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});

},

};


lufthansa.book(239, "cevher sirin");
lufthansa.book(333, "kemal");

console.log(lufthansa); 

const eurowings  = {
    airline: "EuroWings",
    iataCode: "EW",
    bookings: [],
    //we want the same method from luthansa
}

//to be able to use the method from one object to use in another object
// and use "this" keyword of its own. We use CALL function

const book = lufthansa.book;

book.call(eurowings, 31, "osman");

console.log(eurowings.bookings);  


//Bind method:
//instead of calling function, We can bind method to the new object and 
//it returns a new function for that object only

const bookEW = book.bind(eurowings);

bookEW(23,'steven');

// also this keyword for document points to the document. For instance
lufthansa.planeNumber = 300;
lufthansa.BuyPlane = function() {
    console.log(this);
    this.planeNumber++;
    console.log(this.planeNumber);
}

document.querySelector(".buy").
addEventListener("click", lufthansa.BuyPlane.bind(lufthansa));

//without bind , this keyword would point to "buy" document object.


*/



// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*

const poll = {
    question: 'What is your favourite programming language?',
    options: ['1: JavaScript', '2: Python', '3: Rust', '4: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    GetQuestionTxt() {
        return `${this.question} \n ${this.options.join("\n")} \n (Write option number)`;
    }
};
//1)
poll.RegisterNewAnswer = function() {
    let input = -1;
    while(true)
    {
         input = prompt(this.GetQuestionTxt());
        if((input > 0 && input <= this.options.length) && !isNaN(input))
        {
            break;
        }
        else
        {
            alert("Please enter option 1-4 !!!");
        }
    }
    this.answers[input-1]++;
    DisplayResults("string");
    
}

document.querySelector(".poll").addEventListener("click", poll.RegisterNewAnswer.bind(poll));

function DisplayResults (type = "array")
{
    if(type === "string")
    {
        for(const [index,answer] of poll.answers.entries())
        {
            const [num, text] = poll.options[index].split(" ");
            console.log(`${text} has ${answer} number of votes`);
        }
    }
    else 
    {
        console.log(poll.answers);
    }
    
}


*/

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  /*
    this IIFE functions life ended right after execution but we added an 
    event listener to the body. This event listener callback function uses
    header variable which supposed to get destroyed after IIFE destruction
    but since this arrow function is created in the this function its
     variable enviroment passed using closure to this arrow function.

  */
  document.body.addEventListener("click", ()=>{header.style.color = 'blue';});

}
)();