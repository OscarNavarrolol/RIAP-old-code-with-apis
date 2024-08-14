document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("login-input-user");
  const passwordInput = document.getElementById("login-input-password");
  const keepSignedInCheckbox = document.getElementById("login-sign-up");
  const submitButton = document.querySelector(".login__submit");
  const userDisplayDiv = document.getElementById("userDisplay"); // Div para mostrar el nombre del usuario

  // Habilitar el botón de enviar cuando los campos no están vacíos
  function validateForm() {
    submitButton.disabled =
      usernameInput.value.trim() === "" || passwordInput.value.trim() === "";
  }

  // Verificar si el usuario está logueado
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("loggedIn") || sessionStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
      const userId =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      const userName =
        localStorage.getItem("nameUser") || sessionStorage.getItem("nameUser");

      if (userName) {
        userDisplayDiv.textContent = `Bienvenido, ${userName}!`; // Mostrar nombre del usuario
      }

      window.location.href = `/user_data/principal/${userId}`; // Redirigir al endpoint con el ID del usuario
    }
  }

  // Mantener al usuario logueado
  function keepUserLoggedIn(token, nameUser) {
    const storage = keepSignedInCheckbox.checked
      ? localStorage
      : sessionStorage;
    storage.setItem("loggedIn", "true");
    storage.setItem("authToken", token);
    storage.setItem("nameUser", nameUser);
  }

  // Manejar el envío del formulario
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const document = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const formdata = new FormData();
    formdata.append("document", document);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("/api_user/auth", 
        requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.idUser && data.nameUser) { // Comprobar si la autenticación fue exitosa
          keepUserLoggedIn(data.idUser, data.nameUser); // Guardar el ID y el nombre del usuario
          localStorage.setItem( 'user', JSON.stringify(data))
          window.location.href = `/user_data/principal`; // Redirigir al endpoint con el ID del usuario
        } else {
          alert("Credenciales inválidas, por favor intenta de nuevo.");
        }
      })
      .catch((error) => {
        console.error("Error durante el inicio de sesión:", error);
        alert(
          "Ocurrió un error durante el inicio de sesión. Por favor intenta de nuevo más tarde."
        );
      });
  });

  // Habilitar/deshabilitar botón de enviar
  usernameInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);

  // Comprobar si el usuario está logueado al cargar la página
  checkLoginStatus();
});
