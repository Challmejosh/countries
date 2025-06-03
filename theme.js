document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('themeToggle');

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);

  toggleButton.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
});
