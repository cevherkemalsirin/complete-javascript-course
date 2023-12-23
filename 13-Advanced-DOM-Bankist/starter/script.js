'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section3 = document.querySelector("#section--3");
const topNav = document.querySelector(".nav");
const header = document.querySelector(".header");
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");
const sections = document.querySelectorAll(".section");
const images = document.querySelectorAll(".features__img")
const sliders = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");

function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function RandomColor() {
  return `rgb(${RandomNumber(0, 255)},${RandomNumber(0, 255)},${RandomNumber(0, 255)})`;
}


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (const btn of btnsOpenModal) btn.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScroll.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);
//section1Bounds.top gives distance from the top of the element to top of the current seeing viewport not pages top
/*
const section1Bounds = section1.getBoundingClientRect();
btnScroll.addEventListener('click', () => {
  window.scrollTo({
    left: window.scrollX,
    top: window.scrollY + section1Bounds.top,
    behavior: 'smooth',
  });
});
*/

//instead of adding smooth scrolling each individual nav links, we will add one to the parent and use event delegation/bubbling

document.querySelector(".nav__links").addEventListener("click", function(e){
  
  if(e.target.classList.contains("nav__link"))
  {
     e.preventDefault();
     const section = e.target.getAttribute("href");
     document.querySelector(section).scrollIntoView({behavior:'smooth'});
  }
}
);


function HoverLinks(e,opacity)
{
  const link = e.target.closest(".nav__link");
  if(link)
  {
    const items = [...link.closest(".nav__links").children];
    items.forEach(item => {
      const itemLink = item.querySelector(".nav__link");
      if(itemLink !== e.target)
      {
        itemLink.style.opacity = opacity;
      }
    });
  }
}

const linksContainer = document.querySelector(".nav__links");

linksContainer.addEventListener("mouseover", (e)=>{
  HoverLinks(e, 0.5);
});

linksContainer.addEventListener("mouseout", (e)=>{
  HoverLinks(e, 1);
});



//we want the link part to be shown if we scrolled it out of the screen.
/*

//scroll event is at window
const section1bound = section1.getBoundingClientRect();
window.addEventListener("scroll", function()
{
  if(window.scrollY > section1bound.top)
  {
    console.log("hey");
    topNav.classList.add("sticky");
  }
  else
  {
    topNav.classList.remove("sticky");
  }

}
);

THIS WORKS BUT PROBLEM IS SCROLL EVENTS FIRES EACH TIME WE SCROLL AND IT IS NOT PERFORMANT, WE NEED OBERSERVER API TO FIRE ONLY 
CERTAIN THRESHOLDS

----------------------------------------------------------------------------------------------------------------------------------
//callback function first takes entries depending on how many thresolds and the observer send itselves
const obsFunction = function(entries,observer)
{
  console.log(entries);
}

const obsOptions = {
  //root is for based on what, Null means window. Oberserver is window, based on window location
  root:null,
  //thresold means based on root what thresold a target needs to intersect or leave intersect
  threshold: [0 , 0.2] // we can give only one thresold or multiple in an array
}

//takes a function and options
const observer = new IntersectionObserver(obsFunction, obsOptions); 

observer.observe(section1);
----------------------------------------------------------------------------------------------------------------------------------
*/
//now after this example we want the nav to be sticky right after we leave header 

function ToggleNavSticky(entries,observer)
{
 
  if(!entries[0].isIntersecting)
  {
    topNav.classList.add("sticky")
  }
  else
  {
    if(topNav.classList.contains("sticky"))
    {
      topNav.classList.remove("sticky");
    }
  }
}

const stickyOptions = {
  root:null,
  threshold: 0,
  //rootmargin is for the offset for the thresold, needs to be in pixel
  rootMargin: `-${topNav.getBoundingClientRect().height}px`,
}

const observer = new IntersectionObserver(ToggleNavSticky,stickyOptions);
observer.observe(header);

//hide sections

//reveal them 

function RevealSection(entries,observer)
{
  if(entries[0].isIntersecting && entries[0].target.classList.contains("section--hidden"))
  {
      entries[0].target.classList.remove("section--hidden")
      observer.unobserve(entries[0].target);
      
  }
}

const sectionOptions = {
  root:null,
  threshold:0.15
}

const observeSections = new IntersectionObserver(RevealSection,sectionOptions);

sections.forEach(section=>{
  section.classList.add("section--hidden");
  observeSections.observe(section);
});


tabContainer.addEventListener("click", function (e){
 
  const clicked = e.target.closest(".operations__tab");

  if(!clicked) return;

  tabs.forEach(element => {
    element.classList.remove("operations__tab--active");
  });
  clicked.classList.add("operations__tab--active");
  
  contents.forEach(element=>{
    element.classList.remove("operations__content--active");
  });
  document.querySelector(`.operations__content--${clicked.getAttribute("data-tab")}`)
  .classList.add("operations__content--active");

});


function RevealImages(entry,observer)
{
    
  if(entry[0].isIntersecting)
  {
    if(entry[0].intersectionRatio >= 0.8)
    {
      entry[0].target.classList.remove("lazy-img");
      entry[0].target.src = entry[0].target.getAttribute("data-src");
      //images load behind the scenes so if we do like above , we may unblur the low res image in low network
      entry[0].target.addEventListener("load",()=>{
      
      })
    }

  }
  else
  {
    if(entry[0].intersectionRatio < 0.8)
    {
     entry[0].target.classList.add("lazy-img");
     entry[0].target.src = entry[0].target.getAttribute("data-src-org");
    }
    
  }

}

const imgObserveOptions = {
  root:null,
  threshold:[0.8,0]
}

const imgObserver = new IntersectionObserver(RevealImages,imgObserveOptions);

images.forEach(img => {
  imgObserver.observe(img);
  img.style.border = "3px solid black";
});



//sliding

let currentSlideIndex = 0;
let maxSlideIndex = sliders.length - 1;



function MoveSliderRight()
{
  console.log("MovedRight");
  if(currentSlideIndex === maxSlideIndex)
  {
    currentSlideIndex = 0;
  }
  else
  {
    currentSlideIndex++;
  }

  MoveSlide(currentSlideIndex);
}

function MoveSliderLeft()
{
  console.log("MovedLeft");
  if(currentSlideIndex === 0)
  {
    currentSlideIndex = maxSlideIndex;
  }
  else
  {
    currentSlideIndex--;
  }
  
  MoveSlide(currentSlideIndex);
}


function MoveSlide(currentSlide = 0)
{
  sliders.forEach((slide,i) => {
    slide.style.transform = `translateX(${100 *(i - currentSlide) }%)`;
  });
  SetActiveDot(currentSlide);
}

function MoveSliderKey(e)
{
  console.log(e);
  if(e.key === "ArrowLeft")
  {
    MoveSliderLeft();
  }
  else if(e.key === "ArrowRight")
  {
   MoveSliderRight();
  }
}

document.querySelector(".slider__btn--right").addEventListener("click", MoveSliderRight);
document.querySelector(".slider__btn--left").addEventListener("click", MoveSliderLeft);



function onRevealSection3(entry,observer)
{
  if(entry[0].isIntersecting)
  {
    document.addEventListener("keydown", MoveSliderKey);
  }
  else
  {
    document.removeEventListener("keydown", MoveSliderKey);
  }

}

const sliderOption = {
  root: null,
  threshold: 1
};

const sliderObserver  = new IntersectionObserver(onRevealSection3, sliderOption);

sliderObserver.observe(section3);


function SetActiveDot(index = 0)
{
  [...dotContainer.children].forEach((dot)=>
  {
    if(dot.classList.contains("dots__dot--active"))
    {
      dot.classList.remove("dots__dot--active");
    }
   
  })
  dotContainer.querySelector(`.dots__dot[data-index ="${index}"]`).classList.add("dots__dot--active");
}

function ActivateDotClicks() 
{
  dotContainer.addEventListener("click", (e)=>{
    e.preventDefault();
    if(e.target.classList.contains("dots__dot"))
    {
      currentSlideIndex = +e.target.getAttribute("data-index");
      SetActiveDot(currentSlideIndex); 
      MoveSlide(currentSlideIndex);
    }
  }) 
}


// need to fill dots with sliders
function InitDots()
{
  sliders.forEach((_ , i)=>{
    const htmlText = `<button class = "dots__dot" data-index = "${i}"> </button>`;
    dotContainer.insertAdjacentHTML("beforeend", htmlText);
});

  ActivateDotClicks();
}

InitDots();
MoveSlide();






/*

console.log(document.documentElement);
console.log(document.documentElement);

//get an element
const buttons = document.getElementsByTagName('button');
console.log(buttons);

const body = document.body;

//create an element
const CookiesMessage = document.createElement('div');
CookiesMessage.classList.add('cookie-message');

CookiesMessage.innerHTML =
  "<p> Please Accept Cookies! </p> <button class ='btn btn-cookie'> Accept </button>";

body.append(CookiesMessage);
const cookieBtn = document.querySelector('.btn-cookie');

cookieBtn.addEventListener('click', () => CookiesMessage.remove());

//styling
//adds inner style
CookiesMessage.style.backgroundColor = 'orange';
console.log(CookiesMessage.style.color);
//undefined because this gets inner style
console.log(CookiesMessage.style.backgroundColor);
//gets external css style
console.log(getComputedStyle(CookiesMessage).color);

CookiesMessage.style.height =
  parseFloat(getComputedStyle(CookiesMessage).height, 10) + 30 + 'px';

//getting attrabitues
const imgHead = document.querySelector('.header__img');
//this gives full related link
console.log(imgHead.src);
//this gives what we put in attrabute without https
console.log(imgHead.getAttribute('src'));
imgHead.setAttribute('company', 'Bankist');
// Classes
imgHead.classList.add('c', 'j');
imgHead.classList.remove('c', 'j');
imgHead.classList.toggle('c');
imgHead.classList.contains('c'); // not includes
*/

/*
//Doom traversing 

const h1 = document.querySelector("h1");

//getting specific child elements
console.log(h1.querySelectorAll(".highlight"));
//getting all child nodes like text comments elements 
console.log(h1.childNodes)
//getting only elements
console.log(h1.children); 
//getting first child element
console.log(h1.firstElementChild);
//getting last child element
console.log(h1.lastElementChild);

//selecting first parent
console.log(h1.parentElement);
//selecting closest parent element with that class
console.log(h1.closest(".header__title"));

//getting siblings
console.log(h1.nextElementSibling);
console.log(h1.previousElementSibling); //null
//getting all siblings with a simple trick, but this returns html collection which has no foreach
console.log(h1.parentElement.children);
*/