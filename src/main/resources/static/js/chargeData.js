$(document).ready(function () {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $("#buttonAttendances").click(function () {
      $.ajax({
        url: "http://127.0.0.1:8083/api_attendance/list_attendance",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
            "<tr><th>ID</th><th>Id Event</th><th>Id Attendance</th><th>attendance Time</th><th>Acciones</th></tr>"
          );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idUser}</td><td>${item.idEvent}</td><td>${item.idAttendance}</td>
                  <td>${item.attendanceTime}</td></tr>`
            )
          );
        },
        error: function (xhr, status, error) {
          // Handle error
          console.error(xhr.responseText);
        },
      });
    });
  
    $("#buttonCourses").click(function () {
      $.ajax({
        url: "http://127.0.0.1:8083/api_course/list_course",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
              "<tr><th>ID</th></tr>"
            );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idUser}</td><td>${item.idEvent}</td><td>${item.idAttendance}</td>
                  <td>${item.attendanceTime}</td><td>Eliminar</td></tr>`
            )
          );
        },
        error: function (xhr, status, error) {
          // Handle error
          console.error(xhr.responseText);
        },
      });
    });
  });
  