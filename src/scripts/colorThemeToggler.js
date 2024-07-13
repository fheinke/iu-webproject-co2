document.addEventListener("DOMContentLoaded", function () {
    const getStoredTheme = localStorage.getItem('theme')

    if (getStoredTheme === null || getStoredTheme === '') {
        console.log('No theme selected');
        localStorage.setItem('theme', 'light');
    } else {
        toggleColorTheme(getStoredTheme);
    }
}, false);

document.getElementById('toggle-color-theme').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') === 'light') {
        toggleColorTheme('dark')
    } else {
        toggleColorTheme('light')
    }
})

function toggleColorTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.getElementById('toggle-color-theme-image').setAttribute('class', 'bi bi-moon-stars-fill');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.getElementById('toggle-color-theme-image').setAttribute('class', 'bi bi-brightness-high-fill');
        localStorage.setItem('theme', 'dark');
    }
}