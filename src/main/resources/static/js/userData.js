//import js file-service.js
const { createClient } = supabase;
const supabaseUrl = "https://vkboueidcnqwbjyejiud.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrYm91ZWlkY25xd2JqeWVqaXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1NTA0NTYsImV4cCI6MjAyNjEyNjQ1Nn0.Cdj5w2Fq5Qz8FKZKY37X8Fhii_7o6DY4g7X8Fdk33vE";
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
    <td><img src="${"https://vkboueidcnqwbjyejiud.supabase.co/storage/v1/object/public/"+item.profilePicture}" alt="profile"></td><td><button id="view-user" class="view-btn" data-id="${item.idUser}">
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
    $("#add-btn-recovery").hide();
    $("#welcome").hide();
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
        $("#imgUser").val("https://vkboueidcnqwbjyejiud.supabase.co/storage/v1/object/public/"+data.profilePicture).prop("readonly", true);
        $('#imgUser').attr('src', "https://vkboueidcnqwbjyejiud.supabase.co/storage/v1/object/public/" + data.profilePicture).show();
        $(".btnHidden").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  $(document).on("click", "#delete-user-data",async function () {
    var ID = $(this).data("id");
    const formData = await $.ajax({
      url: `http://localhost:8083/api_user/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        return data;
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("There was an error trying to load data for editing.");
      },
    });
    const imageSrc = "https://vkboueidcnqwbjyejiud.supabase.co/storage/v1/object/public/"+ formData.profilePicture;
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteImage(imageSrc).then((response) => {
        if(response.status === "success"){
          $.ajax({
            url: `http://localhost:8083/api_user/delete/${ID}`,
            type: "DELETE",
            success: async function (response) {
              alert("The user has been successfully deleted!");
              loadUserList();
            },
            error: function (xhr, status, error) {
              console.error(xhr.responseText);
              alert("There was an error trying to delete the user.");
            },
          });
        }
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
        $("#imgUser").val(data.profilePicture);
        $('#imgUser').attr('src', "https://vkboueidcnqwbjyejiud.supabase.co/storage/v1/object/public/" +data.profilePicture).show();
        $("#save-btn-userData").show();
        $("#clean-btn").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("There was an error trying to load data for editing.");
      },
    });
  });

  $('#image-input').on('change', function () {
    const file = $(this)[0].files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#imgUser').attr('src', e.target.result).show();
      };
      reader.readAsDataURL(file);
    } else {
      $('#imgUser').attr('src', '#').hide();
    }
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
    $("#imgUser").val("");

    $("#btnHidden").show();
  });

  $(document).on("click", "#save-btn-userData", async function (event) {
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
        profilePicture: $("#image-input").val(),
      };

      if (formData.profilePicture != undefined) {
        await subirImagen(formData.profilePicture).then((url) => {
          formData.profilePicture = url.data.fullPath;
        });
      } else {
        formData.profilePicture = $("#imgUser").val();
      }

      $.ajax({
        url: `http://localhost:8083/api_user/update/${ID}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The user's data has been successfully updated.");
          $("#modalForm").hide();
          loadUserList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert(
            "There was an error trying to update user data."
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
        profilePicture: $("#image-input").val(),

      };
      if (formData.profilePicture != undefined) {
        await subirImagen(formData.profilePicture).then((url) => {
          formData.profilePicture = url.data.fullPath;
        });
      } else {
        formData.profilePicture = $("#imgUser").val();
      }
      $.ajax({
        url: "http://localhost:8083/api_user/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The user has been saved successfully.");
          $("#modalForm").hide();
          loadUserList();
        },
        error: function (xhr, status, error) {
          console.error(error);
          alert("There was an error trying to save the user.");
        },
      });

    }
  });

  $(document).on("click", "#returnTable6", function () {
    $("#modalForm").hide();
  });
});