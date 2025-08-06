// This is where it all goes :)
const toggleBtn = document.querySelector(".menu-toggle");
const header = document.querySelector("header");

toggleBtn.addEventListener("click", () => {
  header.classList.toggle("menu-open");
});

// Cookie notice handling
const cookieNotice = document.getElementById("cookie-notice");
const acceptBtn = document.getElementById("accept-cookies");

if (cookieNotice && acceptBtn) {
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieNotice.style.display = "block";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieNotice.style.display = "none";
  });
}
