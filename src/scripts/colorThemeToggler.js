// At Startup: Check for recent color theme selection
document.addEventListener('DOMContentLoaded', function () {
    const getStoredTheme = sessionStorage.getItem('theme')

    if (getStoredTheme === null || getStoredTheme === '') {
        console.log('No theme selected');
        sessionStorage.setItem('theme', 'light');
    } else {
        toggleColorTheme(getStoredTheme);
    }
}, false);

// On Click of Toggler Button: toggle current color theme
document.getElementById('toggle-color-theme').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') === 'light') {
        toggleColorTheme('dark')
    } else {
        toggleColorTheme('light')
    }
})

// Toggle color theme to transferred theme
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
