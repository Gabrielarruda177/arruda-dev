/* =======================
   PRELOADER
======================= */
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add('hide');
  }, 1500);
});

/* =======================
   AOS
======================= */
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }
});

/* =======================
   MENU MOBILE
======================= */
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* =======================
   SCROLL SUAVE
======================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    const header = document.querySelector('.header');
    if (!target || !header) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - header.offsetHeight,
      behavior: 'smooth'
    });
  });
});

/* =======================
   HEADER SCROLL
======================= */
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

/* =======================
   NAV ATIVA
======================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop - (header?.offsetHeight || 0) - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* =======================
   CONTADORES
======================= */
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function countUp() {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(countUp, 20);
    } else {
      counter.innerText = target;
    }
  });
}

function checkCounter() {
  const section = document.querySelector('.stats');
  if (!section || section.classList.contains('counted')) return;

  if (section.getBoundingClientRect().top < window.innerHeight / 1.5) {
    countUp();
    section.classList.add('counted');
  }
}

window.addEventListener('scroll', checkCounter);
document.addEventListener('DOMContentLoaded', checkCounter);

/* =======================
   DEPOIMENTOS
======================= */
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

if (testimonials.length) {
  let interval = setInterval(() => {
    showTestimonial((currentTestimonial + 1) % testimonials.length);
  }, 5000);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      showTestimonial(index);
      interval = setInterval(() => {
        showTestimonial((currentTestimonial + 1) % testimonials.length);
      }, 5000);
    });
  });
}

/* =======================
   FORMULÁRIO EMAILJS
======================= */
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    formMessage.textContent = 'Enviando...';
    formMessage.className = 'form-message';

    emailjs.send("service_kpyi8yu", "template_9m2gdwp", {
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      message: message.value
    })
    .then(() => {
      formMessage.textContent = 'Mensagem enviada com sucesso! 🚀';
      formMessage.classList.add('success');
      contactForm.reset();
    })
    .catch(err => {
      console.error(err);
      formMessage.textContent = 'Erro ao enviar. Tente novamente.';
      formMessage.classList.add('error');
    });
  });
}

/* =======================
   BACK TO TOP
======================= */
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.scrollY > 500);
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =======================
   PARALLAX
======================= */
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
  window.addEventListener('scroll', () => {
    heroImage.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  });
}