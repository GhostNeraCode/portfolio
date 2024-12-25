// Animate sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-section');
    animateOnScroll.observe(section);
});

// Enhanced background animation
const backgroundAnimation = document.querySelector('.background-animation');

// Add stars
function createStars() {
    const numberOfStars = 50;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        backgroundAnimation.appendChild(star);
    }
}

// Add floating particles
function createParticles() {
    const numberOfParticles = 30;
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.transform = `scale(${Math.random() * 2})`;
        backgroundAnimation.appendChild(particle);
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const duration = 15000 + Math.random() * 10000;
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const angle = Math.random() * Math.PI * 2;
    const radius = 100 + Math.random() * 100;
    
    let start = null;
    
    function move(timestamp) {
        if (!start) start = timestamp;
        const progress = ((timestamp - start) % duration) / duration;
        
        const x = startX + Math.cos(angle + progress * Math.PI * 2) * radius;
        const y = startY + Math.sin(angle + progress * Math.PI * 2) * radius;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        requestAnimationFrame(move);
    }
    
    requestAnimationFrame(move);
}

// Interactive gradient spheres
const gradientSpheres = document.querySelectorAll('.gradient-sphere');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;
    
    gradientSpheres.forEach((sphere, index) => {
        const speed = index === 1 ? -40 : 40;
        const rotationSpeed = index === 1 ? -5 : 5;
        const x = deltaX * speed;
        const y = deltaY * speed;
        const rotation = (deltaX + deltaY) * rotationSpeed;
        
        sphere.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    });
});

// Initialize background elements
createStars();
createParticles();

// Skill cards animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
});

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

skillCards.forEach(card => {
    skillsObserver.observe(card);
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add CSS class for section animations
const style = document.createElement('style');
style.textContent = `
    .animate-section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Update roadmap animation for horizontal layout
const roadmapItems = document.querySelectorAll('.roadmap-item');
const roadmapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Add staggered animation delay based on item index
            const index = Array.from(roadmapItems).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.2}s`;
            
            // Only unobserve after animation is complete
            setTimeout(() => {
                roadmapObserver.unobserve(entry.target);
            }, (index * 200) + 500);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-50px'
});

roadmapItems.forEach(item => {
    roadmapObserver.observe(item);
});

// Add smooth scroll for roadmap
const roadmap = document.querySelector('.roadmap');
let isDown = false;
let startX;
let scrollLeft;

roadmap.addEventListener('mousedown', (e) => {
    isDown = true;
    roadmap.style.cursor = 'grabbing';
    startX = e.pageX - roadmap.offsetLeft;
    scrollLeft = roadmap.scrollLeft;
});

roadmap.addEventListener('mouseleave', () => {
    isDown = false;
    roadmap.style.cursor = 'grab';
});

roadmap.addEventListener('mouseup', () => {
    isDown = false;
    roadmap.style.cursor = 'grab';
});

roadmap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - roadmap.offsetLeft;
    const walk = (x - startX) * 2;
    roadmap.scrollLeft = scrollLeft - walk;
}); 
