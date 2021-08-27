var latlong;
function initMap() {
    const myLatlng = { lat: 21.720369824277416, lng: 72.16295898817727 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: myLatlng,
    });
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });
    infoWindow.open(map);
    map.addListener("click", (mapsMouseEvent) => {
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      latlong = mapsMouseEvent.latLng.toJSON();

      var s = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latlong["lat"] + "&lon=" + latlong["lng"] + "&exclude=hourly,daily&appid={Your Openweather one call api key}";
      async function getUsers() {
        let response = await fetch(s);
        let data = await response.json();
        return data;
      }
      getUsers().then((data) => {
         show(data);
      });
      infoWindow.open(map);
    });
  }

  function show(data){
         console.log(data);
          document.getElementById('temp').innerText = parseInt(data['current']['temp'] - 273) + ' C';
          document.getElementById('pressure').innerText = data['current']['pressure'] + " hPa";  
          document.getElementById('windspeed').innerText = data['current']['wind_speed'] + " m/s";  
          document.getElementById('humidity').innerText = data['current']['humidity'] + " %";  
          document.getElementById('clouds').innerText = data['current']['clouds'] + " %";  
          document.getElementById('img').src = `http://openweathermap.org/img/wn/${data['current']['weather'][0]['icon']}@2x.png`;

          document.getElementById('desc').innerHTML = data['current']['weather'][0]['main'] + " ("+ data['current']['weather'][0]['description'] + ")" ;


  }

  