$(document).ready(function () {
  var editEventID = null;
  function loadEventList() {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: "http://localhost:8083/api_event_data/list_event_data",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const headers =
          "<tr><th>Id Event</th><th>Date Event</th><th>Location</th><th>Objective</th><th>Start Time</th><th>End Time</th><th>Actions</th></tr>";
        $headerTable.html(headers);
        $output.html(response.map(mapEventItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapEventItem(item) {
    return `<tr><td>${item.idEvent}</td><td>${item.date}</td><td>${item.location}</td><td>${item.objective}</td>
    <td>${item.startTime}</td><td>${item.endTime}</td><td><button id="view-event" class="view-btn" data-id="${item.idEvent}">
    <img src="/images/iconView.png" class="action"></button><button id="edit-event" class="edit-btn" data-id="${item.idEvent}">
    <img src="/images/iconEdit.png" class="action"></button><button id="delete-event" class="delete-btn" data-id="${item.idEvent}">
    <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  function resetFormEvent() {
    $("#idEventData").val("").prop("readonly", false).show();
    $("label[for='idEventData']").show();
    $("#dateEvent").val("").prop("readonly", false);
    $("#location").val("").prop("readonly", false);
    $("#objective").val("").prop("readonly", false);
    $("#startTime").val("").prop("readonly", false);
    $("#endTime").val("").prop("readonly", false);
    $("#save-btn-event").show();
    $("#clean-btn").show();
    $(".btnHidden").show();
  }

  $("#buttonEvents").click(function () {
    loadEventList();
    $("#modalForm").load("/event_data/get_event");
    $("#bton-close-modal").click();
    $("#modalForm").hide()
    $("#add-btn-attendance").hide();
    $("#add-btn-course").hide();
    $("#add-btn-event").show();
    $("#add-btn-program").hide();
    $("#add-btn-user-course").hide();
    $("#add-btn-user").hide();
    $("#add-btn-recovery").hide();
    $("#welcome").hide();
  });
  
  $(document).on("click", "#view-event", function () {
    resetFormEvent()
    var ID = $(this).data("id");
    $("#modalForm").show();
    $.ajax({
      url: `http://localhost:8083/api_event_data/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idEventData").val(data.idEvent).prop("readonly", true);
        $("#dateEvent").val(data.date).prop("readonly", true);
        $("#location").val(data.location).prop("readonly", true);
        $("#objective").val(data.objective).prop("readonly", true);
        $("#startTime").val(data.startTime).prop("readonly", true);
        $("#endTime").val(data.endTime).prop("readonly", true);
        $(".btnHidden").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  $(document).on("click", "#delete-event", function () {
    var ID = $(this).data("id");
    if (confirm("Are you sure you want to delete this event?")) {
      $.ajax({
        url: `http://localhost:8083/api_event_data/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("The event has been successfully deleted!");
          loadEventList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to delete the event.");
        },
      });
    }
  });

  $(document).on("click", "#edit-event", function () {
    resetFormEvent()
    var ID = $(this).data("id");
    editEventID = ID;
    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_event_data/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idEventData").val(data.idEvent).prop("readonly", true);
        $("#dateEvent").val(data.date);
        $("#location").val(data.location);
        $("#objective").val(data.objective);
        $("#startTime").val(data.startTime);
        $("#endTime").val(data.endTime);
        $("#save-btn-event").show();
        $("#clean-btn").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("There was an error trying to load data for editing.");
      },
    });
  });

  $(document).on("click", "#add-btn-event", function () {
    resetFormEvent()
    editEventID = null;
    $("#modalForm").show();

    $("#idEventData").hide()
    $("label[for='idEventData']").hide();

    $("#dateEvent").val("");
    $("#location").val("");
    $("#objective").val("");
    $("#startTime").val("");
    $("#endTime").val("");

    $("#btnHidden").show();
  });

  $(document).on("click", "#save-btn-event", function (event) {
    event.preventDefault();

    var ID = editEventID;

    if (ID != null) {
      var formData = {
        date: $("#dateEvent").val(),
        location: $("#location").val(),
        objective: $("#objective").val(),
        startTime: $("#startTime").val(),
        endTime: $("#endTime").val(),
      };

      $.ajax({
        url: `http://localhost:8083/api_event_data/update/${ID}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The event data has been successfully updated.");
          $("#modalForm").hide();
          loadEventList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert(
            "There was an error trying to update the event data."
          );
        },
      });
    } else {
      var formData = {
        date: $("#dateEvent").val(),
        location: $("#location").val(),
        objective: $("#objective").val(),
        startTime: $("#startTime").val(),
        endTime: $("#endTime").val(),
      };

      $.ajax({
        url: "http://localhost:8083/api_event_data/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The event has been saved successfully.");
          $("#modalForm").hide();
          loadEventList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to save the event.");
        },
      });
    }
  });

  $(document).on("click","#returnTable3", function (){
    $("#modalForm").hide();
  });
});