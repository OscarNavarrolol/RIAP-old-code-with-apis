$(document).ready(function () {
  const $output = $("#data");
  const $headerTable = $("#headerTable");

  function fetchData(url, headers, mapFunction) {
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

  $("#buttonAttendances").click(function () {
      fetchData(
          "http://localhost:8083/api_attendance/list_attendance",
          "<tr><th>Id Attendance</th><th>Id Event</th><th>Id User</th><th>Attendance Time</th><th>Actions</th></tr>",
          (item) => `<tr><td>${item.idAttendance}</td><td>${item.idEvent}</td><td>${item.idUser}</td><td>${item.attendanceTime}</td><td><button class="view-btn" data-id="${item.idAttendance}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idAttendance}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idAttendance}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
      );
  });

  $("#buttonCourses").click(function () {
      fetchData(
          "http://localhost:8083/api_course/list_course",
          "<tr><th>ID Course</th><th>Number Course</th><th>Id Program</th><th>Actions</th></tr>",
          (item) => `<tr><td>${item.idCourse}</td><td>${item.number}</td><td>${item.idProgram}</td><td><button class="view-btn" data-id="${item.idCourse}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idCourse}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idCourse}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
      );
  });

  $("#buttonEvents").click(function () {
    fetchData(
        "http://localhost:8083/api_event_data/list_event_data",
        "<tr><th>Id Event</th><th>Date Event</th><th>Location</th><th>Objective</th><th>Start Time</th><th>End Time</th><th>Actions</th></tr>",
        (item) => `<tr><td>${item.idEvent}</td><td>${item.date}</td><td>${item.location}</td><td>${item.objective}</td><td>${item.startTime}</td><td>${item.endTime}</td><td><button class="view-btn" data-id="${item.idEvent}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idEvent}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idEvent}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );
});

$("#buttonPrograms").click(function () {
    fetchData(
        "http://localhost:8083/api_program/list_program",
        "<tr><th>Id Program</th><th>Name Program</th><th>Actions</th></tr>",
        (item) => `<tr><td>${item.idProgram}</td><td>${item.name}</td><td><button class="view-btn" data-id="${item.idProgram}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idProgram}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idProgram}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );
});

$("#buttonUsersCourses").click(function () {
    fetchData(
        "http://localhost:8083/api_user_course/list_user_course",
        "<tr><th>Id User Course</th><th>Id Course</th><th>Id User</th><th>Actions</th></tr>",
        (item) => `<tr><td>${item.idUserCourse}</td><td>${item.idCourse}</td><td>${item.idUser}</td><td><button class="view-btn" data-id="${item.idUserCourse}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idUserCourse}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idUserCourse}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );
});

$("#buttonUsers").click(function () {
    fetchData(
        "http://localhost:8083/api_user/list_user",
        "<tr><th>Id User</th><th>Full Name</th><th>Age</th><th>Document Number</th><th>Phone</th><th>E-mail</th><th>Password User</th><th>Role User</th><th>Profile Picture</th><th>Actions</th></tr>",
        (item) => `<tr><td>${item.idUser}</td><td>${item.nameUser}</td><td>${item.age}</td><td>${item.document}</td><td>${item.phone}</td><td>${item.email}</td><td>${item.password}</td><td>${item.roleUser}</td><td><img src="${item.profilePicture}" alt="Perfil"></td><td><button class="view-btn" data-id="${item.idUser}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idUser}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idUser}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );
});

});


$(document).on("click", ".edit-btn", function() {
  var eventId = $(this).data("id");

});


$(document).on("click", ".delete-btn", function() {
  var eventId = $(this).data("id");

});


$(document).on("click", ".view-btn", function() {
  var eventId = $(this).data("id");

});

