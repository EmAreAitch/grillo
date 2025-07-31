// This is where it all goes :)
  const toggleBtn = document.querySelector('.menu-toggle');
  const header = document.querySelector('header');

  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('menu-open');
  });

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('reservation-date').setAttribute('min', today);
