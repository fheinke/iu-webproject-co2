document.getElementById('toggle-color-theme').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.getElementById('toggle-color-theme-image').setAttribute('class', 'bi bi-moon-stars-fill');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.getElementById('toggle-color-theme-image').setAttribute('class', 'bi bi-brightness-high-fill');
    }
})
