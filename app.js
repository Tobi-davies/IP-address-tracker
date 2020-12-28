const form = document.querySelector(".location-form");
const input = document.querySelector("input");
const address = document.querySelector(".address");
const position = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp-title");
let ipAdd = input.value;

const apikey = "at_5kbKWTWiK7lllgiGEoABKBQMTIUnF";

window.addEventListener("DOMContentLoaded", () => {
  // function getIPFromAmazon() {
  //   fetch("https://checkip.amazonaws.com/")
  //     .then((res) => res.text())
  //     .then((data) => console.log(data));
  // }

  // getIPFromAmazon();

  function text(url) {
    return fetch(url).then((res) => res.text());
  }

  text("https://www.cloudflare.com/cdn-cgi/trace").then((data) => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
    let ip = data.match(ipRegex)[0];
    ipAdd = ip;
    console.log(ipAdd);
  });

  const xhr = new XMLHttpRequest();

  const url = `https://geo.ipify.org/api/v1?apiKey=${apikey}&ipAddress=${ipAdd}`;

  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const locationData = JSON.parse(this.responseText);
      console.log(locationData);
      const lat = locationData.location.lat;
      const lng = locationData.location.lng;
      addCoordinates(lat, lng);

      // Edit html text content
      address.textContent = locationData.ip;
      position.textContent = `${locationData.location.city}, ${locationData.location.country}`;
      timezone.textContent = `UTC ${locationData.location.timezone}`;
      isp.textContent = locationData.isp;
    }
    input.value = "";
  };

  xhr.send();
});

form.addEventListener("submit", findLocation);
// document.addEventListener('DOMContentLoaded', findLocation)

function findLocation() {
  console.log(input.value);
  const xhr = new XMLHttpRequest();

  const url = `https://geo.ipify.org/api/v1?apiKey=${apikey}&ipAddress=${input.value}`;

  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const locationData = JSON.parse(this.responseText);
      console.log(locationData);
      const lat = locationData.location.lat;
      const lng = locationData.location.lng;
      addCoordinates(lat, lng);

      // Edit html text content
      address.textContent = locationData.ip;
      position.textContent = `${locationData.location.city}, ${locationData.location.country}`;
      timezone.textContent = `UTC ${locationData.location.timezone}`;
      isp.textContent = locationData.isp;
    }
    input.value = "";
  };

  xhr.send();
}

function addCoordinates(lat, lng) {
  var container = L.DomUtil.get("mapid");
  if (container != null) {
    container._leaflet_id = null;
  }

  var mymap = L.map("mapid").setView([lat, lng], 14);

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tiles = L.tileLayer(tileUrl, { attribution });

  tiles.addTo(mymap);

  // Adding custom icon
  var myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [35, 48],
    iconAnchor: [17, 50],
  });

  L.marker([lat, lng], { icon: myIcon }).addTo(mymap);

  // marker.setLatLng([lat, lng])
}

// 100.125.248.242
// 10.97.226.165
//41.190.3.80
//192.168.43.1
