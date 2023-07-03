import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "../styles/Leaflet.scss";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const MapComponent = ({ senderPosition, receiverPosition }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && senderPosition && receiverPosition) {
      const map = mapRef.current;
      const bounds = L.latLngBounds(senderPosition, receiverPosition);
      map.fitBounds(bounds);

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(senderPosition), L.latLng(receiverPosition)],
        lineOptions: {
          styles: [{ color: "blue", opacity: 1, weight: 5 }],
        },
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [senderPosition, receiverPosition]);
  return (
    <MapContainer
      center={senderPosition}
      zoom={5}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={senderPosition}>
        <Popup>Sender location</Popup>
      </Marker>
      <Marker position={receiverPosition}>
        <Popup>Receiver location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
