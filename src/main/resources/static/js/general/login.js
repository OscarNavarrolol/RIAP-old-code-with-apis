document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const documentValue = document.getElementById('document').value;
        const passwordValue = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8083/api_user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    document: documentValue,
                    password: passwordValue
                })
            });

            if (response.ok) {
                const userData = await response.json();
                alert(`Login successful! Welcome, ${userData.nameUser}`);
                // Redirigir a la página principal o dashboard
                window.location.href = "http://localhost:8083/user_data/tables";
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    togglePassword.addEventListener('click', function () {

        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        this.src = type === 'password' ? '/images/icon_ojo_cerrado.png' : '/images/icon_ojo.png';
    });
});

