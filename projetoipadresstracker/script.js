document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        showSearching('Searching...')

        
        
        let url = `https://geo.ipify.org/api/v1?apiKey=at_uUwY3NKT6zvJaiinHnUMbI5Eo6h1J&ipAddress=${encodeURI(input)}`

        let results = await fetch(url);
        let json = await results.json();

        if(json.code !== 422) {
            showInfo({
                ipAddress: json.ip,
                location: json.location.city,
                locationCountry: json.location.country,
                timezone: json.location.timezone,
                isp: json.isp,
                cordY: json.location.lat,
                cordZ: json.location.lng
               
            });
            



        } else {
            clearInfo();
            showWarning();
        }


    } else {
        clearInfo();
    }
});

//Map

    var mymap = L.map('mapid').setView([-23.532334151945356, -46.516297112574385], 13);
    var marker = L.marker([-23.532334151945356, -46.516297112574385]).addTo(mymap);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VzdGF2ZWxzb24iLCJhIjoiY2tzOTczbTFhMGUwbDJ1cXA1ajRmbGk1eiJ9.xgGKaCLKgloidJgCBimN0w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}





//functions

function showSearching() {
    document.querySelector('button').style.width = '100px'
    document.querySelector('button').innerHTML = 'Searching...';
}
function showWarning() {
    document.querySelector('button').style.width = '100px';
    document.querySelector('button').innerHTML = 'Not Founded';
    document.querySelector('button').style.backgroundColor = 'red';
}
function founded() {
    document.querySelector('button').style.backgroundColor = 'green';
    document.querySelector('button').innerHTML = 'Founded!';
}
function showInfo(json) {
    founded();

    document.querySelector('.ip--zone').innerHTML = `${json.ipAddress}`
    document.querySelector('.location--zone').innerHTML = `${json.location}, ${json.locationCountry}`
    document.querySelector('.time--zone').innerHTML = `${json.timezone}`
    document.querySelector('.isp--zone').innerHTML = `${json.isp}`

} 
function clearInfo() {
    document.querySelector('.ip--zone').innerHTML = '----';
    document.querySelector('.location--zone').innerHTML = '----';
    document.querySelector('.time--zone').innerHTML = '----';
    document.querySelector('.isp--zone').innerHTML = '----';
}
