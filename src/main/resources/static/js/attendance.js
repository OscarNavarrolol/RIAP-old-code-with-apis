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

  $("#buttonAttendances").click(function () {
    fetchData(
      "http://localhost:8083/api_attendance/list_attendance",
      "<tr><th>Id Attendance</th><th>Id Event</th><th>Id User</th><th>Attendance Time</th><th>Actions</th></tr>",
      (item) =>
        `<tr><td>${item.idAttendance}</td><td>${item.idEvent}</td><td>${item.idUser}</td><td>${item.attendanceTime}</td><td><button class="view-btn" data-id="${item.idAttendance}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idAttendance}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idAttendance}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );

    $(document).on("click", ".view-btn", function () {
      var idreference = $(this).data("id");
      $("#modalForm").load("/attendance/get_attendance");

      $.ajax({
        url: `http://localhost:8083/api_attendance/find/${idreference}`,
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
