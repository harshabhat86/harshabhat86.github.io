var userid = "S55RBrto3KV4uycw69TepJlO1";
var username = "Harsha Bhat";

function loaded() {
    getData("owned");
    getData("contributed");
    getData("all");
}

function getData(tab) {
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
                var data = JSON.parse(xmlhttp.responseText);
                
                switch(tab) {
                    case "owned" : {
                        appendOwnedData(data);
                        break;
                    }
                    case "contributed" : {
                        appendContributedToData(data);
                        break;
                    }
                    case "all" : {
                        appendAllData(data);
                        break;
                    }
                }
            } catch (x) {
                console.log("Crashed " + x);
            }

        } 
    }
    
    var myurl;
    var myOtherUrl;
    
    switch(tab) {
            case "owned" : {
                myurl = encodeURIComponent("{\"ownerId\":\""+userid+"\"}");
                myOtherUrl = "https://api.parse.com/1/classes/Spotfix?where="+myurl;
                break;
            }
            case "contributed" : {
                myurl = encodeURIComponent("{\"volunteers\":\""+username+"\"}");
                myOtherUrl = "https://api.parse.com/1/classes/Spotfix?where="+myurl;
                break;
            }
            case "all" : {
                myOtherUrl = "https://api.parse.com/1/classes/Spotfix?order=isComplete";
                break;
            }
    }
    
    xmlhttp.open("GET", myOtherUrl, true);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0")
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp")
    xmlhttp.send();
}

function appendOwnedData(data) {
    var results = data.results;
    var size = results.length;
    
    for(var i = 0; i < size; i++) {
        var refId = "collapse-owned"+i;
        var completed = results[i].isComplete? 'Completed' : 'To be fixed';
        
        $( "#accordion-owned-data" ).append(
            '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#accordion-owned-data" href="#' + refId + '">' +
            results[i].addressOfTheFix + ' --- Date : ' + results[i].soptFixDate.iso.substring(0, 10) + ' --- ' + completed +
            '</a></h4></div>' +
            '<div id="' + refId + '" class="panel-collapse collapse">' +
            '<div class="panel-body">' +
            '<b>' + results[i].description + '</b><br/>' +
            'To be fixed on                : ' + results[i].soptFixDate.iso.substring(0, 10) + '<br/>' +
            'Approximate time for fix      : ' + results[i].hoursNeeded + '<br/>' +
            'People needed                 : ' + results[i].noOfPeople + '<br/>' +
            'Volunteers                    : ' + results[i].volunteers + '<br/>' +
            'Location(latitude, longitude) : ' + results[i].latLng.latitude + ', ' + results[i].latLng.longitude + '<br/>' +
            'Created on                    : ' + results[i].createdAt.substring(0, 10) + '<br/>' +
            'Last updated on               : ' + results[i].updatedAt.substring(0, 10) + '<br/>' +
            '</div></div>'
        );
    }
    
    $( "#accordion-owned-data" ).addClass("panel-group")
}

function appendContributedToData(data) {
    var results = data.results;
    var size = results.length;
    
    for(var i = 0; i < size; i++) {
        var refId = "collapse-contributed"+i;
        var completed = results[i].isComplete? 'Completed' : 'To be fixed';
        
        $( "#accordion-contributed-data" ).append(
            '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#accordion-contributed-data" href="#' + refId + '">' +
            results[i].addressOfTheFix + ' --- Date : ' + results[i].soptFixDate.iso.substring(0, 10) + ' --- ' + completed +
            '</a></h4></div>' +
            '<div id="' + refId + '" class="panel-collapse collapse">' +
            '<div class="panel-body">' +
            '<b>' + results[i].description + '</b><br/>' +
            'To be fixed on                : ' + results[i].soptFixDate.iso.substring(0, 10) + '<br/>' +
            'Approximate time for fix      : ' + results[i].hoursNeeded + '<br/>' +
            'People needed                 : ' + results[i].noOfPeople + '<br/>' +
            'Owner name                    : ' + results[i].ownerName + '<br/>' +
            'Volunteers                    : ' + results[i].volunteers + '<br/>' +
            'Location(latitude, longitude) : ' + results[i].latLng.latitude + ', ' + results[i].latLng.longitude + '<br/>' +
            'Created on                    : ' + results[i].createdAt.substring(0, 10) + '<br/>' +
            'Last updated on               : ' + results[i].updatedAt.substring(0, 10) + '<br/>' +
            '</div></div>'
        );
    }
    
    $( "#accordion-contributed-data" ).addClass("panel-group")
}

function appendAllData(data) {
    var results = data.results;
    var size = results.length;
    
    for(var i = 0; i < size; i++) {
        var refId = "collapse-all"+i;
        var completed = results[i].isComplete? 'Completed' : 'To be fixed';
        
        $( "#accordion-all-data" ).append(
            '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#accordion-all-data" href="#' + refId + '">' +
            results[i].addressOfTheFix + ' --- Date : ' + results[i].soptFixDate.iso.substring(0, 10) + ' --- ' + completed +
            '</a></h4></div>' +
            '<div id="' + refId + '" class="panel-collapse collapse">' +
            '<div class="panel-body">' +
            '<b>' + results[i].description + '</b><br/>' +
            'To be fixed on                : ' + results[i].soptFixDate.iso.substring(0, 10) + '<br/>' +
            'Approximate time for fix      : ' + results[i].hoursNeeded + '<br/>' +
            'People needed                 : ' + results[i].noOfPeople + '<br/>' +
            'Owner name                    : ' + results[i].ownerName + '<br/>' +
            'Volunteers                    : ' + results[i].volunteers + '<br/>' +
            'Location(latitude, longitude) : ' + results[i].latLng.latitude + ', ' + results[i].latLng.longitude + '<br/>' +
            'Created on                    : ' + results[i].createdAt.substring(0, 10) + '<br/>' +
            'Last updated on               : ' + results[i].updatedAt.substring(0, 10) + '<br/>' +
            '</div></div>'
        );
    }
    
    $( "#accordion-all-data" ).addClass("panel-group")
}