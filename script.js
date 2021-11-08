const mapId = 'map';
const initialCoordinates = [40.4169473, -3.7057172]; // Plaza Sol en Madrid [lat, lng]
const map = L.map(mapId).setView(initialCoordinates, 16);

//Para encontrar mi ubicacion
const getMyUbicacion=()=>{
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
             console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);
                initialCoordinates[0] =position.coords.latitude;
                initialCoordinates[1]=position.coords.longitude;
            L.marker(initialCoordinates).bindPopup("<b> Mi casa</b><br>Posición final").addTo(map);
            map.setView(initialCoordinates, 16) // te posiciona automaticamente en tu ubicacion al abrir el navegador
        });
        return initialCoordinates
    } 
    else {
      console.warn("Tu navegador no soporta Geolocalización!! ");
    }
}
//llamada a la funcion
getMyUbicacion()

//mi TOKKEN creada en la api
const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
  'pk.eyJ1IjoiaXNhZ3VhcG8iLCJhIjoiY2t1bWs5bDNiMGJmbDJ2b2FxdXhkbG43YyJ9.VNifof8EvAewcFfj-17wWg';

  L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
  }).addTo(map);



