$(document).ready(function () {
  function loadAttendanceList() {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: "http://localhost:8083/api_attendance/list_attendance",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const headers =
          "<tr><th>Id Attendance</th><th>Id Event</th><th>Id User</th><th>Attendance Time</th><th>Actions</th></tr>";
        $headerTable.html(headers);
        $output.html(response.map(mapAttendanceItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapAttendanceItem(item) {
    return `<tr><td>${item.idAttendance}</td><td>${item.idEvent}</td><td>${item.idUser}</td>
    <td>${item.attendanceTime}</td><td><button id="view-attendance" class="view-btn" data-id="${item.idAttendance}">
    <img src="/images/iconView.png" class="action"></button><button id="edit-attendance" class="edit-btn" data-id="${item.idAttendance}">
    <img src="/images/iconEdit.png" class="action"></button><button id="delete-attendance" class="delete-btn" data-id="${item.idAttendance}">
    <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonAttendances").click(function () {
    loadAttendanceList();
    $("#bton-close-modal").click();
    $("#modalForm").hide();
  });

  $(document).on("click", "#view-attendance", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/attendance/get_attendance");
    $("#modalForm").show();
    $.ajax({
      url: `http://localhost:8083/api_attendance/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idAttendance").val(data.idAttendance).prop("readonly", true);
        $("#idEventData").val(data.idEvent).prop("readonly", true);
        $("#idUser").val(data.idUser).prop("readonly", true);
        var attendanceTime = new Date(data.attendanceTime);
        var attendanceTimeString = attendanceTime.toISOString().slice(0, 16);
        $("#attendanceTime").val(attendanceTimeString).prop("readonly", true);
        $(".btnHidden").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  $(document).on("click", "#delete-attendance", function () {
    var ID = $(this).data("id");
    if (confirm("¿Estás seguro de que deseas eliminar esta asistencia?")) {
      $.ajax({
        url: `http://localhost:8083/api_attendance/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("¡La asistencia ha sido eliminada exitosamente!");
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar la asistencia.");
        },
      });
    }
  });

  $(document).on("click", "#edit-attendance", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/attendance/get_attendance");
    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_attendance/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idAttendance").val(data.idAttendance).prop("readonly", true);
        $("#idEventData").val(data.idEvent);
        $("#idUser").val(data.idUser);
        $("#attendanceTime").val(data.attendanceTime);
        $(".btnHidden").show();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("Hubo un error al intentar cargar los datos para editar.");
      },
    });
  });

  $(document).on("click", "#save-btn", function (event) {
    event.preventDefault();

    var ID = $("#idAttendance").val();

    var formData = {
      idEvent: $("#idEventData").val(),
      idUser: $("#idUser").val(),
      attendanceTime: $("#attendanceTime").val(),
    };

    $.ajax({
      url: `http://localhost:8083/api_attendance/update/${ID}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        alert("Los datos de asistencia han sido actualizados exitosamente.");
        $("#modalForm").hide();
        loadAttendanceList();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("Hubo un error al intentar actualizar los datos de asistencia.");
      },
    });
  });

  $(document).on("click", ".add-btn", function () {
  });
});
