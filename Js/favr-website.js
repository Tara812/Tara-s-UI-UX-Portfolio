const caseStudyMenuBtn = document.querySelector(".menu-icon");


document.addEventListener("scroll", (e)=> {
   e.preventDefault();
  document.body.classList.remove("menu-active")})

// favicon
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (isDarkMode) {
  document.body.classList.toggle(`dark-mode`)
  console.log(`darkmode`)
  document.querySelector('.favicon').href = "./images/favicon-dark.png"
} else {
  document.body.classList.toggle(`light-mode`)
  console.log(`lightmode`)
  document.querySelector('.favicon').href = "./images/favicon-light.png"
}


// darkmode.addEventListener ("click",applyDarkmode)
// lightmode.addEventListener ("click",applyLightmode)

// function applyDarkmode () {
//   document.querySelector(`:root`).style.setProperty(` --main`, `rgb(36, 36, 36)`);
//    document.querySelector(`:root`).style.setProperty(` --text`, `aliceblue`);
//   setUserSelection ("dark");
// }

// function toggleSelection() {
//     if (localStorage.getItem("currentMode") =="dark") {
//         applyLightMode();
//     }
//     else applyDarkMode();
// };

// Filter functionality for shelf items
const filterButtons = document.querySelectorAll('.filter-btn');
const shelfItems = document.querySelectorAll('.shelf-item');

if (filterButtons.length > 0 && shelfItems.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get selected category
      const selectedCategory = button.getAttribute('data-category');
      
      // Filter shelf items
      shelfItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}


// automate slide show

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}