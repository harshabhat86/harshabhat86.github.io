var lat, lng;
Parse.initialize("vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0", "kz4KisAWl3Xc8QRWbgpVU2FrnGoMh5BIL0I3V0c1");

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


/*
Takes Latitude and Longitude converts it into Google's format.
*/
var coOrdToGooglePoints = function (location) {
    var i = 0;
    var coOrdArray=[];
    for (i = 0; i < location.length; i++) {
        coOrdArray.push(new google.maps.LatLng(location[i].lat, location[i].lng));
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
var pinCoordinates = function(myMap,geoLocationArray){
    
    var coordinates = [];
    coordinates = coOrdToGooglePoints(geoLocationArray);
    var coord,count=0;
    for (coord in coordinates) {
        
        var markr = new google.maps.Marker({
            position: coordinates[coord],
            map: myMap,
            title: geoLocationArray[count++].area
        });

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
            
        }(myMap, markr,geoLocationArray[count].area));
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
    var map = new google.maps.Map(mapCanvas, mapOptions);



    pinCoordinates(map,locationArray);
};

google.maps.event.addDomListener(window, 'load', initialize);





//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////// ///////////////////////////////////////////////////////////////
////// ///////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
////// //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////





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


