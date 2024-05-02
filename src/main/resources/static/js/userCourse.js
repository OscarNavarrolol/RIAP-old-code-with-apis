$(document).ready(function () {
  function loadAttendanceList() {
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
        $output.html(response.map(mapAttendanceItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapAttendanceItem(item) {
    return `<tr><td>${item.idUserCourse}</td><td>${item.idCourse}</td><td>${item.idUser}</td>
    <td><button class="view-userCourse view-btn" data-id="${item.idUserCourse}">
    <img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idUserCourse}">
    <img src="/images/iconEdit.png" class="action"></button><button id="delete-user-course" class="delete-btn" data-id="${item.idUserCourse}">
    <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonUsersCourses").click(function () {
    loadAttendanceList();
    $("#bton-close-modal").click();
    $("#modalForm").hide();
  });
  
  $(document).on("click", ".view-userCourse", function () {
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

  $(document).on("click", ".edit-btn", function () {
    var ID = $(this).data("id");
  });

  $(document).on("click", ".add-btn", function () {
    var ID = $(this).data("id");
  });
});
