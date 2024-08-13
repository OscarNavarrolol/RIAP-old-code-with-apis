document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('login-input-user');
    const passwordInput = document.getElementById('login-input-password');
    const keepSignedInCheckbox = document.getElementById('login-sign-up');
    const submitButton = document.querySelector('.login__submit');

    // Habilitar el botón de enviar cuando los campos no están vacíos
    function validateForm() {
        if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Verificar si el usuario está logueado
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn === 'true') {
            const userId = localStorage.getItem('authToken'); // o el ID almacenado
            window.location.href = `/user_data/principal/${userId}`; // Redirigir al endpoint con el ID del usuario
        }
    }    

    // Mantener al usuario logueado
    function keepUserLoggedIn(token) {
        if (keepSignedInCheckbox.checked) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('authToken', token);
        } else {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('authToken', token);
        }
    }

    // Manejar el envío del formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const document = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        fetch('/api_user/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'document': document,
                'password': password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.idUser) { // Comprobar si la autenticación fue exitosa
                keepUserLoggedIn(data.idUser); // Guardar el token o el ID del usuario
                console.log(data);
                window.location.href = `/user_data/principal`; // Redirigir al endpoint con el ID del usuario
            } else {
                alert('Invalid credentials, please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        });
    });

    // Habilitar/deshabilitar botón de enviar
    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    // Comprobar si el usuario está logueado al cargar la página
    checkLoginStatus();
});
