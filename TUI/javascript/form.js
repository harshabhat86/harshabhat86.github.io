var userid,username;

if (Parse.User.current()){
 userid = Parse.User.current().attributes.username;
 username = Parse.User.current().attributes.name;
}
locationArray = [];

$(document).ready(function(){
    
    $("#soptFixDate").datepicker({ autoclose: true, todayHighlight: true });
    
    

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
    //pinCoordinates(map);
    
    google.maps.event.addListener(map, 'tilesloaded', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    pinCoordinates(map);
  });
};





/*
End addition by Harsha
*/



//Render Google Maps
google.maps.event.addDomListener(window, 'load', initialize);