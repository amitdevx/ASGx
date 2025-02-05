import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);



// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});


// hover to speech 
const aboutSection = document.getElementById("speak");
const aboutAudio = document.getElementById("about-audio");

aboutSection.addEventListener("mouseenter", () => {
  aboutAudio.currentTime = 0; // Restart audio from the beginning
  aboutAudio.play();
});

aboutSection.addEventListener("mouseleave", () => {
  aboutAudio.pause();
  aboutAudio.currentTime = 0; // Reset when hover ends
});


// GSAP Animations
// Hero Section Animation
gsap.from('.hero-content', {
  opacity: 0,
  y: 100,
  duration: 1,
  ease: 'power4.out'
});

gsap.from('.blob', {
  opacity: 0,
  scale: 0,
  duration: 1,
  delay: 0.5,
  ease: 'power4.out'
});
//autotyping 
const texts = [" I'm a Mobile App Developer ", "I'm a Web Designer"];
const typingText = document.querySelector('.typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingText.textContent += currentText.charAt(charIndex);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 700); // Pause before deleting
      return;
    }
  } else {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // Switch text
    }
  }

  setTimeout(typeWriter, isDeleting ? 50 : 100); // Typing and deleting speed
}

typeWriter();

// Scroll Animations
const sections = ['about', 'skills', 'timeline', 'projects', 'contact'];

sections.forEach(section => {
  gsap.from(`#${section}`, {
    scrollTrigger: {
      trigger: `#${section}`,
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });
});

// Skill Cards Animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    rotation: -5,
    duration: 0.6,
    delay: index * 0.1,
    ease: 'back.out(1.7)'
  });
});


// Timeline Animation
gsap.from('.timeline-item', {
  scrollTrigger: {
    trigger: '.timeline-container',
    start: 'top center+=100'
  },
  opacity: 0,
  x: -50,
  duration: 0.8,
  stagger: 0.3,
  ease: 'power3.out'
});
// Project Cards and Modal
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalContent = modal.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const content = card.cloneNode(true);
    content.querySelector('.project-details').style.display = 'block';
    modalContent.innerHTML = '';
    modalContent.appendChild(content);

    modal.classList.add('active');
    gsap.to(modal, {
      display: 'block',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.from(content, {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  });
});

closeModal.addEventListener('click', () => {
  gsap.to(modal, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  });
});
// Contact Form
(function () {
  emailjs.init({
    publicKey: "d7pCxKyHNoiXYRjac",
  });
})();

function sendEmail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  }


  const serviceId = "service_g79z8ke"
  const templateId = "template_ox7uwmq"

  emailjs.send(serviceId, templateId, params).then(
    res => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Message sent successfully");
    }
  ).catch((error) => console.log(error));

}

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  sendEmail(); // Call the sendEmail function
});



// Hover Effects
const buttons = document.querySelectorAll('.cta-button, .submit-btn');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3
    });
  });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('nav-open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('nav-open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navbar.classList.remove('nav-open');
  }
});