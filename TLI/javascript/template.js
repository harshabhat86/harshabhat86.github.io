var lat, lng;
Parse.initialize("vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0", "kz4KisAWl3Xc8QRWbgpVU2FrnGoMh5BIL0I3V0c1");


window.fbAsyncInit = function() {
        FB.init({
          appId      : '537059559759743',
          xfbml      : true,
          version    : 'v2.1'
        });
    
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
 


var getUserDetails = function(){
 
    FB.api(
    "/me",
    function (response) {
        
      if (response && !response.error) {
        alert("Person name:"+response.name);
      }
    }
);

};

//getUserDetails();
var saveUserDetails = function (){
        
}

var locationArray = [{area:"Banashankari, Bangalore",lat:12.9373, lng:77.5543,desc:bigFatDescription},
                      {area:"RVCE, Bangalore",lat:12.9239, lng:77.4997,desc:bigFatDescription},
                     {area:"Malleshwaram, Bangalore",lat:12.9800, lng:77.5750,desc:bigFatDescription},
                     {area:"Maratahalli, Bangalore",lat:12.9562, lng:77.7019,desc:bigFatDescription},
                     {area:"KR Puram, Bangalore",lat:12.9950, lng:77.6800,desc:bigFatDescription},
                     {area:"Basavanagudi, Bangalore",lat:12.9400, lng:77.5700,desc:bigFatDescription}
                     
                    ];


var bigFatDescription = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Spot Fix</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Spot fix in this place is scheduled in a week and we welcome people to join!</b>' +
      'People needed: Around 15'+
      'Approx. time needed: 4-5 hours'+
      'Total area: around 500 Square feet'+
      '</p>'+
      '</div>'+
      '</div>';

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
    var markr = new google.maps.Marker({
      position: coordArray[coord],
      map: myMap,
      title: locationArray[coord].area
    });
      
    
      google.maps.event.addListener(markr, 'click', function() {
        var infowindow = new google.maps.InfoWindow({
            
            content: 'No Info Yet'
        });  
        infowindow.open(myMap,markr);
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
