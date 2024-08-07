$(document).ready(function () {
  var editCourseID = null;
  function loadCourseList() {
    const $output = $("#data");
    const $headerTable = $("#headerTable");
    $.ajax({
      url: "http://localhost:8083/api_course/list_course",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const headers =
          "<tr><th>ID Course</th><th>Id Program</th><th>Number Course</th><th>Actions</th></tr>";
        $headerTable.html(headers);
        $output.html(response.map(mapCourseItem));
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function mapCourseItem(item) {
    return `<tr><td>${item.idCourse}</td><td>${item.idProgram}</td><td>${item.number}</td>
    <td><button id="view-course" class="view-btn" data-id="${item.idCourse}">
    <img src="/images/iconView.png" class="action"></button><button id="edit-course" class="edit-btn" data-id="${item.idCourse}">
    <img src="/images/iconEdit.png" class="action"></button><button id="delete-course" class="delete-btn" data-id="${item.idCourse}">
    <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
  }

  function resetFormCourse() {
    $("#idCourse").val("").prop("readonly", false).show();
    $("label[for='idCourse']").show();
    $("#idProgram").val("").prop("readonly", false);
    $("#numberCourse").val("").prop("readonly", false);
    $("#save-btn-course").show();
    $("#clean-btn").show();
    $(".btnHidden").show();
  }

  $("#buttonCourses").click(function () {
    loadCourseList();
    $("#modalForm").load("/course/get_course");
    $("#bton-close-modal").click();
    $("#modalForm").hide();
    $("#add-btn-attendance").hide();
    $("#add-btn-course").show();
    $("#add-btn-event").hide();
    $("#add-btn-program").hide();
    $("#add-btn-user-course").hide();
    $("#add-btn-user").hide();
    $("#add-btn-recovery").hide();
    $("#welcome").hide();
  });

  $(document).on("click", "#view-course", function () {
    resetFormCourse()
    var ID = $(this).data("id");
    $("#modalForm").show();
    $.ajax({
      url: `http://localhost:8083/api_course/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idCourse").val(data.idCourse).prop("readonly", true);
        $("#idProgram").val(data.idProgram).prop("readonly", true);
        $("#numberCourse").val(data.number).prop("readonly", true);
        $(".btnHidden").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  $(document).on("click", "#delete-course", function () {
    var ID = $(this).data("id");
    if (confirm("Are you sure you want to delete this course?")) {
      $.ajax({
        url: `http://localhost:8083/api_course/delete/${ID}`,
        type: "DELETE",
        success: function (response) {
          alert("The course has been successfully deleted!");
          loadCourseList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to delete the course.");
        },
      });
    }
  });

  $(document).on("click", "#edit-course", function () {
    resetFormCourse()
    var ID = $(this).data("id");
    editCourseID = ID;

    $("#modalForm").show();

    $.ajax({
      url: `http://localhost:8083/api_course/find/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#idCourse").val(data.idCourse);
        $("#idProgram").val(data.idProgram);
        $("#numberCourse").val(data.number);
        $("#save-btn-course").show();
        $("#clean-btn").hide();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
        alert("There was an error trying to load data for editing.");
      },
    });
  });

  $(document).on("click", "#add-btn-course", function () {
    resetFormCourse()
    editCourseID = null;
    $("#modalForm").show();

    $("#idCourse").hide()
    $("label[for='idCourse']").hide();

    $("#idProgram").val("");
    $("#numberCourse").val("");

    $("#btnHidden").show();
  });

  $(document).on("click", "#save-btn-course", function (event) {
    event.preventDefault();

    var ID = editCourseID;

    if (ID != null) {
      var formData = {
        idProgram: $("#idProgram").val(),
        number: $("#numberCourse").val(),
      };

      $.ajax({
        url: `http://localhost:8083/api_course/update/${ID}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The course data has been successfully updated.");
          $("#modalForm").hide();
          loadCourseList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert(
            "There was an error trying to update course data."
          );
        },
      });
    } else {
      var formData = {
        idProgram: $("#idProgram").val(),
        number: $("#numberCourse").val(),
      };

      $.ajax({
        url: "http://localhost:8083/api_course/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          alert("The course has been saved successfully.");
          $("#modalForm").hide();
          loadCourseList();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to save the course.");
        },
      });
    }
  });

  $(document).on("click", "#returnTable2", function () {
    $("#modalForm").hide();
  });

});

