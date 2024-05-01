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

  $("#buttonPrograms").click(function () {
    fetchData(
      "http://localhost:8083/api_program/list_program",
      "<tr><th>Id Program</th><th>Name Program</th><th>Actions</th></tr>",
      (item) =>
        `<tr><td>${item.idProgram}</td><td>${item.name}</td><td><button class="view-btn" data-id="${item.idProgram}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idProgram}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idProgram}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );

    $(document).on("click", ".view-btn", function () {
      var idreference = $(this).data("id");
      $("#modalForm").load("/program/get_program");

      $.ajax({
        url: `http://localhost:8083/api_program/find/${idreference}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          $("#idProgram").val(data.idProgram).prop("readonly", true);
          $("#nameProgram").val(data.name).prop("readonly", true);

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
