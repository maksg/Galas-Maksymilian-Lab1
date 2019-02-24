document.addEventListener('DOMContentLoaded', appStart);

var map, infoWindow;
var userMarker;

function appStart() {
    document.addEventListener('keydown', moveUserMarker);
}

function moveUserMarker(e) {
    if (userMarker == undefined) {
        return;
    }

    var position = userMarker.getPosition();
    var latLng;
    switch (e.keyCode) {
        // Left
        case 37:
            latLng = new google.maps.LatLng(position.lat(), position.lng() - 0.2);
            break;
        // Right
        case 39:
            latLng = new google.maps.LatLng(position.lat(), position.lng() + 0.2);
            break;
        // Up
        case 38:
            latLng = new google.maps.LatLng(position.lat() + 0.2, position.lng());
            break;
        // Down
        case 40:
            latLng = new google.maps.LatLng(position.lat() - 0.2, position.lng());
            break;
    }
    userMarker.setPosition(latLng);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        keyboardShortcuts: false,
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            userMarker = new google.maps.Marker({ position: pos, map: map });
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}