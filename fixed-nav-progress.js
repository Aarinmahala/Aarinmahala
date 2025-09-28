// Fixed Navigation Progress Bar
document.addEventListener('DOMContentLoaded', () => {
  // Get the progress bar element
  const progressBar = document.querySelector('.progress-bar');
  
  if (progressBar) {
    // Create a more responsive update function
    const updateProgress = () => {
      // Calculate scroll position
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
      });
    };
    
    // Add throttled scroll event listener for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Initialize progress on page load
    updateProgress();
    
    // Update on window resize (in case document height changes)
    window.addEventListener('resize', updateProgress, { passive: true });
    
    // Update when all images and resources are loaded
    window.addEventListener('load', updateProgress);
    
    // Also update when DOM content is loaded
    updateProgress();
  }
});
