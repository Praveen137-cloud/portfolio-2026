/**
 * Praveen Kumar R - Developer Portfolio
 * Interactive Scripts & Modern Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if loaded
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initParticleCanvas();
  initTypewriter();
  initMobileNav();
  initProjectFilters();
  initTerminal();
  initContactActions();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  // Check saved theme preference or system preference
  const savedTheme = localStorage.getItem('praveen-portfolio-theme');
  if (savedTheme === 'light') {
    html.classList.add('light');
    updateThemeIcons(true);
  } else {
    html.classList.remove('light');
    updateThemeIcons(false);
  }

  function toggleTheme() {
    html.classList.toggle('light');
    const isLight = html.classList.contains('light');
    localStorage.setItem('praveen-portfolio-theme', isLight ? 'light' : 'dark');
    updateThemeIcons(isLight);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
}

function updateThemeIcons(isLight) {
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  sunIcons.forEach(icon => icon.classList.toggle('hidden', !isLight));
  moonIcons.forEach(icon => icon.classList.toggle('hidden', isLight));
}

/* ==========================================================================
   2. Interactive Neural Particle Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = [
    'Full-Stack Developer',
    'AI & Agentic Systems Engineer',
    'React 19 & FastAPI Specialist',
    'CSE Undergrad @ Ramco Institute of Technology'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   5. Project Filtering & Details Modal
   ========================================================================== */
const projectsData = {
  seoagent: {
    title: 'SEOAgent.ai',
    subtitle: 'Autonomous SEO Audit & AI Strategy Agent',
    badge: 'AI & Full-Stack',
    liveUrl: 'https://seo-agent-inky-seven.vercel.app',
    githubUrl: 'https://github.com/Praveen137-cloud',
    tech: ['React 19', 'FastAPI', 'Python', 'Groq LLM (Llama 3)', 'BeautifulSoup4', 'ReportLab', 'Chrome Extension (V3)'],
    description: `An autonomous AI-powered technical SEO diagnostic platform engineered to crawl entire websites, identify performance bottlenecks, broken metadata, indexing flaws, and security headers, and formulate high-impact recovery strategies using Groq-accelerated Llama 3 models.`,
    highlights: [
      'Multi-Page Crawling Engine: Asynchronous Python web crawler built with BeautifulSoup4 parsing deep DOM structures.',
      '0–100 Dynamic Scoring: Multi-factor technical diagnostic algorithm assessing mobile readiness, meta tags, and accessibility.',
      'Groq LLM Integration: Instant actionable AI recommendations and code patches with near-zero latency using Llama 3.',
      'Automated PDF Reports: Pixel-perfect PDF generation pipeline powered by ReportLab for executive stakeholders.',
      'Manifest V3 Chrome Extension: Allows users to run instantaneous 1-click on-page SEO audits directly inside their browser.'
    ],
    architecture: `React 19 Frontend  ──>  FastAPI Engine  ──>  Async BS4 Crawler
                               │                     │
                               ▼                     ▼
                        Groq Cloud API        ReportLab PDF Engine
                        (Llama 3 LLM)         (Audit Exporter)`
  },
  pico: {
    title: 'Pico',
    subtitle: 'Gamified DSA Learning Platform',
    badge: 'Full-Stack & EdTech',
    liveUrl: 'https://pico-sooty.vercel.app',
    githubUrl: 'https://github.com/Praveen137-cloud',
    tech: ['React 19', 'Node.js', 'Express', 'MongoDB Atlas', 'Socket.io', 'Google Gemini AI', 'Monaco Editor', 'JWT'],
    description: `A next-generation gamified learning ecosystem designed to master Data Structures & Algorithms through interactive challenges, real-time multi-language code execution, AI-powered personalized tutoring, and live competitive rankings.`,
    highlights: [
      'In-Browser Monaco Code Editor: Feature-rich code editor with syntax highlighting, autocomplete, and instant feedback.',
      'Google Gemini AI Tutor: Generates personalized hints, algorithmic explanations, and edge-case testing tailored to the student\'s progress.',
      'Live Multiplayer Rankings: Real-time leaderboard updates broadcasted across connected users via Socket.io.',
      'JWT Authentication & Security: End-to-end token-based user authentication with encrypted MongoDB Atlas profiles.',
      'Continuous Delivery: Optimized build artifacts and deployment pipelines hosted on Vercel and Render.'
    ],
    architecture: `React 19 + Monaco  ──>  Node/Express API  ──>  MongoDB Atlas
                               │                     │
                               ▼                     ▼
                        Socket.io Engine       Gemini AI Tutor
                        (Live Leaderboard)    (Adaptive Feedback)`
  },
  scamhunter: {
    title: 'Autonomous Scam Hunter AI',
    subtitle: 'AI Cybersecurity & Digital Threat Detection Platform',
    badge: 'Cybersecurity & AI',
    liveUrl: 'https://scam-hunter-ashen.vercel.app',
    githubUrl: 'https://github.com/Praveen137-cloud',
    tech: ['React.js', 'FastAPI', 'Python', 'PostgreSQL', 'Groq LLM (Llama 3)', 'EasyOCR', 'VirusTotal API', 'ReportLab'],
    description: `An intelligent cybersecurity platform that autonomously identifies phishing scams, fraudulent payment gateways, and malicious URLs from screenshots and text inputs using computer vision OCR and threat intelligence feeds.`,
    highlights: [
      'EasyOCR Visual Forensics: Extracts textual content from user-uploaded screenshots and fake invoices with deep OCR.',
      'Threat Intelligence Feeds: Real-time integration with VirusTotal and URLScan databases for known malicious hosts.',
      '0–100 Dynamic Risk Engine: Multi-layered risk scoring algorithm analyzing domain age, SSL authenticity, and linguistic coercion.',
      'Llama 3 Threat Explainer: Summarizes cyber risks into plain-English mitigation steps via Groq Cloud API.',
      'Incident PDF Reports: Automated incident dossier generation for compliance and forensic documentation.'
    ],
    architecture: `React UI  ──>  FastAPI Backend  ──>  EasyOCR + OpenCV
                       │                     │
                       ▼                     ▼
                VirusTotal/URLScan    Groq LLM Analysis
                Threat Intelligence   & PDF Generation`
  }
};

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
        b.classList.add('text-slate-400', 'border-white/10');
      });
      btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
      btn.classList.remove('text-slate-400', 'border-white/10');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });
    });
  });

  // Project Modal Logic
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      const data = projectsData[projectId];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-subtitle').textContent = data.subtitle;
      document.getElementById('modal-desc').textContent = data.description;
      document.getElementById('modal-badge').textContent = data.badge;

      // Links
      const liveBtn = document.getElementById('modal-live-link');
      const ghBtn = document.getElementById('modal-gh-link');
      liveBtn.href = data.liveUrl;
      ghBtn.href = data.githubUrl;

      // Tech pills
      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-pill';
        span.textContent = t;
        techContainer.appendChild(span);
      });

      // Highlights
      const highlightsContainer = document.getElementById('modal-highlights');
      highlightsContainer.innerHTML = '';
      data.highlights.forEach(h => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-sm text-slate-300';
        li.innerHTML = `<span class="text-cyan-400 font-bold">▹</span> <span>${h}</span>`;
        highlightsContainer.appendChild(li);
      });

      // Architecture
      const archContainer = document.getElementById('modal-arch');
      if (archContainer) {
        archContainer.textContent = data.architecture;
      }

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Interactive Terminal / CLI
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  if (!input || !body) return;

  const terminalCommands = {
    help: () => `
<div class="text-cyan-400 font-semibold mb-1">Available Commands:</div>
<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300 font-mono">
  <div><span class="text-emerald-400 font-bold">about</span>       - Developer overview & bio</div>
  <div><span class="text-emerald-400 font-bold">skills</span>      - Technical skill matrix</div>
  <div><span class="text-emerald-400 font-bold">projects</span>    - Live projects & links</div>
  <div><span class="text-emerald-400 font-bold">exp</span>         - Professional work history</div>
  <div><span class="text-emerald-400 font-bold">edu</span>         - Academic background</div>
  <div><span class="text-emerald-400 font-bold">certs</span>       - Official certifications</div>
  <div><span class="text-emerald-400 font-bold">contact</span>     - Reach out via email/phone</div>
  <div><span class="text-emerald-400 font-bold">resume</span>      - Open latest resume PDF</div>
  <div><span class="text-emerald-400 font-bold">sudo hire</span>   - Recruiter fast-track easter egg!</div>
  <div><span class="text-emerald-400 font-bold">clear</span>       - Clear terminal window</div>
</div>`,

    about: () => `
<div class="text-slate-300">
  <p><span class="text-cyan-400 font-bold">Praveen Kumar R</span> — Full-Stack & AI Developer</p>
  <p class="text-xs text-slate-400 mt-1">
    Undergraduate in Computer Science & Engineering at Ramco Institute of Technology (2023-2027).
    Passionate about architecting end-to-end web applications, integrating LLMs (Groq, Gemini), 
    building autonomous crawlers, and building high-performance developer tools.
  </p>
</div>`,

    skills: () => `
<div class="text-slate-300 text-xs font-mono space-y-1">
  <p><span class="text-cyan-400 font-semibold">Languages:</span>      Python, JavaScript (ES6+), Java, C, HTML5, CSS3, SQL</p>
  <p><span class="text-cyan-400 font-semibold">Frameworks:</span>     React 19, FastAPI, Node.js, Express.js, Tailwind CSS</p>
  <p><span class="text-cyan-400 font-semibold">AI & Systems:</span>   Groq LLM (Llama 3), Google Gemini, EasyOCR, Agentic Workflows</p>
  <p><span class="text-cyan-400 font-semibold">Databases:</span>      MongoDB Atlas, PostgreSQL, MySQL</p>
  <p><span class="text-cyan-400 font-semibold">Tools & Cloud:</span>  Git, GitHub, Vercel, Render, VS Code, Chrome Extensions (V3)</p>
</div>`,

    projects: () => `
<div class="text-slate-300 text-xs font-mono space-y-2">
  <div>
    <span class="text-emerald-400 font-bold">1. SEOAgent.ai</span> (React 19, FastAPI, Groq LLM, BS4, Chrome Ext)
    <div class="text-slate-400 pl-4">Live: <a href="https://seo-agent-inky-seven.vercel.app" target="_blank" class="text-cyan-400 underline">seo-agent-inky-seven.vercel.app</a></div>
  </div>
  <div>
    <span class="text-emerald-400 font-bold">2. Pico</span> (React 19, Node.js, Express, MongoDB, Socket.io, Gemini AI)
    <div class="text-slate-400 pl-4">Live: <a href="https://pico-sooty.vercel.app" target="_blank" class="text-cyan-400 underline">pico-sooty.vercel.app</a></div>
  </div>
  <div>
    <span class="text-emerald-400 font-bold">3. Autonomous Scam Hunter AI</span> (React, FastAPI, PostgreSQL, EasyOCR, Groq)
    <div class="text-slate-400 pl-4">Live: <a href="https://scam-hunter-ashen.vercel.app" target="_blank" class="text-cyan-400 underline">scam-hunter-ashen.vercel.app</a></div>
  </div>
</div>`,

    exp: () => `
<div class="text-slate-300 text-xs font-mono space-y-2">
  <div>
    <p class="text-cyan-400 font-bold">AI / Full-Stack Developer Intern @ Aram Analytics</p>
    <p class="text-slate-400">09/2026 – Present | Puliyangudi, India</p>
    <p class="text-slate-400">• Built SEOAgent.ai: web crawling, 0-100 scoring, Groq Llama 3 & Manifest V3 Chrome Extension.</p>
  </div>
  <div>
    <p class="text-cyan-400 font-bold">Front-End Developer Intern @ Strinkit Technologies</p>
    <p class="text-slate-400">12/2025 | Rajapalayam, India</p>
    <p class="text-slate-400">• Responsive UI engineering with HTML5/CSS3/ES6+, Figma translation & bundle optimization.</p>
  </div>
</div>`,

    edu: () => `
<div class="text-slate-300 text-xs font-mono space-y-1">
  <p><span class="text-cyan-400 font-bold">B.E. Computer Science & Engineering</span> — Ramco Institute of Technology</p>
  <p class="text-slate-400 pl-2">2023 – 2027 | CGPA: <span class="text-emerald-400 font-bold">7.35 / 10.0</span> | Rajapalayam, India</p>
  <p class="text-cyan-400 font-bold mt-2">Class XII — Veveaham Mat Hr Sec School</p>
  <p class="text-slate-400 pl-2">2023 | Score: <span class="text-emerald-400 font-bold">80.01%</span> | Rajapalayam, India</p>
</div>`,

    certs: () => `
<div class="text-slate-300 text-xs font-mono space-y-1">
  <p>🏆 <span class="text-cyan-400 font-bold">NPTEL Programming in Java:</span> 86%</p>
  <p>🏆 <span class="text-cyan-400 font-bold">NPTEL Python for Data Science:</span> Elite + Silver (82%)</p>
  <p>🏆 <span class="text-cyan-400 font-bold">NPTEL Problem Solving through C:</span> Elite</p>
  <p>🛡️ <span class="text-cyan-400 font-bold">Cybersecurity Certification:</span> Supraja Technologies</p>
  <p>📈 <span class="text-cyan-400 font-bold">Digital Marketing:</span> Infosys Springboard</p>
  <p>🌐 <span class="text-cyan-400 font-bold">Build Responsive Websites:</span> Udemy</p>
</div>`,

    contact: () => `
<div class="text-slate-300 text-xs font-mono space-y-1">
  <p>📧 Email:    <a href="mailto:praveenkumar63811@gmail.com" class="text-cyan-400 underline">praveenkumar63811@gmail.com</a></p>
  <p>📞 Phone:    <a href="tel:+916381162006" class="text-cyan-400">+91 6381162006</a></p>
  <p>💼 LinkedIn: <a href="https://linkedin.com/in/praveen-kumar" target="_blank" class="text-cyan-400 underline">linkedin.com/in/praveen-kumar</a></p>
  <p>💻 GitHub:   <a href="https://github.com/Praveen137-cloud" target="_blank" class="text-cyan-400 underline">github.com/Praveen137-cloud</a></p>
</div>`,

    resume: () => {
      window.open('praveen-resume.pdf', '_blank');
      return `<span class="text-emerald-400">Opening Praveen's resume in a new tab...</span>`;
    },

    'sudo hire': () => {
      triggerConfetti();
      return `
<div class="p-3 border border-emerald-500/30 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-mono space-y-2">
  <div class="font-bold text-sm">🎉 ACCESS GRANTED: HIRE_PRAVEEN_2026</div>
  <p>Thank you for considering Praveen Kumar R for your engineering team!</p>
  <p>Praveen brings hands-on experience in <strong>React 19, FastAPI, Groq LLM agentic architectures, and production web deployment</strong>.</p>
  <div class="pt-2">
    <a href="mailto:praveenkumar63811@gmail.com?subject=Job%20Opportunity%20for%20Praveen%20Kumar" class="inline-block px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded hover:bg-emerald-400">
      Send Interview Invite 🚀
    </a>
  </div>
</div>`;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      const cmd = rawCmd.toLowerCase();
      input.value = '';

      if (!cmd) return;

      if (cmd === 'clear') {
        body.innerHTML = `
<div class="text-slate-400 text-xs">
  Type <span class="text-cyan-400 font-bold">help</span> to view available terminal commands.
</div>`;
        return;
      }

      // Append user command
      const cmdDiv = document.createElement('div');
      cmdDiv.className = 'mt-3 text-xs font-mono';
      cmdDiv.innerHTML = `<span class="text-cyan-400 font-bold">guest@praveen-dev</span>:<span class="text-purple-400">~</span>$ <span class="text-white">${escapeHtml(rawCmd)}</span>`;
      body.appendChild(cmdDiv);

      // Append response
      const resDiv = document.createElement('div');
      resDiv.className = 'mt-1 text-xs';

      if (terminalCommands[cmd]) {
        resDiv.innerHTML = terminalCommands[cmd]();
      } else {
        resDiv.innerHTML = `<span class="text-red-400 font-mono text-xs">Command not recognized: '${escapeHtml(cmd)}'. Type <span class="text-cyan-400 underline font-bold cursor-pointer" onclick="document.getElementById('terminal-input').value='help';">help</span> for available commands.</span>`;
      }

      body.appendChild(resDiv);
      body.scrollTop = body.scrollHeight;
    }
  });

  // Focus terminal when clicking anywhere in terminal body
  body.addEventListener('click', () => {
    input.focus();
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   7. Contact & Toast Notifications
   ========================================================================== */
function initContactActions() {
  // One-click copy email
  const copyBtn = document.getElementById('copy-email-btn');
  const heroCopyBtn = document.getElementById('hero-copy-email');

  function copyEmailHandler(e) {
    if (e) e.preventDefault();
    const email = 'praveenkumar63811@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Copied email to clipboard! (praveenkumar63811@gmail.com)');
    }).catch(() => {
      showToast('Email: praveenkumar63811@gmail.com');
    });
  }

  if (copyBtn) copyBtn.addEventListener('click', copyEmailHandler);
  if (heroCopyBtn) heroCopyBtn.addEventListener('click', copyEmailHandler);

  // Contact Form handler
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value || 'Portfolio Contact';
      const message = document.getElementById('contact-message').value;

      // Construct mailto
      const mailtoUrl = `mailto:praveenkumar63811@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;

      triggerConfetti();
      showToast('Opening your email client to send message...');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
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
   8. Confetti Trigger
   ========================================================================== */
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

/* ==========================================================================
   9. Scroll Spy for Navbar
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      }
    });
  });
}
