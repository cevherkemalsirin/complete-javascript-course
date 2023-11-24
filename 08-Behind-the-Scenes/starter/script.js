'use strict';

//taking notes for javaScript

/*

there are 2 ways to execute programming language

1) Compilation
- entire code is converted into machine code at once. And puts out a executable file. We can execute it way later.

2) Interpretation
- code is line by line converted into to the machine code and executed right after. There is no file output. 
- it is very slow comparing to the compilation languages. JS was like this but not anymore. JS uses something else.

3) JIT (Just in time ) compilation
- entire code is converted into machine code at once. But does not put output exe file and it runs it right after the convertation.



---------------------

After compilation GLOBAL EXECUTION CONTEXT is created for top level code (code that is outside of the functions). It stores all the necessary information for 
somecode to be executed. Only one copy.

after finishing execution of GEC. Function and callbacks. Foe each function an execution context is created.

Execution Context consist of :

= let, const and var variables
= Function declarations
= argument object (parameters)
= scope chain
= this keyword

Note: Arrow functions dont have argument object and this keyword.




-------------------------------------------------

Hoisting:
Makes some type of variables accessible and usable in the code before they are actually declared. " Variables moved to the top of their scope."

function declaration => actual function 
var variables => undefined
let and const variables => no hoisting (kinda no. TDZ(temporal dead zone)) gives error if you try to access them instead of giving no error undefined variable

function expression and arrow => depends on let-const and var.

console.log(me); //undefined
console.log(job); //ref error
console.log(year); // ref error

var me = "Cevher";
let job = "survivor";
const year = 1991;



-------------
console.log(Add(2,3)); // 5
console.log(addExpr(2,3)); // ref error
console.log(addArrow(2,3)); // ref error


function Add(a,b)
{
    return a + b;
}

const addExpr = function (a,b) {return a+b;};

const addArrow = (a,b)=> a+b;



-------------------

this keyword is created for every execution context(every function). It points to the owner of the function.

    if you call objects function it points to the object.
    if you call normal function it is undefined.
    if you call event listener, this keyword points to the element.
    if you call arrow function it points to its surrounding function.


    you should not use any arrow function in the object as method.


    --------------------------

    in javascript
    all objects arrays functions are stored in heap with ref.
    primitives are stored in stack

    so when you change a copy(actually not copy) of a object you change the original one also.
*/

const jessica = {
firstname : "cevher",
lastname:"kemal",
age:24

};

const leman = jessica;

leman.age = 25; //changed all

const copy = Object.assign({}, jessica); //this is how to copy

copy.age = 300; //just a copy changes


