$(document).ready(function () {
  function fetchData(url, headers, mapFunction) {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (response) {
        $headerTable.html(headers);
        $output.html(response.map(mapFunction));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  $("#buttonUsers").click(function () {
    fetchData(
      "http://localhost:8083/api_user/list_user",
      "<tr><th>Id User</th><th>Full Name</th><th>Age</th><th>Document Number</th><th>Phone</th><th>E-mail</th><th>Password User</th><th>Role User</th><th>Profile Picture</th><th>Actions</th></tr>",
      (item) =>
        `<tr><td>${item.idUser}</td><td>${item.nameUser}</td><td>${item.age}</td><td>${item.document}</td><td>${item.phone}</td><td>${item.email}</td><td>${item.password}</td><td>${item.roleUser}</td><td><img src="${item.profilePicture}" alt="profile"></td><td><button class="view-btn" data-id="${item.idUser}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idUser}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idUser}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );

    $(document).on("click", ".view-btn", function () {
      var idreference = $(this).data("id");
      $("#modalForm").load("/user_data/get_user_data");

      $.ajax({
        url: `http://localhost:8083/api_user/find/${idreference}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          $("#idUserData").val(data.idUser).prop("readonly", true);
          $("#document").val(data.document).prop("readonly", true);
          $("#nameUser").val(data.nameUser).prop("readonly", true);
          $("#age").val(data.age).prop("readonly", true);
          $("#email").val(data.email).prop("readonly", true);
          $("#phone").val(data.phone).prop("readonly", true);
          $("#role").val(data.roleUser).prop("readonly", true);
          $("#password").val(data.password).prop("readonly", true);
          $("#profilePicture").val(data.profilePicture).prop("readonly", true);

          $(".btnHidden").hide();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    });

    $(document).on("click", ".edit-btn", function () {
      var eventId = $(this).data("id");
    });

    $(document).on("click", ".delete-btn", function () {
      var eventId = $(this).data("id");
    });

    $(document).on("click", ".add-btn", function () {
      var eventId = $(this).data("id");
    });

  });
  
});
