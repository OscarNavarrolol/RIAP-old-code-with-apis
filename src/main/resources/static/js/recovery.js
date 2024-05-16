$(document).ready(function () {
    var editRecoveryID = null;
    function loadRecoveryList() {
      const $output = $("#data");
      const $headerTable = $("#headerTable");
      $.ajax({
        url: "http://localhost:8083/api_recovery/list_recovery",
        type: "GET",
        dataType: "json",
        success: function (response) {
          const headers =
            "<tr><th>Id Recovery</th><th>Recovery Key</th><th>Expiration Date</th><th>ID User</th><th>Actions</th></tr>";
          $headerTable.html(headers);
          $output.html(response.map(mapRecoveryItem));
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }
  
    function mapRecoveryItem(item) {
      return `<tr><td>${item.idRecovery}</td><td>${item.recoveryKey}</td><td>${item.expirationDate}</td><td>${item.idUser}</td>
      <td><button id="view-recovery" class="view-btn" data-id="${item.idRecovery}">
      <img src="/images/iconView.png" class="action"></button><button id="edit-recovery" class="edit-btn" data-id="${item.idRecovery}">
      <img src="/images/iconEdit.png" class="action"></button><button id="delete-recovery" class="delete-btn" data-id="${item.idRecovery}">
      <img src="/images/iconDelete.png" class="action"></button></td></tr>`;
    }
  
    $("#buttonRecovery").click(function () {
      loadRecoveryList();
      $("#modalForm").load("/recovery/get_recovery");
      $("#bton-close-modal").click();
      $("#modalForm").hide()
      $("#add-btn-attendance").hide();
      $("#add-btn-course").hide();
      $("#add-btn-event").hide();
      $("#add-btn-program").hide();
      $("#add-btn-user-course").hide();
      $("#add-btn-user").hide();
      $("#add-btn-recovery").show();
      $("#welcome").hide();
    });
    
    $(document).on("click", "#view-recovery", function () {
      var ID = $(this).data("id");
      $("#modalForm").show();
      $.ajax({
        url: `http://localhost:8083/api_recovery/find/${ID}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          $("#idRecovery").val(data.idRecovery).prop("readonly", true);
          $("#recoveryKey").val(data.recoveryKey).prop("readonly", true);
          $("#expirationDate").val(data.expirationDate).prop("readonly", true);
          $("#idUserData").val(data.idUser).prop("readonly", true);
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