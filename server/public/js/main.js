document.addEventListener('DOMContentLoaded', function() {
const links = document.querySelectorAll('a');

// Loop through each link
links.forEach(link => {
  // If the href of the link matches the current path
  if (window.location.pathname.includes(link.getAttribute('href'))) {
    // Add a class to highlight the link
    const buttonDiv = link.querySelector('div[role="button"]');
    
    // If the div exists
    if (buttonDiv) {
      // Add a class to highlight the div
      buttonDiv.classList.add('bg-blue-100', 'bg-opacity-80');
    }
  }
});
});