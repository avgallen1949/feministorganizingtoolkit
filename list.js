
  const SPREADSHEET_ID = "1lQ7or3ZUrOArjcqTj73PRoTlE1fheuvKXDI8F0GaO94";
  const TAB_NAME = "Sheet1";

$(document).ready(function () {

  // Fetch data from the spreadsheet
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID + "/" + TAB_NAME, function (data) {

    console.log(data);

    // Clear any previous data and add new entries
    $("#_list").empty(); // Clear existing list items before adding new ones

    // Go over everything in data and run the code below
    data.forEach(function (entry) {
      let _links = "";
      if (entry["mirror/0"] && entry["mirror/0"].length !== 0) { 
        _links += `<a href='` + entry["mirror/0"] + `' target="_blank"> </a>`; 
      }

      // Dynamically create .r elements with the correct type
      let d = $(`<div class='r' type='` + (entry.type).toLowerCase() + `'> 
        <a href="` + entry["mirror/0"] + `" target="_blank" class="_link">
          <div class="_title">
            <h2 title>` + entry.title + `</h2>
          </div>
        </a>
      </div>`).appendTo("#_list");
    });

    // Update counters
    $(".count_all").text($(".r").length);
    $(".count_abortion").text($(".r[type*='abortion']").length);
    $(".count_education").text($(".r[type*='education']").length);
    $(".count_org").text($(".r[type*='org']").length);
    $(".count_organization").text($(".r[type*='organization']").length);

    // Apply filter behavior
    $("#filter").on("click", "a[filter]", function () {
      // Remove the 'selected' class from all links
      $("#filter a").removeClass("selected");

      // Mark the clicked link as selected
      $(this).addClass("selected");

      let filterValue = $(this).attr("filter");

      if (filterValue == "all") {
        // Show all items when 'all' is selected
        $("#_list .r").show();
      } else {
        // Hide all items first
        $("#_list .r").hide();

        // Show only items that match the selected filter
        $("#_list .r[type='" + filterValue + "']").show();
      }
    });
  });

});
