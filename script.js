// Scroll-triggered animation for social icons
const icons = document.querySelectorAll('.social-icon');

function checkIcons() {
  const triggerBottom = window.innerHeight * 0.85;

  icons.forEach(icon => {
    const iconTop = icon.getBoundingClientRect().top;

    if (iconTop < triggerBottom) {
      icon.classList.add('show');
    }
  });
}

window.addEventListener('scroll', checkIcons);
window.addEventListener('load', checkIcons);

// Scroll-triggered animation for project cards
const projectCards = document.querySelectorAll('#projects .project-card');

function checkProjectCards() {
  const triggerBottom = window.innerHeight * 0.85;

  projectCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add('show');
      // Optional stagger effect
      card.style.transitionDelay = `${index * 0.2}s`;
    }
  });
}

window.addEventListener('scroll', checkProjectCards);
window.addEventListener('load', checkProjectCards);


// Hero section particle animation
setTimeout(() => {
const hero = document.querySelector('.hero');
const particleCount = 50; 

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random initial position
  particle.style.top = Math.random() * hero.offsetHeight + 'px';
  particle.style.left = Math.random() * hero.offsetWidth + 'px';
  
  // Random size
  const size = Math.random() * 5 + 4;
  particle.style.width = particle.style.height = size + 'px';
  
  // Random color variation
  const colors = ['#dfc0d4ff','#0f8100ff','#ffff00','#ff4500'];
  particle.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
  
  hero.appendChild(particle);
  
  animateParticle3D(particle);
}

function animateParticle3D(particle) {
  const heroWidth = hero.offsetWidth;
  const heroHeight = hero.offsetHeight;
  
  const newX = Math.random() * heroWidth;
  const newY = Math.random() * heroHeight;
  const newZ = Math.random() * 200 - 100; // Z axis variation for 3D effect
  const duration = Math.random() * 5000 + 4000; // 4-9 sec

  particle.animate(
    [
      { transform: `translate3d(0,0,0)` },
      { transform: `translate3d(${newX - particle.offsetLeft}px, ${newY - particle.offsetTop}px, ${newZ}px)` }
    ],
    {
      duration: duration,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    }
  );
}
 },999);

// Three.js setup
const canvas = document.getElementById('dragon3D');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// Dragon tail points
const maxPoints = 100;
const tailPoints = [];
const tailGeometry = new THREE.BufferGeometry();
const tailMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });

for(let i=0; i<maxPoints; i++){
    tailPoints.push(new THREE.Vector3(0,0,0));
}

tailGeometry.setFromPoints(tailPoints);
const tailLine = new THREE.Line(tailGeometry, tailMaterial);
scene.add(tailLine);

let mouseX = 0;
let mouseY = 0;

// Mouse / touch events
window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth) * 100 - 50;
    mouseY = -(e.clientY / window.innerHeight) * 100 + 50;
});

window.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    mouseX = (touch.clientX / window.innerWidth) * 100 - 50;
    mouseY = -(touch.clientY / window.innerHeight) * 100 + 50;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Shift tail points
    for(let i=maxPoints-1; i>0; i--){
        tailPoints[i].x = tailPoints[i-1].x;
        tailPoints[i].y = tailPoints[i-1].y;
        tailPoints[i].z = tailPoints[i-1].z * 0.95; // slight depth effect
    }

    // Move head towards mouse
    tailPoints[0].x += (mouseX - tailPoints[0].x) * 0.1;
    tailPoints[0].y += (mouseY - tailPoints[0].y) * 0.1;
    tailPoints[0].z = Math.sin(Date.now()*0.002)*10;

    tailGeometry.setFromPoints(tailPoints);
    renderer.render(scene, camera);
}

animate();

// Window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
