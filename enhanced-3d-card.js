// Enhanced 3D Card Effect with Aceternity UI Physics
document.addEventListener('DOMContentLoaded', () => {
  // Apply 3D effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Add 3D card class
    card.classList.add('card-3d');
    
    // Create layered effects for depth
    const cardContent = card.querySelector('.project-content');
    
    // Create shine effect element
    const shineEffect = document.createElement('div');
    shineEffect.className = 'shine-effect';
    card.appendChild(shineEffect);
    
    // Create edge highlight for 3D appearance
    const edgeHighlight = document.createElement('div');
    edgeHighlight.className = 'edge-highlight';
    card.appendChild(edgeHighlight);
    
    // Create shadow for enhanced depth
    const cardShadow = document.createElement('div');
    cardShadow.className = 'card-shadow';
    card.appendChild(cardShadow);
    
    // Create glow effect
    const cardGlow = document.createElement('div');
    cardGlow.className = 'card-glow';
    card.appendChild(cardGlow);
    
    // Create inner elements for parallax effect
    if (cardContent) {
      // Add parallax container
      cardContent.classList.add('parallax-container');
      
      // Get inner elements and add parallax layers
      const title = cardContent.querySelector('h3');
      const description = cardContent.querySelector('p');
      const techDiv = cardContent.querySelector('.project-tech');
      const linksDiv = cardContent.querySelector('.project-links');
      
      if (title) title.classList.add('parallax-layer', 'layer-1');
      if (description) description.classList.add('parallax-layer', 'layer-2');
      if (techDiv) techDiv.classList.add('parallax-layer', 'layer-3');
      if (linksDiv) linksDiv.classList.add('parallax-layer', 'layer-4');
    }
    
    // Add event listeners for mouse movement with enhanced physics
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    
    // Add touch support for mobile with simplified effects
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleMouseLeave);
  });
  
  // Handle mouse movement for 3D effect with enhanced physics
  function handleMouseMove(e) {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const shineEffect = card.querySelector('.shine-effect');
    const edgeHighlight = card.querySelector('.edge-highlight');
    const cardShadow = card.querySelector('.card-shadow');
    const cardGlow = card.querySelector('.card-glow');
    
    // Calculate mouse position relative to card
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;
    
    // Convert to percentage (-0.5 to 0.5 range)
    const xPercent = (x / cardRect.width) - 0.5;
    const yPercent = (y / cardRect.height) - 0.5;
    
    // Calculate rotation with smoother curve and limits
    const rotateX = -yPercent * 20; // -10 to 10 degrees
    const rotateY = xPercent * 20; // -10 to 10 degrees
    
    // Apply 3D rotation transform with easing
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
      translateZ(10px)
    `;
    
    // Update shine effect based on mouse position
    if (shineEffect) {
      // Convert to percentage (0 to 100 range)
      const xPercentPos = (x / cardRect.width) * 100;
      const yPercentPos = (y / cardRect.height) * 100;
      
      shineEffect.style.background = `
        radial-gradient(
          circle at ${xPercentPos}% ${yPercentPos}%,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(255, 255, 255, 0) 80%
        )
      `;
    }
    
    // Update edge highlight for 3D effect
    if (edgeHighlight) {
      // Calculate edge highlight position based on mouse position
      const edgeX = Math.max(0, Math.min(100, xPercent * 100 + 50));
      const edgeY = Math.max(0, Math.min(100, yPercent * 100 + 50));
      
      // Apply styles
      edgeHighlight.style.background = `
        linear-gradient(
          ${Math.atan2(yPercent, xPercent) * (180 / Math.PI) + 90}deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0) 50%
        )
      `;
    }
    
    // Update shadow position for realistic effect
    if (cardShadow) {
      const shadowX = -xPercent * 15;
      const shadowY = -yPercent * 15;
      const shadowBlur = 20 + Math.abs(xPercent * yPercent) * 30;
      
      cardShadow.style.transform = `translateX(${shadowX}px) translateY(${shadowY}px)`;
      cardShadow.style.boxShadow = `0 ${5 + shadowBlur}px ${shadowBlur}px rgba(0, 0, 0, 0.3)`;
    }
    
    // Update glow effect
    if (cardGlow) {
      const glowX = xPercent * 100 + 50;
      const glowY = yPercent * 100 + 50;
      
      cardGlow.style.background = `
        radial-gradient(
          circle at ${glowX}% ${glowY}%,
          rgba(79, 70, 229, 0.4) 0%,
          rgba(79, 70, 229, 0) 70%
        )
      `;
    }
    
    // Apply parallax effect to inner elements
    const parallaxLayers = card.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
      let depthFactor = 0;
      
      if (layer.classList.contains('layer-1')) depthFactor = 20;
      else if (layer.classList.contains('layer-2')) depthFactor = 15;
      else if (layer.classList.contains('layer-3')) depthFactor = 10;
      else if (layer.classList.contains('layer-4')) depthFactor = 5;
      
      const layerX = xPercent * depthFactor;
      const layerY = yPercent * depthFactor;
      
      layer.style.transform = `translateX(${layerX}px) translateY(${layerY}px)`;
    });
  }
  
  // Handle touch movement for mobile
  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const card = e.currentTarget;
      const cardRect = card.getBoundingClientRect();
      const shineEffect = card.querySelector('.shine-effect');
      
      // Calculate touch position relative to card
      const x = touch.clientX - cardRect.left;
      const y = touch.clientY - cardRect.top;
      
      // Convert to percentage (-0.5 to 0.5 range)
      const xPercent = (x / cardRect.width) - 0.5;
      const yPercent = (y / cardRect.height) - 0.5;
      
      // Calculate rotation (reduced for touch - max 5 degrees)
      const rotateX = -yPercent * 10;
      const rotateY = xPercent * 10;
      
      // Apply 3D rotation transform
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
      
      // Update shine effect
      if (shineEffect) {
        // Convert to percentage (0 to 100 range)
        const xPercentPos = (x / cardRect.width) * 100;
        const yPercentPos = (y / cardRect.height) * 100;
        
        shineEffect.style.background = `
          radial-gradient(
            circle at ${xPercentPos}% ${yPercentPos}%,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0) 80%
          )
        `;
      }
      
      // Prevent default to avoid scrolling while interacting with card
      e.preventDefault();
    }
  }
  
  // Reset card on mouse leave with smooth transition
  function handleMouseLeave(e) {
    const card = e.currentTarget;
    const shineEffect = card.querySelector('.shine-effect');
    const edgeHighlight = card.querySelector('.edge-highlight');
    const cardShadow = card.querySelector('.card-shadow');
    const cardGlow = card.querySelector('.card-glow');
    
    // Reset transform with smooth transition
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
      translateZ(0)
    `;
    
    // Reset shine effect
    if (shineEffect) {
      shineEffect.style.background = 'none';
    }
    
    // Reset edge highlight
    if (edgeHighlight) {
      edgeHighlight.style.background = 'none';
    }
    
    // Reset shadow
    if (cardShadow) {
      cardShadow.style.transform = '';
      cardShadow.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    // Reset glow
    if (cardGlow) {
      cardGlow.style.background = 'none';
    }
    
    // Reset parallax layers
    const parallaxLayers = card.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
      layer.style.transform = '';
    });
  }
  
  // Add subtle animation on mouse enter
  function handleMouseEnter(e) {
    const card = e.currentTarget;
    const cardGlow = card.querySelector('.card-glow');
    
    // Slight initial animation
    card.style.transform = `
      perspective(1000px)
      rotateX(2deg)
      rotateY(2deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    // Initial glow
    if (cardGlow) {
      cardGlow.style.background = `
        radial-gradient(
          circle at 50% 50%,
          rgba(79, 70, 229, 0.2) 0%,
          rgba(79, 70, 229, 0) 70%
        )
      `;
    }
  }
});
