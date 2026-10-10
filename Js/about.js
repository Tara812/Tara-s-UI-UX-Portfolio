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
