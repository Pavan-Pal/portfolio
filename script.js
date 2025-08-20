// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Fade in animation on scroll
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

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Add subtle parallax effect to floating shapes
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');

  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero h1');
  const originalText = heroTitle.textContent;
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 80);
  }, 500);
});

// Add counter animation to stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.ceil(start) + (element.dataset.suffix || '');
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + (element.dataset.suffix || '');
    }
  }
  updateCounter();
}

// 🚀 Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      const text = statNumber.textContent.trim();

      // ✅ Handle both pure numbers (500+, 120k) and special formats (24/7)
      const pureNumberMatch = text.match(/^\d+/);  // only leading digits
      const number = pureNumberMatch ? parseInt(pureNumberMatch[0]) : null;

      // store original text for special cases
      if (text.includes("/")) {
        // 👌 keep text like 24/7 as is (don’t animate)
        statNumber.textContent = text;
      } else if (number !== null) {
        const suffix = text.slice(pureNumberMatch[0].length);
        statNumber.dataset.suffix = suffix;
        animateCounter(statNumber, number);
      }

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
  statsObserver.observe(card);
});


// Add hover effect to tech cards
document.querySelectorAll('.tech-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.05) rotate(2deg)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
  });
});

// Add cursor trail effect
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.style.position = 'fixed';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  trail.style.width = '6px';
  trail.style.height = '6px';
  trail.style.background = 'linear-gradient(135deg, #4f46e5, #06b6d4)';
  trail.style.borderRadius = '50%';
  trail.style.pointerEvents = 'none';
  trail.style.zIndex = '9999';
  trail.style.opacity = '0.7';
  trail.style.transform = 'translate(-50%, -50%)';

  document.body.appendChild(trail);

  setTimeout(() => {
    trail.style.transition = 'all 0.5s ease-out';
    trail.style.opacity = '0';
    trail.style.transform = 'translate(-50%, -50%) scale(0)';

    setTimeout(() => {
      document.body.removeChild(trail);
    }, 500);
  }, 100);
});

document.getElementById("year").textContent = new Date().getFullYear();
