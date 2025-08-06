// Set today's date for reservation
const today = new Date().toISOString().split("T")[0];
const dateInput = document.getElementById("reservation-date");
if (dateInput) dateInput.setAttribute("min", today);

// Update current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu category filter logic
const categories = document.querySelectorAll(".menu-categories span");
const menuItemsContainer = document.querySelector(".menu-items");
let menuData = {};

if (categories.length && menuItemsContainer) {
  fetch("/json/menu.json")
    .then((res) => res.json())
    .then((data) => {
      menuData = data;
    })
    .catch((err) => console.error("Error loading menu data:", err));

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      categories.forEach((c) => c.classList.remove("active"));
      category.classList.add("active");

      const selected = category.getAttribute("data-category");
      const entry = menuData.catalogue?.find((e) => e.category === selected);
      const items = entry?.items;

      if (!items?.length) {
        menuItemsContainer.innerHTML = `<p>No items found for ${selected}.</p>`;
        return;
      }

      menuItemsContainer.innerHTML = items
        .map(
          (item, index) => `
          <div class="menu-item">
            <img src="/images/${index + 1}.avif" alt="${item.name}">
            <div class="info">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
            <span class="price">£${item.price}</span>
          </div>
        `,
        )
        .join("");
    });
  });
}

// Horizontal scroll buttons logic
const wrapper = document.querySelector(".menu-scroll-wrapper");
if (wrapper) {
  const container = wrapper.querySelector(".menu-categories");
  const leftBtn = wrapper.querySelector(".scroll-btn.left");
  const rightBtn = wrapper.querySelector(".scroll-btn.right");
  const scrollAmount = 100;

  if (container && leftBtn && rightBtn) {
    const updateButtons = () => {
      leftBtn.disabled = container.scrollLeft <= 0;
      rightBtn.disabled =
        Math.ceil(container.scrollLeft + container.clientWidth) >=
        container.scrollWidth;
    };

    leftBtn.addEventListener("click", () => {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    container.addEventListener("scroll", updateButtons);
    updateButtons(); // initial state
  }
}
