document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('logout-link');

  logoutLink.addEventListener('click', function(e) {
    e.preventDefault();

    fetch('/api/auth/logout', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = '/admin/login';
    })
    .catch(error => {
      // Handle network error
      console.error('Network error:', error);
    });
  });
});