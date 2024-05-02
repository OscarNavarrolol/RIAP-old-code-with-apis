$(document).ready(function () {
  function loadAttendanceList() {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: "http://localhost:8083/api_program/list_program",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const headers =
          "<tr><th>Id Program</th><th>Name Program</th><th>Actions</th></tr>";
        $headerTable.html(headers);
        $output.html(response.map(mapAttendanceItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapAttendanceItem(item) {
    return `<tr><td>${item.idProgram}</td><td>${item.name}</td><td><button class="view-program view-btn" data-id="${item.idProgram}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idProgram}"><img src="/images/iconEdit.png" class="action"></button><button id="delete-program" class="delete-btn" data-id="${item.idProgram}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonPrograms").click(function () {
    loadAttendanceList();
  });

  $(document).on("click", ".view-program", function () {
    var ID = $(this).data("id");
    $("#modalForm").load("/program/get_program");
    $.ajax({
      url: `http://localhost:8083/api_program/find/${ID}`,
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

  $(document).on("click", "#delete-program", function () {
    var ID = $(this).data("id");
    if (confirm("¿Estás seguro de que deseas eliminar este programa?")) {
      $.ajax({
        url: `http://localhost:8083/api_program/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("¡El programa ha sido eliminado exitosamente!");
          loadAttendanceList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar el programa.");
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
