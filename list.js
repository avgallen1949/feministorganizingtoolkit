$("#filter").on("click", "a[filter]", function(){
  
    $("#filter a").removeAttr("selected");
    let what = $(this).attr("filter");
    $(this).attr("selected", "");  
    
    if (what == "all") {
      $("#_list .r").show();
    } else {
      $("#_list .r").show();
      $("#_list .r:not([type='" + what + "'])").hide();
    }
  
    
  });

  
  
  const SPREADSHEET_ID = "1lQ7or3ZUrOArjcqTj73PRoTlE1fheuvKXDI8F0GaO94";
  const TAB_NAME = "Sheet1";
  
  
    $(document).ready(function () {
      
      
        $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID + "/" + TAB_NAME, function (data) {
      
      console.log(data); 
      
       // go over everything in data and run the code below
      data.forEach(function (entry, index) {
        
        let _links = "";
        
        if(entry["mirror/0"] && entry["mirror/0"].length !== 0){   _links += `<a href='`+entry["mirror/0"]+` target="_blank'> </a>`; }

        
        let d = $(`<div class='r' type='` + (entry.type).toLowerCase() + `'> 
            <a href="` + entry["mirror/0"] + `" target="_blank" class="_link">
              <div class="_title">
              
              <h2 title>`
              + entry.title +     
              `</h2></div>
              
            </div>`)
          .appendTo("#_list");
        

    
      });
          
      // update counters
  
      $("[counter]").text($(".r").length);
      $(".count_all").text($(".r").length);
      $(".count_abortion").text($(".r[type*='abortion']").length);
      $(".count_education").text($(".r[type*='education']").length);
      $(".count_org").text($(".r[type*='org']").length);
      $(".count_organization").text($(".r[type*='organization']").length);
    });  
  
  
  
      
      // write
      
  
    })