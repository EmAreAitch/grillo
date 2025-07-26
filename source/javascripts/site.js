// This is where it all goes :)
  const toggleBtn = document.querySelector('.menu-toggle');
  const header = document.querySelector('header');

  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('menu-open');
  });
