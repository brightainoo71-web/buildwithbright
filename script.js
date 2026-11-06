// ═══════════════════════════════════
// MOBILE NAVIGATION
// ═══════════════════════════════════
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navigationItems = document.querySelectorAll('.nav-links a');

function closeMenu() {
  menuToggle.classList.remove('open');
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navigationItems.forEach((link) => link.addEventListener('click', closeMenu));

// ═══════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ═══════════════════════════════════
// HEADER SCROLL SHADOW
// ═══════════════════════════════════
const header = document.querySelector('.site-header');
let lastScrollY = 0;

function handleHeaderScroll() {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 50);
  lastScrollY = scrollY;
}
window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// ═══════════════════════════════════
// ACTIVE NAV LINK HIGHLIGHTING
// ═══════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightActiveNav() {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinkItems.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightActiveNav, { passive: true });
highlightActiveNav();

// ═══════════════════════════════════
// SCROLL REVEAL ANIMATION
// ═══════════════════════════════════
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // stagger animations for cards in a grid
        const parent = entry.target.parentElement;
        const siblings = parent ? parent.querySelectorAll('.reveal') : [];
        let delay = 0;

        if (siblings.length > 1) {
          const siblingIndex = Array.from(siblings).indexOf(entry.target);
          delay = siblingIndex * 80;
        }

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));
