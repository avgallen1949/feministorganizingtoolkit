$("#filter").on("click", "a[filter]", function(){
    $("#filter a").removeAttr("selected");
    let what = $(this).attr("filter");
    $(this).attr("selected", "");  
    
    if (what == "all") {
        $("#_list .r").show();
    } else {
        $("#_list .r").show();
        $("#_list .r:not([data-type='" + what + "'])").hide();
    }
});

const SPREADSHEET_ID = "1lQ7or3ZUrOArjcqTj73PRoTlE1fheuvKXDI8F0GaO94";
const TAB_NAME = "Sheet1";

$(document).ready(function () {
    $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID + "/" + TAB_NAME, function (data) {
        console.log(data); 

        data.forEach(function (entry) {
            let type = entry.type ? entry.type.toLowerCase() : "uncategorized";

            $(`<div class='r' data-type='${type}'>
                <a href="${entry["mirror/0"]}" target="_blank" class="_link">
                    <div class="_title">
                        <h2>${entry.title}</h2>
                    </div>
                </a>
            </div>`).appendTo("#_list");
        });

        $(".count_all").text($(".r").length);
        $(".count_abortion").text($(".r[data-type='abortion']").length);
        $(".count_education").text($(".r[data-type='education']").length);
        $(".count_org").text($(".r[data-type='org']").length);
        $(".count_organization").text($(".r[data-type='organization']").length);
    });        
});