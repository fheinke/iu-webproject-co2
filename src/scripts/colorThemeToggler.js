// At Startup: Check for recent color theme selection
document.addEventListener('DOMContentLoaded', function () {
    const currentColorTheme = sessionStorage.getItem('theme')

    if (currentColorTheme === null || currentColorTheme === '') {
        console.log('No color theme selected');
        sessionStorage.setItem('theme', 'light');
    } else {
        toggleColorTheme(currentColorTheme);
    }
}, false);

// On Click of Theme Toggler Button: toggle current color theme
document.getElementById('toggle-color-theme').addEventListener('click', () => {
    document.documentElement.getAttribute('data-bs-theme') === 'light' ? toggleColorTheme('dark') : toggleColorTheme('light');
})

// Toggle color theme to hand over theme
function toggleColorTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.getElementById('toggle-color-theme-image').setAttribute('class', 'bi bi-moon-stars-fill');
        sessionStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.getElementById('toggle-color-theme-image').setAttribute('class', 'bi bi-brightness-high-fill');
        sessionStorage.setItem('theme', 'dark');
    }
}
