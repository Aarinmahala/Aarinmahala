// Floating Dock Navigation
document.addEventListener('DOMContentLoaded', () => {
  // Get the existing navbar
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    // Create floating dock container
    const floatingDock = document.createElement('div');
    floatingDock.className = 'floating-dock';
    document.body.appendChild(floatingDock);
    
    // Create inner container for dock items
    const dockInner = document.createElement('div');
    dockInner.className = 'dock-inner';
    floatingDock.appendChild(dockInner);
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create dock items based on existing navigation
    navLinks.forEach(link => {
      const dockItem = document.createElement('a');
      dockItem.className = 'dock-item';
      dockItem.href = link.getAttribute('href');
      
      // Copy icon from original nav
      const icon = link.querySelector('i').cloneNode(true);
      dockItem.appendChild(icon);
      
      // Add label
      const label = document.createElement('span');
      label.className = 'dock-label';
      label.textContent = link.querySelector('span:not(.nav-tooltip)').textContent;
      dockItem.appendChild(label);
      
      // Add to dock
      dockInner.appendChild(dockItem);
      
      // Handle active state
      if (link.classList.contains('active')) {
        dockItem.classList.add('active');
      }
    });
    
    // Add scroll event listener to show/hide dock
    let lastScrollTop = 0;
    let isScrollingUp = false;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Determine scroll direction
      isScrollingUp = scrollTop < lastScrollTop;
      
      // Show dock when scrolling up or at top of page
      if (isScrollingUp || scrollTop < 100) {
        floatingDock.classList.add('visible');
      } else {
        floatingDock.classList.remove('visible');
      }
      
      // Update last scroll position
      lastScrollTop = scrollTop;
      
      // Update active link based on scroll position
      updateActiveLink();
    });
    
    // Initialize dock visibility
    setTimeout(() => {
      floatingDock.classList.add('visible');
    }, 1000);
    
    // Add click event listeners to dock items
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Smooth scroll to target
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Smooth scroll to element
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update active state
          dockItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      });
    });
    
    // Function to update active link based on scroll position
    function updateActiveLink() {
      const scrollPosition = window.scrollY;
      
      // Get all sections
      const sections = document.querySelectorAll('section');
      
      // Find current section
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = `#${section.id}`;
        }
      });
      
      // Update active state in dock
      if (currentSectionId) {
        dockItems.forEach(item => {
          if (item.getAttribute('href') === currentSectionId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }
    
    // Add magnetic effect to dock items
    dockItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate distance from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Apply magnetic pull effect (subtle)
        item.style.transform = `
          scale(1.2)
          translateX(${(x - centerX) / 10}px)
          translateY(${(y - centerY) / 10}px)
        `;
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }
});
