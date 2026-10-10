const caseStudyMenuBtn = document.querySelector(".menu-icon");

caseStudyMenuBtn.addEventListener("click", (e)=> {
  e.preventDefault();
      document.body.classList.toggle("menu-active");

})

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


// slideshow

  let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function hoversection(sectionName) {
  const section = document.querySelector(`#${sectionName}`);
  const navSection = document.querySelector(`.${sectionName}Li`);

  section.addEventListener("mouseenter", (e) => {
    e.preventDefault();
    navSection.classList.toggle("section-hovered");
  });

  section.addEventListener("mouseleave", () => {
    navSection.classList.remove("section-hovered");
  });
}

hoversection("overview");
hoversection("empathize");
hoversection("define");
hoversection("ideate");
hoversection("prototype");
hoversection("test");
hoversection("reflection");




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




function openQuestion(number) {
  const question = document.body.querySelector(`.q${number}-wrapper`);
   question.addEventListener("click", (e) => {
    e.preventDefault();

    if (question.classList.contains(`on`)) { 
      question.classList.remove(`on`);
    } else {
       question.classList.toggle(`on`);
    }
    })

  }

  

openQuestion(1);
openQuestion(2);
openQuestion(3);
openQuestion(4);

