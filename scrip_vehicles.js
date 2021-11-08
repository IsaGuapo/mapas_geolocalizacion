

const urlMetro=(`https://api.metro.net/agencies/lametro/vehicles/`)

let dataTransporItem=[]; //hay que declarar la variable fuera de la funcion para poder usarla fuera. 
let transportLocation=[];


//creacion de llamada a la API con fetch

const getRealTime = async ()=>{
    try{
        let response = await fetch(urlMetro)//fetch para traernos todo el objeto
        let dataTime= await response.json()
        console.log(response)
     
        dataTransporItem=dataTime.items
        console.log(dataTime)
        return dataTransporItem
      }
    catch{
        console.log("error")
    }
}
getRealTime()


//generamos esta funcion para poder iterar la varibale creada
const getData=()=>{
    //a mi variable creada dataTransporItem le aplicamos un .map para iterarlo solo con los atributos que nosotros queremos del objeto del array
    dataTransporItem.map(async (element)=>{
    let latitude= await element.latitude //accede al dato dentro del elemento , en este caso accede a latitud
    let longitude= await element.longitude//accede al dato dentro del elemento , en este caso accede a longitud
    let id= await element.id //entra al id
    let allLocation= await [latitude, longitude] //creamos un array del array. Si no creamos esta variable, se pueden dar como argumentos longitude y latitude en el L.marker
    L.marker(allLocation).addTo(map);
    L.marker(allLocation).bindPopup(id).addTo(map);
    })
}

    //hacemos una funcion para llamar a las funciones anteriores
    async function callData(){
        await getRealTime()
         getData()
    }
    callData()

    //pintar el mapa. Coordenadas iniciales
const mapId='map';
const initialCoordinates =  [34.074042, -118.270412]; 
const map=L.map(mapId).setView(initialCoordinates, 9);
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



//creacion de variable de la url de la API