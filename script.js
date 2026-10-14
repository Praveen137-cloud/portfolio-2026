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
   2. Contact Form & Actions (Direct Delivery + Gmail Web Fallback)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Contact';
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending message...';
    }

    // Prepare Gmail compose and Mailto links
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=praveenkumar63811@gmail.com&su=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
    const mailtoUrl = `mailto:praveenkumar63811@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;

    try {
      showToast('Sending your message...');
      
      const response = await fetch('https://formsubmit.co/ajax/praveenkumar63811@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `[Portfolio] ${subject} - from ${name}`,
          message: message
        })
      });

      const result = await response.json().catch(() => ({}));

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      showToast('Message sent! Praveen received your message.');
      form.reset();

    } catch (err) {
      // If network or adblocker blocks AJAX, seamlessly open Gmail Web Compose
      showToast('Opening Gmail to send...');
      const opened = window.open(gmailComposeUrl, '_blank');
      if (!opened) {
        window.location.href = mailtoUrl;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
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

