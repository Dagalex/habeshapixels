// Main JavaScript for Index Page

document.addEventListener('DOMContentLoaded', function() {
  // Hero Slideshow
  const heroImages = [
      'images/hero/hero1.jpg',
      'images/hero/hero2.jpg',
      'images/hero/hero3.jpg',
      'images/hero/hero4.jpg',
      'images/hero/hero5.jpg'
  ];
  
  let currentHeroIndex = 0;
  const heroElement = document.querySelector('.hero');
  
  function changeHeroBackground() {
      heroElement.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
      currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
  }
  
  // Preload hero images
  heroImages.forEach(img => {
      const image = new Image();
      image.src = img;
  });
  
  changeHeroBackground(); // Initial load
  setInterval(changeHeroBackground, 5000); // Change every 5 seconds
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const formData = new FormData(this);
          const formValues = Object.fromEntries(formData.entries());
          
          // Here you would typically send the data to a server
          console.log('Form submitted:', formValues);
          
          // Show success message
          alert('Thank you for your message! We will get back to you soon.');
          this.reset();
      });
  });
  
  // Scroll reveal animations
  const scrollReveal = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200,
      reset: true
  });
  
  scrollReveal.reveal('.portfolio-card', { interval: 200 });
  scrollReveal.reveal('.team-member', { interval: 200 });
  scrollReveal.reveal('.booking-card, .contact-card', { delay: 300 });
});


// Mobile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // For mobile/touch devices
  if (window.innerWidth <= 768) {
      dropdowns.forEach(dropdown => {
          const dropbtn = dropdown.querySelector('.dropbtn');
          
          dropbtn.addEventListener('click', function(e) {
              e.preventDefault();
              dropdown.classList.toggle('active');
              
              // Close other open dropdowns
              dropdowns.forEach(otherDropdown => {
                  if (otherDropdown !== dropdown) {
                      otherDropdown.classList.remove('active');
                  }
              });
          });
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
          if (!e.target.closest('.dropdown')) {
              dropdowns.forEach(dropdown => {
                  dropdown.classList.remove('active');
              });
          }
      });
  }
});

// Automatically add active class to current portfolio page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const portfolioLinks = document.querySelectorAll('.portfolio-items a');
  
  portfolioLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
      }
  });
  
  // Also highlight the main portfolio link when on a portfolio page
  if (currentPage.includes('portfolio.html') || 
      currentPage.includes('wedding-portfolio') ||
      currentPage.includes('engagement-portfolio') ||
      currentPage.includes('event-portfolio') ||
      currentPage.includes('commercial-portfolio')) {
      document.querySelector('.portfolio-btn').classList.add('active');
  }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you within 24 hours.');
  this.reset();
});

// Active state for current page
document.addEventListener('DOMContentLoaded', function() {
  // Add active class to contact link
  document.querySelector('.header nav ul li a[href="contact.html"]').classList.add('active');
});