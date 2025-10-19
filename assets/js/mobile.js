const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  const icon = menuToggle.querySelector("i");
  icon.setAttribute(
    "data-lucide",
    mobileMenu.classList.contains("active") ? "x" : "menu"
  );
  lucide.createIcons();
});
