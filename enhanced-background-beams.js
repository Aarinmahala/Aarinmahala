// Enhanced Background Beams with Collision Effect
document.addEventListener('DOMContentLoaded', () => {
  const beamsContainer = document.createElement('div');
  beamsContainer.className = 'background-beams';
  document.body.appendChild(beamsContainer);

  // Configuration with improved settings
  const config = {
    beamCount: 15,
    maxBeamWidth: 15,
    minBeamWidth: 3,
    maxBeamHeight: 300,
    minBeamHeight: 100,
    maxSpeed: 1.2,
    minSpeed: 0.3,
    maxOpacity: 0.6,
    minOpacity: 0.1,
    colors: ['#4f46e5', '#8b5cf6', '#d946ef', '#2563eb', '#0ea5e9', '#06b6d4', '#14b8a6'],
    collisionForce: 0.8,
    friction: 0.98
  };

  // Beam class with improved physics
  class Beam {
    constructor(id) {
      this.id = id;
      this.element = document.createElement('div');
      this.element.className = 'beam';
      beamsContainer.appendChild(this.element);
      
      this.reset();
      this.collisions = [];
    }
    
    reset() {
      // Random position, size, speed, and color
      this.width = Math.random() * (config.maxBeamWidth - config.minBeamWidth) + config.minBeamWidth;
      this.height = Math.random() * (config.maxBeamHeight - config.minBeamHeight) + config.minBeamHeight;
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.speedX = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
      this.speedY = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
      this.opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 0.5;
      this.mass = this.width * this.height / 1000;
      
      // Apply styles
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      this.element.style.opacity = this.opacity;
      this.element.style.backgroundColor = this.color;
      this.element.style.boxShadow = `0 0 30px ${this.color}`;
      this.element.style.transform = `rotate(${this.rotation}deg)`;
      
      // Add data attribute for identification
      this.element.dataset.beamId = this.id;
    }
    
    update(beams) {
      // Update position
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Apply friction
      this.speedX *= config.friction;
      this.speedY *= config.friction;
      
      // Update rotation
      this.rotation += this.rotationSpeed;
      
      // Check for collisions with other beams
      this.checkCollisions(beams);
      
      // Boundary check with bounce effect
      if (this.x < -this.width) {
        this.x = -this.width;
        this.speedX = Math.abs(this.speedX);
      }
      if (this.x > window.innerWidth) {
        this.x = window.innerWidth;
        this.speedX = -Math.abs(this.speedX);
      }
      if (this.y < -this.height) {
        this.y = -this.height;
        this.speedY = Math.abs(this.speedY);
      }
      if (this.y > window.innerHeight) {
        this.y = window.innerHeight;
        this.speedY = -Math.abs(this.speedY);
      }
      
      // Apply new position and rotation
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      this.element.style.transform = `rotate(${this.rotation}deg)`;
    }
    
    checkCollisions(beams) {
      beams.forEach(beam => {
        // Don't check collision with self
        if (beam.id === this.id) return;
        
        // Simple bounding box collision detection
        const dx = (this.x + this.width / 2) - (beam.x + beam.width / 2);
        const dy = (this.y + this.height / 2) - (beam.y + beam.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (this.width + this.height + beam.width + beam.height) / 8;
        
        if (distance < minDistance && !this.collisions.includes(beam.id)) {
          // Add to collision list to prevent multiple collisions in same frame
          this.collisions.push(beam.id);
          beam.collisions.push(this.id);
          
          // Calculate collision response
          const angle = Math.atan2(dy, dx);
          const totalMass = this.mass + beam.mass;
          const force = config.collisionForce;
          
          // Apply impulse based on mass
          const impulseX = Math.cos(angle) * force;
          const impulseY = Math.sin(angle) * force;
          
          this.speedX += impulseX * (beam.mass / totalMass);
          this.speedY += impulseY * (beam.mass / totalMass);
          beam.speedX -= impulseX * (this.mass / totalMass);
          beam.speedY -= impulseY * (this.mass / totalMass);
          
          // Create collision effect
          createCollisionEffect(this.x + this.width / 2, this.y + this.height / 2, this.color);
        }
      });
      
      // Reset collision list after each frame
      this.collisions = [];
    }
  }

  // Create beams
  const beams = Array.from({ length: config.beamCount }, (_, i) => new Beam(i));

  // Animation loop
  function animate() {
    beams.forEach(beam => beam.update(beams));
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Create collision effect
  function createCollisionEffect(x, y, color) {
    const effect = document.createElement('div');
    effect.className = 'beam-collision';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.style.backgroundColor = color;
    beamsContainer.appendChild(effect);
    
    // Remove effect after animation completes
    setTimeout(() => {
      effect.remove();
    }, 500);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    beams.forEach(beam => beam.reset());
  });
  
  // Add exploding beams on click
  document.addEventListener('click', (e) => {
    createExplodingBeams(e.clientX, e.clientY);
  });
  
  // Create exploding beams effect
  function createExplodingBeams(x, y) {
    const particleCount = 8;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'exploding-beam';
      beamsContainer.appendChild(particle);
      
      // Random properties
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      const size = 5 + Math.random() * 15;
      const distance = 50 + Math.random() * 100;
      const duration = 500 + Math.random() * 1000;
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 20px ${color}`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      // Store particle data
      particles.push({
        element: particle,
        startX: x,
        startY: y,
        targetX: x + Math.cos(angle) * distance,
        targetY: y + Math.sin(angle) * distance,
        speed: speed,
        progress: 0
      });
    }
    
    // Animate particles
    const startTime = performance.now();
    
    function animateParticles(timestamp) {
      const elapsed = timestamp - startTime;
      let allDone = true;
      
      particles.forEach(particle => {
        if (particle.progress < 1) {
          allDone = false;
          particle.progress = Math.min(1, elapsed / 1000);
          
          // Easing function for smooth animation
          const easing = 1 - Math.pow(1 - particle.progress, 3);
          
          // Calculate current position
          const currentX = particle.startX + (particle.targetX - particle.startX) * easing;
          const currentY = particle.startY + (particle.targetY - particle.startY) * easing;
          
          // Apply position
          particle.element.style.left = `${currentX}px`;
          particle.element.style.top = `${currentY}px`;
          
          // Fade out at the end
          if (particle.progress > 0.7) {
            const opacity = 1 - ((particle.progress - 0.7) / 0.3);
            particle.element.style.opacity = opacity;
          }
        }
      });
      
      if (!allDone) {
        requestAnimationFrame(animateParticles);
      } else {
        // Remove all particles
        particles.forEach(particle => particle.element.remove());
      }
    }
    
    requestAnimationFrame(animateParticles);
  }
});
