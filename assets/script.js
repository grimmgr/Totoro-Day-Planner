$(document).ready(function() {

    let dateDisplay = moment().format("dddd, MMMM Do");
 
    let events = {};
    
    let storedEvents = JSON.parse(localStorage.getItem("events"));
    
    if (storedEvents !== null) {
        events = JSON.parse(localStorage.getItem("events"));
    }

    $("#currentDay").text(dateDisplay);
    
    if (moment().format("dddd") === "Monday") {
        $("body").css("background-image", "url(https://images8.alphacoders.com/517/517085.jpg)");
    }
    if (moment().format("dddd") === "Tuesday") {
        $("body").css("background-image", "url(https://images7.alphacoders.com/517/517082.jpg)");
    }
    if (moment().format("dddd") === "Wednesday") {
        $("body").css("background-image", "url(https://images7.alphacoders.com/690/690845.jpg)");
    }
    if (moment().format("dddd") === "Thursday") {
        $("body").css("background-image", "url(https://images6.alphacoders.com/517/517083.jpg)");
    }
    if (moment().format("dddd") === "Friday") {
        $("body").css("background-image", "url(https://images.alphacoders.com/517/517086.jpg)");
    }
    if (moment().format("dddd") === "Saturday") {
        $("body").css("background-image", "url(https://images3.alphacoders.com/636/636472.jpg)");
    }
    if (moment().format("dddd") === "Sunday") {
        $("body").css("background-image", "url(https://images2.alphacoders.com/914/9142.jpg)");
    }

    function setTimeBlockColors() {
        
        $("textarea").each(function() {

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
            if (storedEvents !== null && storedEvents[id]) {
                let text = storedEvents[id];
                $(this).val(text);
            }
            
            
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
 
});




