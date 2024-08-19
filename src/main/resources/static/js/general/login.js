document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("login-input-user");
  const passwordInput = document.getElementById("login-input-password");
  const keepSignedInCheckbox = document.getElementById("login-sign-up");
  const submitButton = document.querySelector(".login__submit");
  const userDisplayDiv = document.getElementById("userDisplay"); 

  function validateForm() {
    submitButton.disabled =
      usernameInput.value.trim() === "" || passwordInput.value.trim() === "";
  }

  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("loggedIn") || sessionStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
      const userId =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      const userName =
        localStorage.getItem("nameUser") || sessionStorage.getItem("nameUser");

      if (userName) {
        userDisplayDiv.textContent = `Welcome, ${userName}!`;
      }

      window.location.href = `/user_data/user/${userId}`;
    }
  }

  function keepUserLoggedIn(token, nameUser) {
    const storage = keepSignedInCheckbox.checked
      ? localStorage
      : sessionStorage;
    storage.setItem("loggedIn", "true");
    storage.setItem("authToken", token);
    storage.setItem("nameUser", nameUser);
  }

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
          window.location.href = `/user_data/user`; // Redirigir al endpoint con el ID del usuario
        } else {
          alert("Invalid credentials, please try again.");
        }
      })
      .catch((error) => {
        console.error("Error durante el inicio de sesión:", error);
        alert(
          "Invalid credentials, please try again."
        );
      });
  });

  usernameInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);

  checkLoginStatus();
});
