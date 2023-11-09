'use strict';

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtns = document.querySelectorAll(".show-modal");
const closeModalBtn = document.querySelector(".close-modal");


function ToggleOverlay()
{
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}


for(let i = 0; i < openModalBtns.length; i++)
{
    openModalBtns[i].addEventListener("click",ToggleOverlay);
}

closeModalBtn.addEventListener("click", ToggleOverlay);
overlay.addEventListener("click", ToggleOverlay);

//keyboard events are globabl events so just use document
/*
keypress = holding
keydown = press
keyup = lift
*/
document.addEventListener("keydown", function(e) {
    if(e.key === "Escape" && !overlay.classList.contains("hidden"))
    {
        ToggleOverlay();
    }

});