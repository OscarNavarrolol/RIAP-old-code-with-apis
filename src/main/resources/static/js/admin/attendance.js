$(document).ready(function () {
  var editAttendanceID = null;
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

  function resetFormAttendance() {
    $("#idAttendance").val("").prop("readonly", false).show();
    $("label[for='idAttendance']").show();
    $("#idEventData").val("").prop("readonly", false);
    $("#idUser").val("").prop("readonly", false);
    $("#attendanceTime").val("").prop("readonly", false);
    $("#save-btn-attendance").show();
    $("#clean-btn").show();
    $(".btnHidden").show();
  }

  $("#buttonAttendances").click(function () {
    loadAttendanceList();
    $("#modalForm").load("/attendance/get_attendance");
    $("#bton-close-modal").click();
    $("#modalForm").hide();
    $("#add-btn-attendance").show();
    $("#add-btn-course").hide();
    $("#add-btn-event").hide();
    $("#add-btn-program").hide();
    $("#add-btn-user-course").hide();
    $("#add-btn-user").hide();
    $("#add-btn-recovery").hide();
    $("#welcome").hide();
  });

  $(document).on("click", "#view-attendance", function () {
    resetFormAttendance()
    var ID = $(this).data("id");
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
    if (confirm("Are you sure you want to remove this support?")) {
      $.ajax({
        url: `http://localhost:8083/api_attendance/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("Support has been successfully removed!");
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to remove support.");
        },
      });
    }
  });

  $(document).on("click", "#edit-attendance", function () {
    resetFormAttendance()
    var ID = $(this).data("id");
    editAttendanceID = ID;
    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_attendance/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idAttendance").val(data.idAttendance).prop("readonly", true);;
        $("#idEventData").val(data.idEvent);
        $("#idUser").val(data.idUser);
        $("#attendanceTime").val(data.attendanceTime);
        $("#save-btn-attendance").show();
        $("#clean-btn").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("There was an error trying to load data for editing.");
      },
    });
  });

  $(document).on("click", "#add-btn-attendance", function () {
    resetFormAttendance()
    editAttendanceID = null;
    $("#modalForm").show();

    $("#idAttendance").hide()
    $("label[for='idAttendance']").hide();

    $("#idEventData").val("");
    $("#idUser").val("");
    $("#attendanceTime").val("");

    $("#btnHidden").show();
  });

  $(document).on("click", "#save-btn-attendance", function (event) {
    event.preventDefault();

    var ID = editAttendanceID;

    if (ID != null) {
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
          alert("Attendance data has been successfully updated.");
          $("#modalForm").hide();
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert(
            "There was an error trying to update attendance data."
          );
        },
      });
    } else {
      var formData = {
        idEvent: $("#idEventData").val(),
        idUser: $("#idUser").val(),
        attendanceTime: $("#attendanceTime").val(),
      };

      $.ajax({
        url: "http://localhost:8083/api_attendance/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The attendance has been saved successfully.");
          $("#modalForm").hide();
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to save attendance.");
        },
      });
    }
  });

  $(document).on("click", "#returnTable1", function () {
    $("#modalForm").hide();
  });
});