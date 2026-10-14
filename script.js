/**
 * Praveen Kumar R - Developer Portfolio
 * Mitchell Sparrow Signature Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTypewriter();
  initContactForm();
  initSmoothScroll();
  initProjectCarousel();
});

/* ==========================================================================
   1. Mitchell Sparrow Signature Typewriter
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const words = [
    "Hi, The Name's Praveen Kumar R",
    "Guy-who-loves-AI.tsx",
    "<ButLovesToCodeMore />",
    "Full-Stack-and-Agentic-Engineer"
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      textElement.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   2. Contact Form & Actions
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value || 'Portfolio Contact';
      const message = document.getElementById('form-message').value;

      const mailtoUrl = `mailto:praveenkumar63811@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      showToast('Opening your mail client...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   3. Smooth Scroll Navigation
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   4. Projects Horizontal Carousel Controls
   ========================================================================== */
function initProjectCarousel() {
  const carousel = document.getElementById('projects-carousel');
  const prevBtn = document.getElementById('project-prev-btn');
  const nextBtn = document.getElementById('project-next-btn');

  if (!carousel) return;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: -window.innerWidth,
        behavior: 'smooth'
      });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: window.innerWidth,
        behavior: 'smooth'
      });
    });
  }
}

