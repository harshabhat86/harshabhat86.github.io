var lat, lng;

function initialize() {


var mapCanvas = document.getElementById('map_canvas');

var mapOptions = {
    //12.58,77.38
      center: new google.maps.LatLng(parseFloat(lat),parseFloat(lng)),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);    

};
    
function set_location(pos){
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
};

function getLocation() {
    if (navigator.geolocation) {
        position = navigator.geolocation.getCurrentPosition(set_location);
    } else { 
        console.log("No Geo Location");
    }
}
getLocation();
google.maps.event.addDomListener(window, 'load', initialize);
