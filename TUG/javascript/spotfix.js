var userid = Parse.User.current().attributes.username;
var username = Parse.User.current().attributes.name;
//logout
//Parse.User.logOut();
function getAllData() {
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
                appendAllData(data);
            } catch (x) {
                console.log("Crashed " + x);
            }
        } 
    }
    xmlhttp.open("GET", "https://api.parse.com/1/classes/Spotfix?order=isComplete", true);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0");
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp");
    xmlhttp.send();
}

function appendAllData(data) {
    var results = data.results;
    var size = results.length;
    
    for(var i = 0; i < size; i++) {
        if(results[i].isComplete)
            appendClosedActivities(results[i], i);
        if(!results[i].isComplete 
                && results[i].ownerName != username && $.inArray(username, results[i].volunteers) == -1)
            appendOpenActivities(results[i], i);
            
//        appendAllActivities(results[i], i);
    }
    
    $( "#accordion-openAct-data" ).addClass("panel-group");
    $( "#accordion-closedAct-data" ).addClass("panel-group");
    $( "#accordion-allAct-data" ).addClass("panel-group");
}

function appendOpenActivities(data, i) {
    var refId = "collapse-openAct"+i;
    var completed = data.isComplete? 'Completed' : 'To be fixed';
    var buttonId = data.objectId;
    
    $( "#accordion-openAct-data" ).append(
        '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
        '<h4 class="panel-title">' +
        '<a data-toggle="collapse" data-parent="#accordion-openAct-data" href="#' + refId + '">' +
        data.addressOfTheFix + ' --- Date : ' + data.soptFixDate.iso.substring(0, 10) + ' --- ' + completed +
        '</a></h4></div>' +
        '<div id="' + refId + '" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<b>' + data.description + '</b><br/>' +
        'To be fixed on                : ' + data.soptFixDate.iso.substring(0, 10) + '<br/>' +
        'Approximate time for fix      : ' + data.hoursNeeded + '<br/>' +
        'People needed                 : ' + data.noOfPeople + '<br/>' +
        'Owner name                    : ' + data.ownerName + '<br/>' +
        'Volunteers                    : ' + data.volunteers + '<br/>' +
        'Location(latitude, longitude) : ' + data.latLng.latitude + ', ' + data.latLng.longitude + '<br/>' +
        'Created on                    : ' + data.createdAt.substring(0, 10) + '<br/>' +
        'Last updated on               : ' + data.updatedAt.substring(0, 10) + '<br/>' +
        '<button onclick="signUp('+ buttonId + ');" id="' + buttonId + '">Signup to volunteer</button>' +
        '</div></div>'
    );
}

function appendClosedActivities(data, i) {
    var refId = "collapse-openClosed"+i;
    var completed = data.isComplete? 'Completed' : 'To be fixed';

    $( "#accordion-closedAct-data" ).append(
        '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
        '<h4 class="panel-title">' +
        '<a data-toggle="collapse" data-parent="#accordion-closedAct-data" href="#' + refId + '">' +
        data.addressOfTheFix + ' --- Date : ' + data.soptFixDate.iso.substring(0, 10) + ' --- ' + completed +
        '</a></h4></div>' +
        '<div id="' + refId + '" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<b>' + data.description + '</b><br/>' +
        'To be fixed on                : ' + data.soptFixDate.iso.substring(0, 10) + '<br/>' +
        'Approximate time for fix      : ' + data.hoursNeeded + '<br/>' +
        'People needed                 : ' + data.noOfPeople + '<br/>' +
        'Owner name                    : ' + data.ownerName + '<br/>' +
        'Volunteers                    : ' + data.volunteers + '<br/>' +
        'Location(latitude, longitude) : ' + data.latLng.latitude + ', ' + data.latLng.longitude + '<br/>' +
        'Created on                    : ' + data.createdAt.substring(0, 10) + '<br/>' +
        'Last updated on               : ' + data.updatedAt.substring(0, 10) + '<br/>' +
        '</div></div>'
    );
}

function appendAllActivities(data, i) {
    var refId = "collapse-openAll"+i;
    var completed = data.isComplete? 'Completed' : 'To be fixed';

    $( "#accordion-allAct-data" ).append(
        '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
        '<h4 class="panel-title">' +
        '<a data-toggle="collapse" data-parent="#accordion-allAct-data" href="#' + refId + '">' +
        data.addressOfTheFix + ' --- Date : ' + data.soptFixDate.iso.substring(0, 10) + ' --- ' + completed +
        '</a></h4></div>' +
        '<div id="' + refId + '" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<b>' + data.description + '</b><br/>' +
        'To be fixed on                : ' + data.soptFixDate.iso.substring(0, 10) + '<br/>' +
        'Approximate time for fix      : ' + data.hoursNeeded + '<br/>' +
        'People needed                 : ' + data.noOfPeople + '<br/>' +
        'Owner name                    : ' + data.ownerName + '<br/>' +
        'Volunteers                    : ' + data.volunteers + '<br/>' +
        'Location(latitude, longitude) : ' + data.latLng.latitude + ', ' + data.latLng.longitude + '<br/>' +
        'Created on                    : ' + data.createdAt.substring(0, 10) + '<br/>' +
        'Last updated on               : ' + data.updatedAt.substring(0, 10) + '<br/>' +
        '</div></div>'
    );
}

function signUp(buttonId) {
    var SpotfixObject = Parse.Object.extend("Spotfix");
    var spotfixObject = new SpotfixObject();
    spotfixObject.id = buttonId.id;
    spotfixObject.addUnique("volunteers", username);  
    spotfixObject.save(null, {
        success: function(object) {
            console.log("Signed up");
            $(buttonId).hide();
        },
        error: function(model, error) {
            console.log("Failed to signup");
        }
    });
}