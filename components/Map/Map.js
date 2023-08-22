import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

const Map = () => {
  useEffect(() => {
    document.getElementById("contact-map").innerHTML =
      "<div id='map' style='height: 345px;'></div>";

    var map = L.map("map").setView([29.65941624215519, 52.49249342750305], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var myIcon = L.icon({
      iconUrl: "/images/map/marker-icon.png",
      iconAnchor: [12, 6],
      shadowUrl: "/images/map/marker-shadow.png",
    });

    var marker = L.marker([29.653490451131603, 52.494336725443326], {
      icon: myIcon,
    })
      .bindPopup("<b>shop center</b><br>I am M.Q.")

      .addTo(map)
      .openPopup();
  }, []);

  return <div id="contact-map"></div>;
};

export default Map;
