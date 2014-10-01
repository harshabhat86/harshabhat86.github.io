var userid,username;

if (Parse.User.current()){
 userid = Parse.User.current().attributes.username;
 username = Parse.User.current().attributes.name;
}
locationArray = [];

$(document).ready(function(){
    
    $("#planASpotFix").on("hover", function () {
    
        $('this').tooltip('show');
    });
    
    $("#spotFixes").on("hover", function () {
    
        $('this').tooltip('show');
    });
    //if the user is not logged in then dont show the planaspotfix and My Spotfixes options.
    if (typeof userid=="undefined")
    {
           
        $("#planASpotFix").hide();
        $("#mySpotfixes").hide();
        $("#logout").hide();
        
    }
    

});// end $(document).ready




/*
Harsha:Adding Google Map first.

*/



/*

This function takes the data received from PArse and prepares an apt description to be shown.
*/

var getDescription = function(obj){
    var arr = [];
    
    
    arr.push("<b>"+obj.description+"</b><br>");
    arr.push("<em>"+obj.hoursNeeded+" hours needed by "+obj.noOfPeople+" people </em><br>");
    arr.push("Initiated by "+obj.ownerName+"  and scheduled on <b>"+obj.soptFixDate.iso.substr(0,10)+"</b><br>");
    
    arr.push("<b>Address:</b> "+obj.addressOfTheFix==undefined?'Not Given':obj.addressOfTheFix);
    return arr.join("\n");
}

/*
Takes Latitude and Longitude converts it into Google's format.
*/
var coOrdToGooglePoints = function (location) {
    var i = 0;
    var coOrdArray=[];
    for (i = 0; i < location.length; i++) {
        coOrdArray.push(new google.maps.LatLng(location[i].latLng.latitude, location[i].latLng.longitude));
    }
    return coOrdArray;

}

/*
Function: drawGoogleMaps
@input: 

map: A map object by google. Need a reference of the map.

geoLocationArray. Type: Array of objects of the type {latitude, longitude}
example input: [{lat:latitude1,lng:longitude1},{lat:latitude2,lng:longitude2},{lat:latitude3,lng:longitude3}....]


Output: None.

It will draw google map with geo points tagged
*/
var pinCoordinates = function(myMap){
    
    var coordinates = [];
    coordinates = coOrdToGooglePoints(locationArray);
    var coord;
    var count=0;
    for (coord in coordinates) {
        
        var markr = new google.maps.Marker({
            position: coordinates[coord],
            map: myMap,
            title: locationArray[count].description+": [At: "+coordinates[coord].toString()+"]"
            
        });
        count+=1;

        /*
        Binding the co ordinate values using closures!
        */
        google.maps.event.addListener(markr, 'click', function (mapObj, marker, info) {
            
            return function(){
            var infowindow = new google.maps.InfoWindow({

                content: '<b>'+info+'</b>'
            });
            infowindow.open(mapObj, marker);
            }
            
        }(myMap, markr,getDescription(locationArray[count])));
    }
    
}


/*
This is a method that initializes google maps in the web page
intentionally hoisted the function. 

1) Init will render the map first.
2) then it will take the points on the Array of geo locations and pin them onto the map.
3) Add description to the geo tags so that the user can change the status there itself.
*/

function initialize() {


    var mapCanvas = document.getElementById('map_canvas');

    var mapOptions = {
        //12.58,77.38
        center: new google.maps.LatLng(12.9667, 77.5667),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
console.log("coming till here :"+locationArray.length);
    var map = new google.maps.Map(mapCanvas, mapOptions);
console.log("locationArray is in function is :"+locationArray.length);
    pinCoordinates(map);
};





/*
End addition by Harsha
*/



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
    locationArray = results;
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
        '<button onclick="signUp('+ buttonId + ');" id="' + buttonId + '">Join this Spot Fix</button>' +
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



//Render Google Maps
google.maps.event.addDomListener(window, 'load', initialize);