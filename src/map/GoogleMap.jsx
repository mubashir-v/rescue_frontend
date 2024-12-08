import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios"; // Import axios
import homeIcon from "../assets/png/camp.png"
import hazard from "../assets/png/warningSMall.png"
import person from "../assets/png/people.png"
import disaster from "../assets/png/disaster.png"

const GoogleMap = ({mapCenter,setMapCenter,setLatAndLng,setPage,setIdSelected}) => {
  const [markersData, setMarkersData] = useState([]);
  const mapRef = useRef(null); // Ref for the map container
  const loader = new Loader({
    apiKey: "AIzaSyAYwXgHY8C2xIczuknJmPESYfEVtycFGsM", // Replace with your Google Maps API key
    version: "weekly",
    libraries: ["marker"],
  });
  const mapOptions = {
    center: mapCenter,
    zoom: 12,
    draggableCursor: "pointer", // Cursor when the mouse is over the map
    draggingCursor: "move", // Cursor when dragging the map
  };
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/markers"); // Adjust API URL
        const results = response.data.data;

        const markers = results.map((item, index) => {
          let icon = "";

          // Set different icons based on the model
          switch (item.model) {
            case "Camp":
              icon = homeIcon;
              break;
            case "Hazard":
              icon = hazard;
              break;
            case "Disaster":
              icon = disaster;
              break;
            case "Person":
              icon =person;
              break;
            default:
              icon = "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
          }

          return {
            position: {
              lat: item.lat,
              lng: item.lng,
            },
            title: item.model+"-"+item.title,
            icon: icon,
            id:item.id,
            modal:item.model
          };
        });

        setMarkersData(markers);
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };

    fetchMarkers();
  }, []);
  useEffect(() => {
    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        const map = new Map(mapRef.current, mapOptions); // Create the map inside the ref
        // Add click listener to the map
        map.addListener("click", (event) => {
          // Get latitude and longitude from the click event
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();

          new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            // icon:homeIcon,
            title: "You are here!",
          });
          setLatAndLng({ lat: lat, lng: lng });
        });
        // Current location button
        const locationButton = document.createElement("button");
        locationButton.textContent = "📍Get Current Location";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
       

        locationButton.addEventListener("click", () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;

                // Center map on user's location
                map.setCenter({ lat: latitude, lng: longitude });
                map.setZoom(14);

                // Add marker at user's location
               
              },
              () => {
                alert("Failed to get your location. Please allow location access.");
              }
            );
          } else {
            alert("Geolocation is not supported by your browser.");
          }
        });
        // Create a marker
        markersData.forEach((markerData) => {
          const marker = new google.maps.Marker({
            position: markerData.position,
            map: map,
            draggable: false,
            id:markerData.id,
            animation: google.maps.Animation.DROP,
            title: markerData.title,
            icon: markerData.icon, // Set the custom icon
          });

          // Optional: Add a click event listener for each marker
          marker.addListener("click", () => {
            let page;
            switch (markerData.model) {
              case "Camp":
                page ="camp" ;
                break;
              case "Hazard":
                page = "hazard";
                break;
              case "Disaster":
                page = "hazard";
                break;
              case "Person":
                page ="camp";
                break;
              default:
                page="home";
            }
            setPage(page);
          });
        });
      })
      .catch((e) => {
        console.error("Error loading Google Maps:", e);
      });
  }, [mapCenter,markersData]);

  return (
    <div className=""
      ref={mapRef}
      style={{ height: "100%", width: "100%" }} // Map container styling
    ></div>
  );
};

export default GoogleMap;
