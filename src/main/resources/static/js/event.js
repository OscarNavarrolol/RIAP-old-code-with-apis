$(document).ready(function () {
  function loadAttendanceList() {
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
        $output.html(response.map(mapAttendanceItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapAttendanceItem(item) {
    return `<tr><td>${item.idEvent}</td><td>${item.date}</td><td>${item.location}</td><td>${item.objective}</td><td>${item.startTime}</td><td>${item.endTime}</td><td><button class="view-event view-btn" data-id="${item.idEvent}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idEvent}"><img src="/images/iconEdit.png" class="action"></button><button id="delete-event" class="delete-btn" data-id="${item.idEvent}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonEvents").click(function () {
    loadAttendanceList();
  });
  
  $(document).on("click", ".view-event", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/event_data/get_event");
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
    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      $.ajax({
        url: `http://localhost:8083/api_event_data/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("¡El evento ha sido eliminada exitosamente!");
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar el evento.");
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