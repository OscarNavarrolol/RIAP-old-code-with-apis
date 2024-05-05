$(document).ready(function () {
  var editUserID = null;
  function loadUserList() {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: "http://localhost:8083/api_user/list_user",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const headers =
          "<tr><th>Id User</th><th>Full Name</th><th>Age</th><th>Document Number</th><th>Phone</th><th>E-mail</th><th>Password User</th><th>Role User</th><th>Profile Picture</th><th>Actions</th></tr>";
        $headerTable.html(headers);
        $output.html(response.map(mapUserItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapUserItem(item) {
    return `<tr><td>${item.idUser}</td><td>${item.nameUser}</td><td>${item.age}</td><td>${item.document}</td>
    <td>${item.phone}</td><td>${item.email}</td><td>${item.password}</td><td>${item.roleUser}</td>
    <td><img src="${item.profilePicture}" alt="profile"></td><td><button id="view-user" class="view-btn" data-id="${item.idUser}">
    <img src="/images/iconView.png" class="action"></button><button id="edit-user-data" class="edit-btn" data-id="${item.idUser}">
    <img src="/images/iconEdit.png" class="action"></button><button id="delete-user-data" class="delete-btn" data-id="${item.idUser}">
    <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonUsers").click(function () {
    loadUserList();
    $("#modalForm").load("/user_data/get_user_data");
    $("#bton-close-modal").click();
    $("#modalForm").hide();
    $("#add-btn-attendance").hide();
    $("#add-btn-course").hide();
    $("#add-btn-event").hide();
    $("#add-btn-program").hide();
    $("#add-btn-user-course").hide();
    $("#add-btn-user").show();
  });
  
  $(document).on("click", "#view-user", function () {
    var ID = $(this).data("id");
    $("#modalForm").show();
    $.ajax({
      url: `http://localhost:8083/api_user/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idUserData").val(data.idUser).prop("readonly", true);
        $("#document").val(data.document).prop("readonly", true);
        $("#nameUser").val(data.nameUser).prop("readonly", true);
        $("#age").val(data.age).prop("readonly", true);
        $("#email").val(data.email).prop("readonly", true);
        $("#phone").val(data.phone).prop("readonly", true);
        $("#role").val(data.roleUser);
        $("#password").val(data.password).prop("readonly", true);
        // $("#profilePicture").val(data.profilePicture).prop("readonly", true);
        $(".btnHidden").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  $(document).on("click", "#delete-user-data", function () {
    var ID = $(this).data("id");
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      $.ajax({
        url: `http://localhost:8083/api_user/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("¡El usuario ha sido eliminado exitosamente!");
          loadUserList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar el usuario.");
        },
      });
    }
  });

  $(document).on("click", "#edit-user-data", function () {
    var ID = $(this).data("id");
    editUserID = ID;
    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_user/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idUserData").val(data.idUser).prop("readonly", true);
        $("#document").val(data.document);
        $("#nameUser").val(data.nameUser);
        $("#age").val(data.age);
        $("#email").val(data.email);
        $("#phone").val(data.phone);
        $("#role").val(data.roleUser);
        $("#password").val(data.password);
        // $("#profilePicture").val(data.profilePicture);
        $("#save-btn-userData").show();
        $("#clean-btn").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("Hubo un error al intentar cargar los datos para editar.");
      },
    });
  });

  $(document).on("click", "#add-btn-user", function () {
    editUserID = null;
    $("#modalForm").show();

    $("#idUserData").hide()
    $("label[for='idUserData']").hide();

    $("#document").val("");
    $("#nameUser").val("");
    $("#age").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#role").val("");
    $("#password").val("");
    // $("#profilePicture").val("");

    $("#btnHidden").show();
  });

  $(document).on("click", "#save-btn-userData", function (event) {
    event.preventDefault();

    var ID = editUserID;

    if (ID != null) {
      var formData = {
        document: $("#document").val(),
        nameUser: $("#nameUser").val(),
        age: $("#age").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        roleUser: $("#role").val(),
        password: $("#password").val(),
        // profilePicture: $("#profilePicture").val(),
      };

      $.ajax({
        url: `http://localhost:8083/api_user/update/${ID}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("Los datos del usuario han sido actualizados exitosamente.");
          $("#modalForm").hide();
          loadUserList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert(
            "Hubo un error al intentar actualizar los datos del usuario."
          );
        },
      });
    } else {
      var formData = {
        document: $("#document").val(),
        nameUser: $("#nameUser").val(),
        age: $("#age").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        roleUser: $("#role").val(),
        password: $("#password").val(),
        // profilePicture: $("#profilePicture").val(),
      };

      $.ajax({
        url: "http://localhost:8083/api_user/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("El usuario ha sido guardado exitosamente.");
          $("#modalForm").hide();
          loadUserList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar guardar el usuario.");
        },
      });
    }
  });

  $(document).on("click","#returnTable6", function (){
    $("#modalForm").hide();
  });
});