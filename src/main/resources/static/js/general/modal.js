document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalForm');
    const loginButton = document.getElementById('loginButton');
    const closeButton = document.querySelector('close-button');

    loginButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
