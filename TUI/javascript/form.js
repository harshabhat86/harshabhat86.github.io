var userid,username;
var geocoder;
var map;
var addressGeoTags;
var infowindow = new google.maps.InfoWindow();
var error_;

if (Parse.User.current()){
 userid = Parse.User.current().attributes.username;
 username = Parse.User.current().attributes.name;
}
locationArray = [];

$(document).ready(function(){
    
    $("#soptFixDate").datepicker({ autoclose: true, todayHighlight: true, dateFormat: "dd-mm-yy"});
    
    
    $("#addressOfTheFix").on("blur",function(){
    if ($(this).val()!='')
    codeAddress();
    }
                            
    );
    
    $("#createSpotfix").on("click",function(){createSpotFix();});     
    
    
    $("#soptFixTime").on("blur",function(){
    
    if ($(this).val()!=''){
    var pattern =  new RegExp("^(1?[0-9]|2[0-3]):[0-5][0-9]$");                             
    if (pattern.test($(this).val())==false){
        console.log("Pattern match fail!");
        $("#soptFixTime").focus();
        alert("Invalid Time Format");
        $(this).val("");
        
        
    }
    }
    });

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
    map = new google.maps.Map(mapCanvas, mapOptions);

    //pinCoordinates(map);
    
    geocoder = new google.maps.Geocoder();
    
    google.maps.event.addListener(map, 'click', function(e) {
    placeMarker(e.latLng, map);
  });
    
    
};

/*
On click on the map, places a red marker there!
*/
function placeMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  map.panTo(position);
  addressGeoTags = position;
  codeLatLng();      
}

/*

Enter a valid address and it pins that place on the map
*/
function codeAddress() {
  var address = $("#addressOfTheFix").val();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
        addressGeoTags = results[0].geometry.location;
    } else {
      alert('Could not find the address entered:' + status);
    }
  });
}

/*

Given latitude and longitude, pins it on the map and gives the adddress
*/
function codeLatLng() {
  var latlng = new google.maps.LatLng(addressGeoTags.k, addressGeoTags.B);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $("#addressOfTheFix").val(results[1].formatted_address);  
        map.setZoom(11);
        marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
        
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      
        
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

function isNullOrUndefined(aVar){
    if (aVar == null || typeof aVar == "undefined"){
        return true;
    }
    
    return false;
    
}
function validEntry(){

    var valid = false;
    if (isNullOrUndefined(addressGeoTags)){
        return valid;
    }
    if (isNullOrUndefined(userid)){
        return valid;
    }
    
    if (isNullOrUndefined(username)){
        return valid;
    }
    
    if (isNullOrUndefined($("#description").val())){
        return valid;
    }
    
    if (isNullOrUndefined(parseInt($("#noOfPeople").val()))){
        return valid;
    }
    
    if (isNullOrUndefined(parseInt($("#hoursNeeded").val()))){
        return valid;
    }
    
    if (isNullOrUndefined($("#addressOfTheFix").val())){
        return valid;
    }
    
    return true;
    
    
};

function createSpotFix(){
    
    if (!validEntry()){
      alert("All Fields are Mandatory. Please fill them all and create a spotfix!");    
      return;   
    }
    
    var SpotfixObject = Parse.Object.extend("Spotfix");
    var spotfixObject = new SpotfixObject();
    var gp = new Parse.GeoPoint({
                latitude: addressGeoTags.k,
                longitude: addressGeoTags.B                 
            });
    var dtArray = $("#soptFixDate").val().split("/");
    var timeArray = $("#soptFixTime").val().split(":");
    var spotFixDate = new Date();
    spotFixDate.setFullYear(dtArray[2]);
    spotFixDate.setMonth(dtArray[1]);
    spotFixDate.setDate(dtArray[0]);
    spotFixDate.setHours(timeArray[0]);
    spotFixDate.setHours(timeArray[1]);
    
    var dt = new Date($("#soptFixDate").val());
    var dtStr = [dtArray[2],"-",dtArray[1],"-",dtArray[0],"T",timeArray[0],":",timeArray[1],".0Z"].join('');
    console.log(dtStr);
    var dt = {
  "__type": "Date",
  "iso": dtStr
};
    //(dtArray[2],dtArray[1],dtArray[0],timeArray[0],timeArray[1],0,0)
    spotfixObject.set("latLng",gp);
    spotfixObject.set("ownerId", userid);  
    spotfixObject.set("ownerName", username);
    spotfixObject.set("description", $("#description").val());
    spotfixObject.set("noOfPeople", parseInt($("#noOfPeople").val()));
    spotfixObject.set("soptFixDate", dt);
//    spotfixObject.set("soptFixDate", new Date());
    spotfixObject.set("isComplete", false);
    spotfixObject.set("hoursNeeded", parseInt($("#hoursNeeded").val()));
    spotfixObject.set("addressOfTheFix", $("#addressOfTheFix").val());
//    spotfixObject.addUnique("volunteers", username);
    
    spotfixObject.save(null, {
        success: function(spotfixObject) {
            
            $("#createSpotfix").addClass("btn-success").removeClass("btn-primary").html("Spotfix created! Congratulations!!!!");
            $("#formObject").find("input.form-control").val("");
            var tim = setTimeout(function(){
                $("#createSpotfix").addClass("btn-primary").removeClass("btn-success").html("Create Spotfix");
                clearTimeout(tim);
            }, 2000);
            
        },
        error: function(model, error) {
            error_ = error;
            alert("[ERROR while saving:] "+error.message);
            
        }
    });


}

/*
End addition by Harsha
*/



//Render Google Maps
google.maps.event.addDomListener(window, 'load', initialize);