$(document).ready(function () {
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
    $("#bton-close-modal").click();
    $("#modalForm").hide();
    $("#add-btn-attendance").hide();
    $("#add-btn-course").hide();
    $("#add-btn-event").hide();
    $("#add-btn-program").hide();
    $("#add-btn-user-course").show();
    $("#add-btn-user").hide();
  });
  
  $(document).on("click", "#view-userCourse", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/user_course/get_user_course");
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
    if (confirm("¿Estás seguro de que deseas eliminar este dato?")) {
      $.ajax({
        url: `http://localhost:8083/api_user_course/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("¡El dato ha sido eliminado exitosamente!");
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar el dato.");
        },
      });
    }
  });

  $(document).on("click", "#edit-user-course", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/user_course/get_user_course");
    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_user_course/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idUserCourse").val(data.idUserCourse).prop("readonly", true);
        $("#idCourse").val(data.idCourse);
        $("#idUserData").val(data.idUser);
        $("#save-btn").hide();
        $("#clean-btn").hide();
        $("#edit-btn-userCourse").show();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("Hubo un error al intentar cargar los datos para editar.");
      },
    });
  });

  $(document).on("click", "#edit-btn-userCourse", function (event) {
    event.preventDefault();

    var ID = $("#idUserCourse").val();

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
        alert("Los datos del user_course han sido actualizados exitosamente.");
        $("#modalForm").hide();
        loadUserCourseList();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("Hubo un error al intentar actualizar los datos del programa.");
      },
    });
  });
  
  $(document).on("click", "#add-btn-user-course", function () {
    alert("table5");
  });

  $(document).on("click","#returnTable5", function (){
    $("#modalForm").hide();
  });
});
