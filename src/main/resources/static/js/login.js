document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.login-form');
    const predefinedUser = "admin";
    const predefinedPassword = "user123";
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const userInput = document.getElementById('document').value;
        const passwordInput = document.getElementById('password').value;

        if (userInput === predefinedUser && passwordInput === predefinedPassword) {
            alert("Login successful!");
            window.location.href = "http://localhost:8083/user_data/tables";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    togglePassword.addEventListener('click', function () {

        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        this.src = type === 'password' ? '/images/icon_ojo_cerrado.png' : '/images/icon_ojo.png';
    });
});
