$(document).ready(function () {
  var editUserCourseID = null;
  function loadUserCourseList() {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: "http://localhost:8083/api_user_course/list_user_course",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const headers =
          "<tr><th>Id User Course</th><th>Id Course</th><th>Id User</th><th>Actions</th></tr>";
        $headerTable.html(headers);
        $output.html(response.map(mapUserCourseItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapUserCourseItem(item) {
    return `<tr><td>${item.idUserCourse}</td><td>${item.idCourse}</td><td>${item.idUser}</td>
    <td><button id="view-userCourse" class="view-btn" data-id="${item.idUserCourse}">
    <img src="/images/iconView.png" class="action"></button><button id="edit-user-course" class="edit-btn" data-id="${item.idUserCourse}">
    <img src="/images/iconEdit.png" class="action"></button><button id="delete-user-course" class="delete-btn" data-id="${item.idUserCourse}">
    <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonUsersCourses").click(function () {
    loadUserCourseList();
    $("#modalForm").load("/user_course/get_user_course");
    $("#bton-close-modal").click();
    $("#modalForm").hide();
    $("#add-btn-attendance").hide();
    $("#add-btn-course").hide();
    $("#add-btn-event").hide();
    $("#add-btn-program").hide();
    $("#add-btn-user-course").show();
    $("#add-btn-user").hide();
    $("#welcome").hide();
  });
  
  $(document).on("click", "#view-userCourse", function () {
    var ID = $(this).data("id");
    $("#modalForm").show();
    $.ajax({
      url: `http://localhost:8083/api_user_course/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idUserCourse").val(data.idUserCourse).prop("readonly", true);
        $("#idCourse").val(data.idCourse).prop("readonly", true);
        $("#idUserData").val(data.idUser).prop("readonly", true);
        $(".btnHidden").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  $(document).on("click", "#delete-user-course", function () {
    var ID = $(this).data("id");
    if (confirm("Are you sure you want to delete this data?")) {
      $.ajax({
        url: `http://localhost:8083/api_user_course/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("The data has been successfully deleted!");
          loadUserCourseList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to delete the data.");
        },
      });
    }
  });

  $(document).on("click", "#edit-user-course", function () {
    var ID = $(this).data("id");
    editUserCourseID = ID;
    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_user_course/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idUserCourse").val(data.idUserCourse).prop("readonly", true);
        $("#idCourse").val(data.idCourse);
        $("#idUserData").val(data.idUser);
        $("#save-btn-userCourse").show();
        $("#clean-btn").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("There was an error trying to load data for editing.");
      },
    });
  });

  $(document).on("click", "#add-btn-user-course", function () {
    editUserCourseID = null;
    $("#modalForm").show();

    $("#idUserCourse").hide()
    $("label[for='idUserCourse']").hide();

    $("#idCourse").val("");
    $("#idUserData").val("");

    $("#btnHidden").show();
  });

  $(document).on("click", "#save-btn-userCourse", function (event) {
    event.preventDefault();

    var ID = editUserCourseID;

    if (ID != null) {
      var formData = {
        idCourse: $("#idCourse").val(),
        idUser: $("#idUserData").val(),
      };

      $.ajax({
        url: `http://localhost:8083/api_user_course/update/${ID}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The data has been updated successfully.");
          $("#modalForm").hide();
          loadUserCourseList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert(
            "There was an error trying to update the data."
          );
        },
      });
    } else {
      var formData = {
        idCourse: $("#idCourse").val(),
        idUser: $("#idUserData").val(),
      };

      $.ajax({
        url: "http://localhost:8083/api_user_course/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The data has been saved successfully.");
          $("#modalForm").hide();
          loadUserCourseList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to save the data.");
        },
      });
    }
  });

  $(document).on("click","#returnTable5", function (){
    $("#modalForm").hide();
  });
});
