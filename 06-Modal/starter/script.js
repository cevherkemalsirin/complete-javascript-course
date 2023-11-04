'use strict';


const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal"); //more than one element

function CloseModal()
{
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

for(let i = 0; i < btnsOpenModal.length; i++)
{
    btnsOpenModal[i].addEventListener("click",()=>{ modal.classList.remove("hidden");
    overlay.classList.remove("hidden");});
}

btnCloseModal.addEventListener("click",CloseModal);
//we need to close the message box when we click outside of the modal.
overlay.addEventListener("click",CloseModal);



//keyboard events are global and lives in document, when key pressed. Event object is created and saved info

document.addEventListener('keydown', (event)=> {
    if(event.key === "Escape" && !modal.classList.contains('hidden'))
    {
        CloseModal();
    }
}   ); //keypress is holding down.
