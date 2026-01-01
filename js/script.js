window.addEventListener('DOMContentLoaded', () => {
  
  // Hide nav menu when screen resized
  window.matchMedia('(min-width: 992px)').addEventListener('change', (e) => {
    if (e.matches) {
      document.getElementById('menu-checkbox').checked = false;
    }
  });

});