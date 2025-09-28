// Instant Progress Bar Implementation
(() => {
  // Execute immediately when the script loads
  const progressBar = document.querySelector('.progress-bar');
  
  if (!progressBar) return;
  
  // Direct update function with no delays
  const updateProgress = () => {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Apply width directly without requestAnimationFrame
    progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
  };
  
  // Use passive event listener with no throttling for immediate response
  window.addEventListener('scroll', updateProgress, { passive: true });
  
  // Initialize progress immediately
  updateProgress();
  
  // Update on resize
  window.addEventListener('resize', updateProgress, { passive: true });
  
  // Ensure it's updated when all content loads
  window.addEventListener('load', updateProgress);
})();
