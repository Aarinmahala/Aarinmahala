// Enhanced Spotlight Effect with Aceternity UI Inspiration
document.addEventListener('DOMContentLoaded', () => {
  // Create multiple spotlight elements for layered effect
  const spotlightContainer = document.createElement('div');
  spotlightContainer.className = 'spotlight-container';
  document.body.appendChild(spotlightContainer);
  
  // Create primary spotlight
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight primary-spotlight';
  spotlightContainer.appendChild(spotlight);
  
  // Create secondary spotlight for depth
  const secondarySpotlight = document.createElement('div');
  secondarySpotlight.className = 'spotlight secondary-spotlight';
  spotlightContainer.appendChild(secondarySpotlight);
  
  // Create accent spotlight for color variation
  const accentSpotlight = document.createElement('div');
  accentSpotlight.className = 'spotlight accent-spotlight';
  spotlightContainer.appendChild(accentSpotlight);

  // Add spotlight to hero section
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.classList.add('has-spotlight');
  }
  
  // Create spotlight trail effect
  const spotlightTrail = [];
  const maxTrailLength = 5;
  
  // Mouse move handler with enhanced effects
  function handleMouseMove(e) {
    // Only apply full spotlight effect on desktop
    if (window.innerWidth <= 768) return;

    const { clientX, clientY } = e;
    
    // Add current position to trail
    spotlightTrail.unshift({ x: clientX, y: clientY });
    
    // Limit trail length
    if (spotlightTrail.length > maxTrailLength) {
      spotlightTrail.pop();
    }
    
    // Update primary spotlight with current position
    spotlight.style.background = `radial-gradient(
      800px circle at ${clientX}px ${clientY}px,
      rgba(79, 70, 229, 0.15),
      transparent 40%
    )`;
    
    // Update secondary spotlight with slight delay (first trail position)
    if (spotlightTrail.length > 1) {
      const pos1 = spotlightTrail[1];
      secondarySpotlight.style.background = `radial-gradient(
        600px circle at ${pos1.x}px ${pos1.y}px,
        rgba(139, 92, 246, 0.1),
        transparent 40%
      )`;
    }
    
    // Update accent spotlight with more delay (last trail position)
    if (spotlightTrail.length > 3) {
      const pos3 = spotlightTrail[3];
      accentSpotlight.style.background = `radial-gradient(
        400px circle at ${pos3.x}px ${pos3.y}px,
        rgba(217, 70, 239, 0.08),
        transparent 40%
      )`;
    }
  }

  // Touch move handler for mobile with simplified effect
  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      
      // Simplified spotlight effect for touch devices
      spotlight.style.background = `radial-gradient(
        400px circle at ${clientX}px ${clientY}px,
        rgba(79, 70, 229, 0.15),
        transparent 40%
      )`;
    }
  }

  // Add event listeners
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleTouchMove);

  // Enhanced spotlight for profile image
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    // Create multiple layers for depth effect
    const imageSpotlight = document.createElement('div');
    imageSpotlight.className = 'image-spotlight main-layer';
    profileImage.appendChild(imageSpotlight);
    
    const imageSpotlightSecondary = document.createElement('div');
    imageSpotlightSecondary.className = 'image-spotlight secondary-layer';
    profileImage.appendChild(imageSpotlightSecondary);
    
    const imageSpotlightRim = document.createElement('div');
    imageSpotlightRim.className = 'image-spotlight rim-layer';
    profileImage.appendChild(imageSpotlightRim);

    profileImage.addEventListener('mousemove', (e) => {
      const rect = profileImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      // Main spotlight layer
      imageSpotlight.style.background = `radial-gradient(
        150px circle at ${xPercent}% ${yPercent}%,
        rgba(255, 255, 255, 0.4),
        transparent 40%
      )`;
      
      // Secondary spotlight layer with offset
      imageSpotlightSecondary.style.background = `radial-gradient(
        100px circle at ${xPercent + 5}% ${yPercent - 5}%,
        rgba(255, 255, 255, 0.2),
        transparent 40%
      )`;
      
      // Rim light effect
      imageSpotlightRim.style.background = `radial-gradient(
        200px circle at ${xPercent}% ${yPercent}%,
        rgba(79, 70, 229, 0.3),
        transparent 60%
      )`;
      
      // Add 3D tilt effect
      const tiltX = (yPercent / 100) * 10 - 5; // -5 to 5 degrees
      const tiltY = (xPercent / 100) * 10 - 5; // -5 to 5 degrees
      
      profileImage.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    });

    profileImage.addEventListener('mouseleave', () => {
      // Reset all spotlight layers
      imageSpotlight.style.background = 'transparent';
      imageSpotlightSecondary.style.background = 'transparent';
      imageSpotlightRim.style.background = 'transparent';
      
      // Reset transform
      profileImage.style.transform = '';
    });
  }
  
  // Add spotlight to section headers for emphasis
  const sectionHeaders = document.querySelectorAll('section > h2');
  sectionHeaders.forEach(header => {
    // Create header spotlight container
    const headerSpotlight = document.createElement('div');
    headerSpotlight.className = 'header-spotlight';
    
    // Insert spotlight before the header text
    header.parentNode.insertBefore(headerSpotlight, header);
    headerSpotlight.appendChild(header);
    
    // Create spotlight effect
    const headerGlow = document.createElement('div');
    headerGlow.className = 'header-glow';
    headerSpotlight.appendChild(headerGlow);
    
    // Add interactive effect
    headerSpotlight.addEventListener('mousemove', (e) => {
      const rect = headerSpotlight.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      headerGlow.style.background = `radial-gradient(
        100px circle at ${xPercent}% ${yPercent}%,
        rgba(79, 70, 229, 0.3),
        transparent 70%
      )`;
    });
    
    headerSpotlight.addEventListener('mouseleave', () => {
      headerGlow.style.background = `radial-gradient(
        80px circle at 50% 50%,
        rgba(79, 70, 229, 0.15),
        transparent 70%
      )`;
    });
    
    // Initial glow state
    headerGlow.style.background = `radial-gradient(
      80px circle at 50% 50%,
      rgba(79, 70, 229, 0.15),
      transparent 70%
    )`;
  });
});
