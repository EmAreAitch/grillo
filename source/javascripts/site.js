// This is where it all goes :)
  const toggleBtn = document.querySelector('.menu-toggle');
  const header = document.querySelector('header');

  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('menu-open');
  });

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('reservation-date').setAttribute('min', today);


document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".menu-categories span");
  const menuItemsContainer = document.querySelector(".menu-items");

  let menuData = {};

  // Load JSON once
  fetch("/json/menu.json")
    .then((res) => res.json())
    .then((data) => {
      menuData = data;
    })
    .catch((err) => console.error("Error loading menu data:", err));

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      // Remove active from all
      categories.forEach((c) => c.classList.remove("active"));
      category.classList.add("active");

      const selected = category.getAttribute("data-category");
      const items = menuData[selected];

      if (!items) {
        menuItemsContainer.innerHTML = `<p>No items found for ${selected}.</p>`;
        return;
      }

      // Build new HTML
      menuItemsContainer.innerHTML = items
        .map((item, index) => `
          <div class="menu-item">
            <img src="/images/${index + 1}.avif" alt="${item.name}">
            <div class="info">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
            <span class="price">£${item.price}</span>
          </div>
        `).join("");
    });
  });
});

