var lat, lng;

var locationArray = [{area:"Banashankari, Bangalore",lat:12.9373, lng:77.5543},
                      {area:"RVCE, Bangalore",lat:12.9239, lng:77.4997},
                     {area:"Malleshwaram, Bangalore",lat:12.9800, lng:77.5750},
                     {area:"Maratahalli, Bangalore",lat:12.9562, lng:77.7019},
                     {area:"KR Puram, Bangalore",lat:12.9950, lng:77.6800},
                     {area:"Basavanagudi, Bangalore",lat:12.9400, lng:77.5700}
                     
                    ];
var coordArray = [];

var mapPosition = function(){
    var i=0;
    for (i=0;i<locationArray.length;i++){
     coordArray.push(new google.maps.LatLng(locationArray[i].lat,locationArray[i].lng));      
    }
    
}
var showAllCoordinates = function(myMap){
    mapPosition();
    var coord;
  for (coord in coordArray) {
    new google.maps.Marker({
      position: coordArray[coord],
      map: myMap,
      title: locationArray[coord].area
    });
  }
}

/*
This is a method that initializes google maps in the web page
*/
function initialize() {


var mapCanvas = document.getElementById('map_canvas');

var mapOptions = {
    //12.58,77.38
      center: new google.maps.LatLng(12.9667,77.5667),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);    

    showAllCoordinates(map);
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

//Making it global intentionally. This is temp change

getLocation();
google.maps.event.addDomListener(window, 'load', initialize);
