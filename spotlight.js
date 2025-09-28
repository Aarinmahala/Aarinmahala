// Spotlight Effect
document.addEventListener('DOMContentLoaded', () => {
  // Create spotlight element
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  document.body.appendChild(spotlight);

  // Add spotlight to hero section
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.classList.add('has-spotlight');
  }

  // Mouse move handler
  function handleMouseMove(e) {
    // Only apply spotlight effect on desktop
    if (window.innerWidth <= 768) return;

    const { clientX, clientY } = e;
    
    // Update spotlight position with smooth transition
    spotlight.style.background = `radial-gradient(
      600px circle at ${clientX}px ${clientY}px,
      rgba(79, 70, 229, 0.15),
      transparent 40%
    )`;
  }

  // Touch move handler for mobile
  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      
      spotlight.style.background = `radial-gradient(
        300px circle at ${clientX}px ${clientY}px,
        rgba(79, 70, 229, 0.15),
        transparent 40%
      )`;
    }
  }

  // Add event listeners
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleTouchMove);

  // Add spotlight to profile image for highlight effect
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    const imageSpotlight = document.createElement('div');
    imageSpotlight.className = 'image-spotlight';
    profileImage.appendChild(imageSpotlight);

    profileImage.addEventListener('mousemove', (e) => {
      const rect = profileImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      imageSpotlight.style.background = `radial-gradient(
        120px circle at ${x}px ${y}px,
        rgba(255, 255, 255, 0.4),
        transparent 40%
      )`;
    });

    profileImage.addEventListener('mouseleave', () => {
      imageSpotlight.style.background = 'transparent';
    });
  }
});
