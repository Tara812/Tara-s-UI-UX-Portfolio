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