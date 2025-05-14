// Initialize Masonry
const grid = document.getElementById('masonry-grid');
const masonry = new Masonry(grid, {
  itemSelector: '.masonry-item',
  percentPosition: true,
  gutter: 20,
  transitionDuration: '0.3s'
});

// Ensure images are loaded before layout
window.addEventListener('load', () => {
  masonry.layout();
});

// Album Filtering
const navButtons = document.querySelectorAll('.nav-btn');
const masonryItems = document.querySelectorAll('.masonry-item');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');

    // Update active button
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter images
    masonryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Re-layout Masonry after filtering
    setTimeout(() => {
      masonry.layout();
    }, 100);
  });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

masonryItems.forEach(item => {
  const img = item.querySelector('img');
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    setTimeout(() => {
      lightboxImg.classList.add('active');
    }, 10);
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxImg.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    lightboxImg.classList.remove('active');
  }
});

// Set default active button
document.querySelector('.nav-btn[data-category="all"]').classList.add('active');