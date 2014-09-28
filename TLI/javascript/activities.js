function getData() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            try {
                console.log(xmlhttp.responseText);
                var data = JSON.parse(xmlhttp.responseText);
                console.log(data);	
                appendText(data);
            } catch (x) {
                console.log("Crashed " + x);
            }

        } 
    }
    
    var myurl = encodeURIComponent("{\"ownerName\":\"Sharath M Bhat\"}");
    console.log(myurl);

    var myOtherUrl = 
       "https://api.parse.com/1/classes/Spotfix?where="+myurl;
    
    xmlhttp.open("GET", myOtherUrl, true);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0")
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp")
    xmlhttp.send();
}

function appendText(data) {
    var results = data.results;
    console.log("Results[0] = "+results[0].addressOfTheFix);
    
    var size = results.length;
    
    for(var i = 0; i < size; i++) {
        var refId = "collapse"+i;
        
        $( "#accordion-owned-data" ).append(
            '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#accordion-owned-data" href="#' + refId + '">' +
            results[i].ownerName + ', Hours needed : ' + results[i].hoursNeeded + 
            '</a></h4></div>' +
            '<div id="' + refId + '" class="panel-collapse collapse">' +
            '<div class="panel-body"> Volunteers : ' +
            results[i].volunteers +
            '</div></div>'
        );
    }
    
//    $( "#accordion-owned-data" ).append(
//            '<div class="panel panel-default">' +
//            '<div class="panel-heading">' +
//            '<h4 class="panel-title">' +
//            '<a data-toggle="collapse" data-parent="#accordion-owned-data" href="#collapseOne">' +
//            results[0].ownerId +
//            '</a></h4></div>' +
//            '<div id="collapseOne" class="panel-collapse collapse in">' +
//            '<div class="panel-body">' +
//            results[0].objectId +
//            '</div></div>'
//    );
//    $( "#accordion-owned-data" ).append(
//            '<div class="panel panel-default">' +
//            '<div class="panel-heading">' +
//            '<h4 class="panel-title">' +
//            '<a data-toggle="collapse" data-parent="#accordion-owned-data" href="#collapseTwo">' +
//            results[1].ownerId +
//            '</a></h4></div>' +
//            '<div id="collapseTwo" class="panel-collapse collapse">' +
//            '<div class="panel-body">' +
//            results[1].objectId +
//            '</div></div>'
//    );
    $( "#accordion-owned-data" ).addClass("panel-group")
    $( "#accordion-owned-data" ).accordion( "refresh" );

//    $("input").click( function() {
//       $( "#accordion" ).find($( "#accordion" ).accordion( "option", "header" )).eq(this.min).find($("span.accordion-header")).text("Section " + Math.random());
//    });
//    
//    <div class="panel panel-default">
//        <div class="panel-heading">
//            <h4 class="panel-title">
//                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" id="">1. What is HTML?</a>
//            </h4>
//        </div>
//        <div id="collapseOne" class="panel-collapse collapse in">
//            <div class="panel-body">
//                <p>HTML stands for HyperText Markup Language. HTML is the main markup language for describing the structure of Web pages. <a href="http://www.tutorialrepublic.com/html-tutorial/" target="_blank">Learn more.</a></p>
//            </div>
//        </div>
//    </div>
                                    
                                    
//    var txt1 = "<p>Text.</p>";               // Create element with HTML  
//    var txt2 = $("<p></p>").text("Text.");   // Create with jQuery
//    var txt3 = document.createElement("p");  // Create with DOM
//    txt3.innerHTML = "Text.";
//    $("#accordion-owned-data").append(txt1, txt2, txt3);         // Append the new elements 
}