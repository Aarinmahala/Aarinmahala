// Cover Demo Component
document.addEventListener('DOMContentLoaded', () => {
  // Import required functions and components
  const { Cover } = window.AceternityUI || {};
  
  // Check if the Cover component is available
  if (!Cover) {
    console.error('Cover component is not available');
    return;
  }
  
  // Find the element to apply the Cover effect to
  const nameElement = document.querySelector('.hero-text h1');
  
  if (nameElement) {
    // Get the text content
    const originalText = nameElement.textContent;
    
    // Clear the element
    nameElement.innerHTML = '';
    
    // Create a span for the "I'm" text
    const prefix = document.createElement('p');
    prefix.textContent = "I'm";
    nameElement.parentNode.insertBefore(prefix, nameElement);
    
    // Create the Cover element
    const coverElement = document.createElement('span');
    coverElement.className = 'cover-effect';
    coverElement.textContent = originalText;
    
    // Apply the Cover effect
    nameElement.appendChild(coverElement);
    
    // Initialize Cover effect
    new Cover(coverElement);
  }
});
