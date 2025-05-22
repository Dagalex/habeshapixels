// portfolioGallery.js - Shared gallery functionality for all portfolio pages

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the gallery for each portfolio section
  initPortfolioGallery();
});

function initPortfolioGallery() {
  // Get all portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const imageCounter = document.querySelector('.image-counter');
  
  let currentImageIndex = 0;
  const images = [];
  
  // Collect all images and set up click events
  portfolioItems.forEach((item, index) => {
      const img = item.querySelector('.portfolio-image');
      images.push({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt')
      });
      
      item.addEventListener('click', () => {
          currentImageIndex = index;
          updateLightboxImage();
          lightboxOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
      });
  });
  
  // Update lightbox image
  function updateLightboxImage() {
      lightboxImage.setAttribute('src', images[currentImageIndex].src);
      lightboxImage.setAttribute('alt', images[currentImageIndex].alt);
      imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
  }
  
  // Close lightbox
  lightboxClose.addEventListener('click', () => {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
  });
  
  // Previous image
  lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      updateLightboxImage();
  });
  
  // Next image
  lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateLightboxImage();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (!lightboxOverlay.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
          lightboxOverlay.classList.remove('active');
          document.body.style.overflow = 'auto';
      } else if (e.key === 'ArrowLeft') {
          currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
          updateLightboxImage();
      } else if (e.key === 'ArrowRight') {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          updateLightboxImage();
      }
  });
  
  // Close when clicking outside the image
  lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
          lightboxOverlay.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  });
}