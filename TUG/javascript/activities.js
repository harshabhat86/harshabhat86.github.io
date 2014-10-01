var userid,username;

if (Parse.User.current()){
 userid = Parse.User.current().attributes.username;
 username = Parse.User.current().attributes.name;
}

locationArray = [];

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
    locationArray = results;
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
    locationArray = results;
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

//Render Google Maps
google.maps.event.addDomListener(window, 'load', initialize);