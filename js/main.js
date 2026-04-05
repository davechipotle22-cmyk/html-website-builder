// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1400);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // Animate hamburger
  menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Navbar scroll effect + active section tracking
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

// Menu tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.getAttribute('data-tab');

    menuTabs.forEach(t => t.classList.remove('active'));
    menuPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById('tab-' + targetTab).classList.add('active');
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll('.about-grid, .menu-content, .cocktails-layout, .wine-grid, .catering-layout, .contact-grid, .section-header').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Contact form handler
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  alert(`Thanks ${data.name}! Your message has been received. We'll be in touch soon.`);
  e.target.reset();
});
