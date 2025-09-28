// 3D Card Effect
document.addEventListener('DOMContentLoaded', () => {
  // Apply 3D effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Add 3D card class
    card.classList.add('card-3d');
    
    // Create shine effect element
    const shineEffect = document.createElement('div');
    shineEffect.className = 'shine-effect';
    card.appendChild(shineEffect);
    
    // Add event listeners for mouse movement
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    
    // Add touch support for mobile
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleMouseLeave);
  });
  
  // Handle mouse movement for 3D effect
  function handleMouseMove(e) {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const shineEffect = card.querySelector('.shine-effect');
    
    // Calculate mouse position relative to card
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;
    
    // Convert to percentage
    const xPercent = x / cardRect.width;
    const yPercent = y / cardRect.height;
    
    // Calculate rotation (max 10 degrees)
    const rotateX = (0.5 - yPercent) * 20;
    const rotateY = (xPercent - 0.5) * 20;
    
    // Apply 3D rotation transform
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
    
    // Update shine effect
    if (shineEffect) {
      shineEffect.style.background = `
        radial-gradient(
          circle at ${xPercent * 100}% ${yPercent * 100}%,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 80%
        )
      `;
    }
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
      
      // Convert to percentage
      const xPercent = x / cardRect.width;
      const yPercent = y / cardRect.height;
      
      // Calculate rotation (reduced for touch - max 5 degrees)
      const rotateX = (0.5 - yPercent) * 10;
      const rotateY = (xPercent - 0.5) * 10;
      
      // Apply 3D rotation transform
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
      
      // Update shine effect
      if (shineEffect) {
        shineEffect.style.background = `
          radial-gradient(
            circle at ${xPercent * 100}% ${yPercent * 100}%,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0) 80%
          )
        `;
      }
      
      // Prevent default to avoid scrolling while interacting with card
      e.preventDefault();
    }
  }
  
  // Reset card on mouse leave
  function handleMouseLeave(e) {
    const card = e.currentTarget;
    const shineEffect = card.querySelector('.shine-effect');
    
    // Reset transform with smooth transition
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
    
    // Reset shine effect
    if (shineEffect) {
      shineEffect.style.background = 'none';
    }
  }
  
  // Add subtle animation on mouse enter
  function handleMouseEnter(e) {
    const card = e.currentTarget;
    
    // Slight initial animation
    card.style.transform = `
      perspective(1000px)
      rotateX(2deg)
      rotateY(2deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  }
});
