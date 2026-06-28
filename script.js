// ===== PAGE NAVIGATION =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const page = document.getElementById('page-' + name);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const link = document.querySelector(`.nav-link[onclick="showPage('${name}')"]`);
  if (link) link.classList.add('active');

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== HAMBURGER MENU =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

const WA_NUMBER = '919949332266';

// ===== BOOKING FORM =====
function submitBooking(e) {
  e.preventDefault();

  const name     = document.getElementById('b-name').value.trim();
  const phone    = document.getElementById('b-phone').value.trim();
  const consumer = document.getElementById('b-consumer').value.trim();
  const type     = document.getElementById('b-type').value;
  const qty      = document.getElementById('b-qty').value;
  const date     = document.getElementById('b-date').value;
  const address  = document.getElementById('b-address').value.trim();
  const notes    = document.getElementById('b-notes').value.trim();

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Flexible';

  const msg =
    `✅ *NEW CYLINDER BOOKING*\n` +
    `*Sri Padmavathi HP Gas Agency*\n` +
    `--------------------------------\n` +
    `*Name:*          ${name}\n` +
    `*Mobile:*        ${phone}\n` +
    `*Consumer No:* ${consumer}\n` +
    `*Cylinder:*     ${type}\n` +
    `*Quantity:*     ${qty}\n` +
    `*Delivery:*     ${formattedDate}\n` +
    `--------------------------------\n` +
    `*Address:*\n${address}\n` +
    (notes ? `\n*Notes:*\n${notes}\n` : '') +
    `--------------------------------\n` +
    `_Via website_`;

  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');

  document.getElementById('modalTitle').textContent = 'Booking Sent!';
  document.getElementById('modalMsg').textContent = 'Your booking details have been sent to us on WhatsApp. We will confirm within 30 minutes.';
  document.getElementById('successModal').classList.add('open');
  e.target.reset();
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();

  const name    = document.getElementById('c-name').value.trim();
  const phone   = document.getElementById('c-phone').value.trim();
  const subject = document.getElementById('c-subject').value;
  const message = document.getElementById('c-message').value.trim();

  const msg =
    `📩 *NEW MESSAGE*\n` +
    `*Sri Padmavathi HP Gas Agency*\n` +
    `--------------------------------\n` +
    `*Name:*     ${name}\n` +
    `*Mobile:*   ${phone}\n` +
    `*Subject:* ${subject}\n` +
    `--------------------------------\n` +
    `*Message:*\n${message}\n` +
    `--------------------------------\n` +
    `_Via website_`;

  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');

  document.getElementById('modalTitle').textContent = 'Message Sent!';
  document.getElementById('modalMsg').textContent = 'Your message has been sent to us on WhatsApp. We will get back to you shortly.';
  document.getElementById('successModal').classList.add('open');
  e.target.reset();
}

// ===== MODAL CLOSE =====
function closeModal() {
  document.getElementById('successModal').classList.remove('open');
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function initAnimations() {
  const animatable = document.querySelectorAll(
    '.feature-card, .service-preview-card, .testimonial-card, .mv-card, ' +
    '.service-full-card, .cert-card, .timeline-card, .cyl-card, ' +
    '.contact-info-card, .booking-info-card, .booking-steps-card'
  );
  animatable.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const delay = Math.min(i * 0.04, 0.24);
    el.style.transition = `opacity 0.28s ease ${delay}s, transform 0.28s ease ${delay}s`;
    observer.observe(el);
  });
}

// Add .visible styles
const style = document.createElement('style');
style.textContent = `
  .feature-card.visible, .service-preview-card.visible, .testimonial-card.visible,
  .mv-card.visible, .service-full-card.visible, .cert-card.visible,
  .timeline-card.visible, .cyl-card.visible, .contact-info-card.visible,
  .booking-info-card.visible, .booking-steps-card.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Re-init animations when page changes
const originalShowPage = window.showPage;
window.showPage = function(name) {
  originalShowPage(name);
  requestAnimationFrame(initAnimations);
};

// ===== GALLERY FILTER =====
function filterGallery(cat, btn) {
  document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ===== LIGHTBOX =====
const lbImages = [
  { src: 'WhatsApp Image 2026-06-27 at 12.42.05 (1).jpeg', caption: 'Our Office Counter — Sri Padmavathi HP Gas Agency' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.05 (2).jpeg', caption: 'Office — Wide View' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.03.jpeg', caption: 'Accessories Display' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.07.jpeg', caption: 'Office Interior' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.06.jpeg', caption: 'Customer Service Counter' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.06 (2).jpeg', caption: 'Gas Stoves Showroom' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.04.jpeg', caption: 'Dealer Info Board — Sri Padmavathi Gas Agencies' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.06 (1).jpeg', caption: 'Info Board' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.05.jpeg', caption: 'Showroom — Full View' },
  { src: 'WhatsApp Image 2026-06-27 at 12.42.07 (1).jpeg', caption: 'Equipment & Accessories Display' },
];
let lbCurrent = 0;

function openLightbox(index) {
  lbCurrent = index;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
  updateLightbox();
}
function updateLightbox() {
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = lbImages[lbCurrent].src;
    img.alt = lbImages[lbCurrent].caption;
    document.getElementById('lbCaption').textContent = lbImages[lbCurrent].caption;
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.2s ease';
  }, 150);
}
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  initAnimations();

  // Set min date for booking calendar
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }
});
