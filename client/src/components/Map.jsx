import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/Leaflet.scss";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import axios from "axios";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const Map = ({
  setValueSender,
  valueSender,
  valueReceiver,
  // setValueReceiver,
  setLocationNow,
  locationNow,
  valuePrice,
  setValuePrice,
}) => {
  const mapRef = useRef(null);

  const { senderPosition } = valueSender;
  const { receiverPosition } = valueReceiver;

  useEffect(() => {
    if (locationNow) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          setValueSender({
            ...valueSender,
            senderPosition: [latitude, longitude],
          });

          async function fetchData() {
            const key = "7cc710989a1249959ed69f38e581748a";
            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`
              );
              const addressName = response.data.results[0].formatted;

              setValueSender({ ...valueSender, senderAddress: addressName });
            } catch (error) {
              console.log("Error retrieving address:", error);
            }
          }

          fetchData();
        });
      }
    }
  }, [locationNow]);

  useEffect(() => {
    if (mapRef.current && senderPosition && receiverPosition) {
      setLocationNow(false);
      const map = mapRef.current;
      const bounds = L.latLngBounds(senderPosition, receiverPosition);
      map.fitBounds(bounds);

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(senderPosition), L.latLng(receiverPosition)],
        lineOptions: {
          styles: [{ color: "blue", opacity: 1, weight: 5 }],
        },
      }).addTo(map);

      routingControl.on("routesfound", (e) => {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const { summary } = routes[0];
          setValuePrice({
            ...valuePrice,
            distance: (summary.totalDistance / 1000).toFixed(),
          });
        }
      });

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [senderPosition, receiverPosition]);

  return (
    <>
      <MapContainer
        center={senderPosition}
        ref={mapRef}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          width: "100%",
          height: "100%",
          zIndex: "1",
        }}
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
    </>
  );
};

export default Map;
