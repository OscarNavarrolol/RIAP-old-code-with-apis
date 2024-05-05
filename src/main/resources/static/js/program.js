$(document).ready(function () {
  var editProgramID = null;
  function loadProgramList() {
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
        $output.html(response.map(mapProgramItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapProgramItem(item) {
    return `<tr><td>${item.idProgram}</td><td>${item.name}</td><td><button id="view-program" class="view-btn" data-id="${item.idProgram}">
    <img src="/images/iconView.png" class="action"></button><button id="edit-program" class="edit-btn" data-id="${item.idProgram}">
    <img src="/images/iconEdit.png" class="action"></button><button id="delete-program" class="delete-btn" data-id="${item.idProgram}">
    <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  $("#buttonPrograms").click(function () {
    loadProgramList();
    $("#modalForm").load("/program/get_program");
    $("#bton-close-modal").click();
    $("#modalForm").hide();
    $("#add-btn-attendance").hide();
    $("#add-btn-course").hide();
    $("#add-btn-event").hide();
    $("#add-btn-program").show();
    $("#add-btn-user-course").hide();
    $("#add-btn-user").hide();
  });

  $(document).on("click", "#view-program", function () {
    var ID = $(this).data("id");
    $("#modalForm").show();
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

  $(document).on("click", "#delete_program", function () {
    var ID = $(this).data("id");
    if (confirm("¿Estás seguro de que deseas eliminar este programa?")) {
      $.ajax({
        url: `http://localhost:8083/api_program/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("¡El programa ha sido eliminado exitosamente!");
          loadProgramList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar eliminar el programa.");
        },
      });
    }
  });

  $(document).on("click", "#edit-program", function () {
    var ID = $(this).data("id");
    editProgramID = ID;
    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_program/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idProgram").val(data.idProgram).prop("readonly", true);
        $("#nameProgram").val(data.name);
        $("#save-btn-program").show();
        $("#clean-btn").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("Hubo un error al intentar cargar los datos para editar.");
      },
    });
  });

  $(document).on("click", "#add-btn-program", function () {
    editProgramID = null;
    $("#modalForm").show();

    $("#idProgram").hide()
    $("label[for='idProgram']").hide();

    $("#name_program").val("");

    $("#btnHidden").show();
  });

  $(document).on("click", "#save-btn-program", function (event) {
    event.preventDefault();

    var ID = editProgramID;

    if (ID != null) {
      var formData = {
        name: $("#nameProgram").val(),
      };

      $.ajax({
        url: `http://localhost:8083/api_program/update/${ID}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("Los datos del programa han sido actualizados exitosamente.");
          $("#modalForm").hide();
          loadProgramList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert(
            "Hubo un error al intentar actualizar los datos del programa."
          );
        },
      });
    } else {
      var formData = {
        name: $("#nameProgram").val(),
      };

      $.ajax({
        url: "http://localhost:8083/api_program/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("El programa ha sido guardado exitosamente.");
          $("#modalForm").hide();
          loadProgramList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("Hubo un error al intentar guardar el programa.");
        },
      });
    }
  });

  $(document).on("click","#returnTable4", function (){
    $("#modalForm").hide();
  });
});
