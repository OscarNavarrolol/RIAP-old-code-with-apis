$(document).ready(function () {

  function loadAttendanceList() {
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
        $output.html(response.map(mapAttendanceItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapAttendanceItem(item) {
    return `<tr><td>${item.idUser}</td><td>${item.nameUser}</td><td>${item.age}</td><td>${item.document}</td><td>${item.phone}</td><td>${item.email}</td><td>${item.password}</td><td>${item.roleUser}</td><td><img src="${item.profilePicture}" alt="profile"></td><td><button class="view-user view-btn" data-id="${item.idUser}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idUser}"><img src="/images/iconEdit.png" class="action"></button><button id="delete-user-data" class="delete-btn" data-id="${item.idUser}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonUsers").click(function () {
    loadAttendanceList();
    $("#modalForm").hide()
  });
  
  $(document).on("click", ".view-user", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/user_data/get_user_data");
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
        $("#profilePicture").val(data.profilePicture).prop("readonly", true);
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
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar el usuario.");
        },
      });
    } else {
      return;
    }
  });

  $(document).on("click", ".edit-btn", function () {
    var ID = $(this).data("id");
  });

  $(document).on("click", ".add-btn", function () {
    var ID = $(this).data("id");
  });
});