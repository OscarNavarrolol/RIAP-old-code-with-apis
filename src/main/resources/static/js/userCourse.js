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

  $("#buttonUsersCourses").click(function () {
    fetchData(
      "http://localhost:8083/api_user_course/list_user_course",
      "<tr><th>Id User Course</th><th>Id Course</th><th>Id User</th><th>Actions</th></tr>",
      (item) =>
        `<tr><td>${item.idUserCourse}</td><td>${item.idCourse}</td><td>${item.idUser}</td><td><button class="view-btn" data-id="${item.idUserCourse}"><img src="/images/iconView.png" class="action"></button><button class="edit-btn" data-id="${item.idUserCourse}"><img src="/images/iconEdit.png" class="action"></button><button class="delete-btn" data-id="${item.idUserCourse}"><img src="/images/iconDelete.png" class="action"></button></td></tr>`
    );

    $(document).on("click", ".view-btn", function () {
      var idreference = $(this).data("id");
      $("#modalForm").load("/user_course/get_user_course");

      $.ajax({
        url: `http://localhost:8083/api_user_course/find/${idreference}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          $("#idUserCourse").val(data.idUserCourse).prop("readonly", true);
          $("#idCourse").val(data.idCourse).prop("readonly", true);
          $("#idUserData").val(data.idUser).prop("readonly", true);

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
