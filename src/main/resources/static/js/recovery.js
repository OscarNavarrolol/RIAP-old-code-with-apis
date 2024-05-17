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
            "<tr><th>Id Recovery</th><th>ID User</th><th>Recovery Key</th><th>Expiration Date</th><th>Actions</th></tr>";
          $headerTable.html(headers);
          $output.html(response.map(mapRecoveryItem));
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }
  
    function mapRecoveryItem(item) {
      return `<tr><td>${item.idRecovery}</td><td>${item.idUser}</td><td>${item.recoveryKey}</td><td>${item.expirationDate}</td>
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
          $("#idUserData").val(data.idUser).prop("readonly", true);
          $("#recoveryKey").val(data.recoveryKey).prop("readonly", true);
          $("#expirationDate").val(data.expirationDate).prop("readonly", true);
          $(".btnHidden").hide();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    });
  
    $(document).on("click", "#delete-recovery", function () {
      var ID = $(this).data("id");
      if (confirm("Are you sure you want to delete this recovery?")) {
        $.ajax({
          url: `http://localhost:8083/api_recovery/delete/${ID}`,
          type: "DELETE",
          success: function (response) {
            alert("The recovery has been successfully deleted!");
            loadRecoveryList();
          },
          error: function (xhr, status, error) {
            console.error(xhr.responseText);
            alert("There was an error trying to delete the recovery.");
          },
        });
      }
    });
  
    $(document).on("click", "#edit-recovery", function () {
      var ID = $(this).data("id");
      editRecoveryID = ID;
      $("#modalForm").show();
  
      $.ajax({
        url: `http://localhost:8083/api_recovery/find/${ID}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          $("#idRecovery").val(data.idRecovery).prop("readonly", true);
          $("#idUserData").val(data.idUser);
          $("#recoveryKey").val(data.recoveryKey);
          $("#expirationDate").val(data.expirationDate);
          $("#save-btn-recovery").show();
          $("#clean-btn").hide();
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          alert("There was an error trying to load data for editing.");
        },
      });
    });
  
    $(document).on("click", "#add-btn-recovery", function () {
      editRecoveryID = null;
      $("#modalForm").show();
  
      $("#idRecovery").hide()
      $("label[for='idRecovery']").hide();

      $("#idUser").val("");
      $("#recoveryKey").val("");
      $("#expirationDate").val("");

      $("#btnHidden").show();
    });
  
    $(document).on("click", "#save-btn-recovery", function (event) {
      event.preventDefault();
  
      var ID = editRecoveryID;
  
      if (ID != null) {
        var formData = {
          idUser: $("#idUserData").val(),
          recoveryKey: $("#recoveryKey").val(),
          expirationDate: $("#expirationDate").val(),
        };
  
        $.ajax({
          url: `http://localhost:8083/api_recovery/update/${ID}`,
          type: "PUT",
          contentType: "application/json",
          data: JSON.stringify(formData),
          success: function (response) {
            alert("The recovery data has been successfully updated.");
            $("#modalForm").hide();
            loadRecoveryList();
          },
          error: function (xhr, status, error) {
            console.error(xhr.responseText);
            alert(
              "There was an error trying to update the recovery."
            );
          },
        });
      } else {
        var formData = {
          idUser: $("#idUserData").val(),
          recoveryKey: $("#recoveryKey").val(),
          expirationDate: $("#expirationDate").val(),
        };
  
        $.ajax({
          url: "http://localhost:8083/api_recovery/save",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(formData),
          success: function (response) {
            alert("The recovery has been saved successfully.");
            $("#modalForm").hide();
            loadRecoveryList();
          },
          error: function (xhr, status, error) {
            console.error(xhr.responseText);
            alert("There was an error trying to save the recovery.");
          },
        });
      }
    });
  
    $(document).on("click","#returnTable7", function (){
      $("#modalForm").hide();
    });
  });