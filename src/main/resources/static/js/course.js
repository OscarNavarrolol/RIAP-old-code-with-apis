$(document).ready(function () {
  function loadAttendanceList() {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: "http://localhost:8083/api_course/list_course",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const headers =
          "<tr><th>ID Course</th><th>Number Course</th><th>Id Program</th><th>Actions</th></tr>";
        $headerTable.html(headers);
        $output.html(response.map(mapAttendanceItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapAttendanceItem(item) {
    return `<tr><td>${item.idCourse}</td><td>${item.number}</td><td>${item.idProgram}</td><td><button class="view-course view-btn" data-id="${item.idCourse}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idCourse}"><img src="/images/iconEdit.png" class="action"></button><button id="delete-course" class="delete-btn" data-id="${item.idCourse}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonCourses").click(function () {
    loadAttendanceList();
    $("#bton-close-modal").click();
    $("#modalForm").hide();
  });
  
  $(document).on("click", ".view-course", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/course/get_course");
    $("#modalForm").show();
    $.ajax({
      url: `http://localhost:8083/api_course/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idCourse").val(data.idCourse).prop("readonly", true);
        $("#idProgram").val(data.idProgram).prop("readonly", true);
        $("#numberCourse").val(data.number).prop("readonly", true);
        $(".btnHidden").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  $(document).on("click", "#delete-course", function () {
    var ID = $(this).data("id");
    if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
      $.ajax({
        url: `http://localhost:8083/api_course/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("¡El curso ha sido eliminada exitosamente!");
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar la asistencia.");
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

