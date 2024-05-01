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

  $("#buttonEvents").click(function () {
    fetchData(
      "http://localhost:8083/api_event_data/list_event_data",
      "<tr><th>Id Event</th><th>Date Event</th><th>Location</th><th>Objective</th><th>Start Time</th><th>End Time</th><th>Actions</th></tr>",
      (item) =>
        `<tr><td>${item.idEvent}</td><td>${item.date}</td><td>${item.location}</td><td>${item.objective}</td><td>${item.startTime}</td><td>${item.endTime}</td><td><button class="view-btn" data-id="${item.idEvent}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idEvent}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idEvent}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );

    $(document).on("click", ".view-btn", function () {
      var idreference = $(this).data("id");
      $("#modalForm").load("/event_data/get_event");

      $.ajax({
        url: `http://localhost:8083/api_event_data/find/${idreference}`,
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
