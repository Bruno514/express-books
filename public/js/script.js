// Navbar and dropdown interactivity
const dropdown1 = document.querySelectorAll(".dropdown")[0];
const dropdown2 = document.querySelectorAll(".dropdown")[1];

dropdown1.addEventListener("click", (e) => {
  dropdown1.classList.toggle("visible");
  dropdown2.classList.remove("visible");
});
dropdown2.addEventListener("click", (e) => {
  dropdown2.classList.toggle("visible");
  dropdown1.classList.remove("visible");
});

const hamburger = document.querySelector(".nav-hamburger");

hamburger.addEventListener("click", (e) => {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("visible");
});

function openDeleteDialog(action) {
  const dialog = document.querySelector("dialog");
  const form = dialog.querySelector("form");
  form.action = action;
  
  dialog.showModal();
}
