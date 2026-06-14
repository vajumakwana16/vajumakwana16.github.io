// script.js

// Custom Cursor & Magnetic Buttons
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
const magnetics = document.querySelectorAll('.magnetic');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Slight delay for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            cursor.style.transform = `translate(-50%, -50%) scale(0.5)`;
            follower.style.transform = `translate(-50%, -50%) scale(1.5)`;
            follower.style.borderColor = 'transparent';
            follower.style.backgroundColor = 'rgba(255,255,255,0.1)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            cursor.style.transform = `translate(-50%, -50%) scale(1)`;
            follower.style.transform = `translate(-50%, -50%) scale(1)`;
            follower.style.borderColor = 'var(--accent-glow)';
            follower.style.backgroundColor = 'transparent';
        });
    });
    
    // Hover over links
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        if (!el.classList.contains('magnetic')) {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = `translate(-50%, -50%) scale(1.5)`;
                follower.style.backgroundColor = 'rgba(255,255,255,0.05)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.transform = `translate(-50%, -50%) scale(1)`;
                follower.style.backgroundColor = 'transparent';
            });
        }
    });
}

// Mouse Follow Glow (Hero)
const mouseGlow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.pageX + 'px';
    mouseGlow.style.top = e.pageY + 'px';
});

// Scroll Progress & Navbar styling
const scrollProgress = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
    
    // Navbar
    if (winScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme Toggle (Dark/Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Reveal Animations on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, parseInt(delay));
            } else {
                entry.target.classList.add('active');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) => {
    observer.observe(el);
});

// Active Nav Link updating
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // animate hamburger spans
    const spans = hamburger.querySelectorAll('span');
    if(mobileMenu.classList.contains('active')){
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Testimonials Carousel
const track = document.getElementById('testimonials-track');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentIndex = 0;

function updateCarousel(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % dots.length;
    updateCarousel(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    updateCarousel(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel(currentIndex);
    });
});

// Projects Carousel
const projTrack = document.querySelector('.projects-carousel .carousel-track');
const projPrev = document.querySelector('.projects-carousel .carousel-btn.prev');
const projNext = document.querySelector('.projects-carousel .carousel-btn.next');
const projDotsContainer = document.querySelector('.projects-carousel .carousel-dots');
let projCurrent = 0;
let projSlides = Array.from(projTrack.children).filter(el => el.classList.contains('project-card'));

function createProjDots() {
  projSlides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('proj-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      projCurrent = i;
      updateProjCarousel();
    });
    projDotsContainer.appendChild(dot);
  });
}

function updateProjCarousel() {
  projTrack.style.transform = `translateX(-${projCurrent * 100}%)`;
  const dots = projDotsContainer.querySelectorAll('.proj-dot');
  dots.forEach(d => d.classList.remove('active'));
  if (dots[projCurrent]) dots[projCurrent].classList.add('active');
}

projNext.addEventListener('click', () => {
  projCurrent = (projCurrent + 1) % projSlides.length;
  updateProjCarousel();
});

projPrev.addEventListener('click', () => {
  projCurrent = (projCurrent - 1 + projSlides.length) % projSlides.length;
  updateProjCarousel();
});

// Initialize dots and autoplay
createProjDots();
let projInterval = setInterval(() => {
  projNext.click();
}, 5000);

// Pause autoplay on mouse hover, resume on mouse leave
const projCarouselEl = document.querySelector('.projects-carousel');
if (projCarouselEl) {
  projCarouselEl.addEventListener('mouseenter', () => {
    clearInterval(projInterval);
  });
  projCarouselEl.addEventListener('mouseleave', () => {
    projInterval = setInterval(() => {
      projNext.click();
    }, 5000);
  });
}

// Particles background (Hero Canvas)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.5) - 0.25;
        let directionY = (Math.random() * 0.5) - 0.25;
        let color = 'rgba(255, 255, 255, 0.2)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
