var userid = Parse.User.current().attributes.username;
var username = Parse.User.current().attributes.name;
//logout
//Parse.User.logOut();
function loaded() {
    getData("owned");
    getData("contributed");
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
    }
    
    xmlhttp.open("GET", myOtherUrl, true);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0");
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp");
    xmlhttp.send();
}

function appendOwnedData(data) {
    var results = data.results;
    var size = results.length;
    
    for(var i = 0; i < size; i++) {
        var refId = "collapse-owned"+i;
        var buttonId = results[i].objectId;
        var completed = results[i].isComplete? 'Completed' : 'To be fixed';
        var markCompleteButton = '';
        
        if(!results[i].isComplete && new Date(results[i].soptFixDate.iso.substring(0, 10)) < new Date()) {
            markCompleteButton = '<button onclick="markAsComplete('+ buttonId + ');" id="' + buttonId + '">Mark as Complete</button>';
        }
        var accordionContent = 
            '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#accordion-owned-data" href="#' + refId + '" id="'+buttonId+"-title"+'">' +
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
            markCompleteButton + 
            '</div></div>';
        
        $( "#accordion-owned-data" ).append(accordionContent);
    }
    
    $( "#accordion-owned-data" ).addClass("panel-group");
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
    
    $( "#accordion-contributed-data" ).addClass("panel-group");
}

function markAsComplete(buttonId) {
    var SpotfixObject = Parse.Object.extend("Spotfix");
    var spotfixObject = new SpotfixObject();
    
    spotfixObject.set()
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
                if(data.updatedAt != undefined) {
                    $(buttonId).hide();
                    var title = buttonId.id+"-title";
                    document.getElementById(title).text = document.getElementById(title).text.replace("To be fixed", "Completed");
                }
                    
            } catch (x) {
                console.log("Crashed " + x);
            }

        } 
    }
    
    var params = JSON.stringify({"isComplete":true});
    
    var myurl = "https://api.parse.com/1/classes/Spotfix/"+buttonId.id;
    
    xmlhttp.open("PUT", myurl, true);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0");
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp");
    // get session token using Parse.User._currentUser._sessionToken
    xmlhttp.setRequestHeader("X-Parse-Session-Token", "7Vpf150oGdLpSQU3yL7oHnyzJ");
    xmlhttp.send(params);
}