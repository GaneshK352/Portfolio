document.addEventListener('DOMContentLoaded', () => {
      // 1. Reading Progress Bar
      window.addEventListener('scroll', () => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          document.getElementById('progressBar').style.width = scrolled + '%';
      });

      // 2. Dark / Light Theme Toggle
      const themeToggle = document.getElementById('themeToggle');
      const body = document.body;

      themeToggle.addEventListener('click', () => {
          body.classList.toggle('light-theme');
          const isLight = body.classList.contains('light-theme');
          themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      });

      // 3. Project Details Toggle (Expandable Cards)
      const toggleBtns = document.querySelectorAll('.toggle-details-btn');
      toggleBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              const details = btn.nextElementSibling;
              details.classList.toggle('show');
              const isShown = details.classList.contains('show');
              btn.innerHTML = isShown
                  ? '<i class="fas fa-chevron-up"></i> Hide Details'
                  : '<i class="fas fa-chevron-down"></i> View Full Details';
          });
      });

      // 4. Interactive Project Filter
      const filterBtns = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');

      filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              filterBtns.forEach(b => b.classList.remove('active'));
              btn.classList.add('active');

              const filter = btn.getAttribute('data-filter');
              projectCards.forEach(card => {
                  const category = card.getAttribute('data-category');
                  if (filter === 'all' || category === filter) {
                      card.style.display = 'flex';
                  } else {
                      card.style.display = 'none';
                  }
              });
          });
      });
  });
