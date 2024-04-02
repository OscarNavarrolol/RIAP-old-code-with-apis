$(document).ready(function () {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $("#buttonAttendances").click(function () {
      $.ajax({
        url: "http://localhost:8083/api_attendance/list_attendance",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
            "<tr><th>Id Attendance</th><th>Id Event</th><th>Id User</th><th>Attendance Time</th><th>Actions</th></tr>"
          );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idAttendance}</td><td>${item.idEvent}</td><td>${item.idUser}</td>
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
        url: "http://localhost:8083/api_course/list_course",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
              "<tr><th>ID Course</th><th>Number Course</th><th>Id Program</th><th>Actions</th></tr>"
            );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idCourse}</td><td>${item.number}</td><td>${item.idProgram}</td></tr>`
            )
          );
        },
        error: function (xhr, status, error) {
          // Handle error
          console.error(xhr.responseText);
        },
      });
    });

    $("#buttonEvents").click(function () {
      $.ajax({
        url: "http://localhost:8083/api_event_data/list_event_data",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
              "<tr><th>Id Event</th><th>Date Event</th><th>Location</th><th>Objective</th><th>Start Time</th><th>End Time</th><th>Actions</th></tr>"
            );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idEvent}</td><td>${item.date}</td><td>${item.location}</td>
              <td>${item.objective}</td><td>${item.startTime}</td><td>${item.endTime}</td></tr>`
            )
          );
        },
        error: function (xhr, status, error) {
          // Handle error
          console.error(xhr.responseText);
        },
      });
    });

    $("#buttonPrograms").click(function () {
      $.ajax({
        url: "http://localhost:8083/api_program/list_program",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
              "<tr><th>Id Program</th><th>Name Program</th><th>Actions</th></tr>"
            );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idProgram}</td><td>${item.name}</td></tr>`
            )
          );
        },
        error: function (xhr, status, error) {
          // Handle error
          console.error(xhr.responseText);
        },
      });
    });

    $("#buttonUsersCourses").click(function () {
      $.ajax({
        url: "http://localhost:8083/api_user_course/list_user_course",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
              "<tr><th>Id User Course</th><th>Id Course</th><th>Id User</th><th>Actions</th></tr>"
            );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idUserCourse}</td><td>${item.idCourse}</td><td>${item.idUser}</td></tr>`
            )
          );
        },
        error: function (xhr, status, error) {
          // Handle error
          console.error(xhr.responseText);
        },
      });
    });

    $("#buttonUsers").click(function () {
      $.ajax({
        url: "http://localhost:8083/api_user/list_user",
        type: "GET",
        dataType: "json",
        success: function (response) {
          $headerTable.html(
              "<tr><th>Id User</th><th>Full Name</th><th>Age</th><th>Document Number</th><th>Phone</th><th>E-mail</th><th>Password User</th><th>Role User</th><th>Profile Picture</th><th>Actions</th></tr>"
            );
          $output.html(
            response.map(
              (
                item
              ) => `<tr><td>${item.idUser}</td><td>${item.nameUser}</td><td>${item.age}</td><td>${item.document}</td>
              <td>${item.phone}</td><td>${item.email}</td><td>${item.password}</td><td>${item.roleUser}</td><td><img src="${item.profilePicture}" alt="Perfil"></td></tr>`
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
