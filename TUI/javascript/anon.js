var lat, lng;
Parse.initialize("vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0", "kz4KisAWl3Xc8QRWbgpVU2FrnGoMh5BIL0I3V0c1");

$(document).ready(function () {
    
    
    //If there is already a logged in user,then no need to show the FB glyph
    if (Parse.User.current()){
          $('#loginUsingFb').html("Hi "+Parse.User.current().attributes.name);
          $('#loginUsingFb').attr("title","Visit My Profile");
          $('#loginUsingFb').attr("href","activities.html");
     
    }
    
     $("#loginUsingFb").on("hover", function () {
    
        $('#loginUsingFb').tooltip('show');
    });
   
});



var bigFatDescription = 'test';
var locationArray = [{
        area: "Banashankari, Bangalore",
        lat: 12.9373,
        lng: 77.5543,
        desc: bigFatDescription
    },
    {
        area: "RVCE, Bangalore",
        lat: 12.9239,
        lng: 77.4997,
        desc: bigFatDescription
    },
    {
        area: "Malleshwaram, Bangalore",
        lat: 12.9800,
        lng: 77.5750,
        desc: bigFatDescription
    },
    {
        area: "Maratahalli, Bangalore",
        lat: 12.9562,
        lng: 77.7019,
        desc: bigFatDescription
    },
    {
        area: "KR Puram, Bangalore",
        lat: 12.9950,
        lng: 77.6800,
        desc: bigFatDescription
    },
    {
        area: "Basavanagudi, Bangalore",
        lat: 12.9400,
        lng: 77.5700,
        desc: bigFatDescription
    }

                    ];



var coordArray = [];

var mapPosition = function () {
    var i = 0;
    for (i = 0; i < locationArray.length; i++) {
        coordArray.push(new google.maps.LatLng(locationArray[i].lat, locationArray[i].lng));
    }

}
var showAllCoordinates = function (myMap) {
    mapPosition();
    var coord;
    for (coord in coordArray) {
        var markr = new google.maps.Marker({
            position: coordArray[coord],
            map: myMap,
            title: locationArray[coord].area
        });


        google.maps.event.addListener(markr, 'click', function () {
            var infowindow = new google.maps.InfoWindow({

                content: 'No Info Yet'
            });
            infowindow.open(myMap, markr);
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
        center: new google.maps.LatLng(12.9667, 77.5667),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);



    showAllCoordinates(map);
    
    google.maps.event.addListener(map, 'tilesloaded', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    showAllCoordinates(map);
  });
};

function set_location(pos) {
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