$(document).ready(function() {

    let dateDisplay = moment().format("dddd, MMMM Do");
 
    let events = {};
    events = JSON.parse(localStorage.getItem("events"));

    $("#currentDay").text(dateDisplay);
    
    function setTimeBlockColors() {
        
        $(".time-block").each(function() {

            if ( parseInt($(this).attr("value")) < moment().toObject().hours ) {
                $(this).removeClass("present").removeClass("future").addClass("past");
            } 
            if ( parseInt($(this).attr("value")) === moment().toObject().hours ) {
                $(this).removeClass("past").removeClass("future").addClass("present");
            }
            if ( parseInt($(this).attr("value")) > moment().toObject().hours ) {
                $(this).removeClass("past").removeClass("present").addClass("future");
            }
        });
    }

    function storeEvents() {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function renderEvents() {
        $(".description").each(function () {
        
            let id = $(this).attr("id");
            let storedEvents = JSON.parse(localStorage.getItem("events"));
            let text = storedEvents[id];
            $(this).val(text);
            
        })
    }

    renderEvents();

    setTimeBlockColors();

    setInterval(setTimeBlockColors, 60000);

    $(".saveBtn").on("click", function() {
        let textAreaInput = $(this).prev().val();
        let key = $(this).prev().attr("id");
        events[key] = textAreaInput;
        storeEvents();
        
    });

    $(".clearBtn").on("click", function() {
        $(this).prev().prev().val("");
        let key = $(this).prev().prev().attr("id");
        events[key] = "";
        storeEvents();
    })

    $(".clearAllBtn").on("click", function() {
        $("textarea").each(function() {
            $(this).val("");
            let key = $(this).attr("id");
            events[key] = "";
        })
        storeEvents();
    })
 
})




