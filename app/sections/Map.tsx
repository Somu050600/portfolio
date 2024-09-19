import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

// Initialize the Mapbox component with your access token
const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "", // Replace with your Mapbox access token
});

const MapComponent = () => {
  const { theme } = useTheme();
  const [mapStyle, setMapStyle] = useState(
    `mapbox://styles/mapbox/${theme === "light" ? "streets" : "dark"}-v10`
  );

  useEffect(() => {
    setMapStyle(
      `mapbox://styles/mapbox/${theme === "light" ? "streets" : "dark"}-v10`
    );
  }, [theme]);

  const bangaloreRegion = [
    [
      [77.5708, 12.9333],
      [77.589, 12.9333],
      [77.589, 12.952],
      [77.5708, 12.952],
      [77.5708, 12.9333],
    ],
  ];

  return (
    <Map
      key={theme} // This forces a re-render when theme changes
      style={mapStyle} // Set the current map style
      containerStyle={{
        height: "400px",
        width: "100%",
        borderRadius: "10px",
      }}
      center={[77.5946, 12.9716]} // Coordinates of Bangalore
      zoom={[12]} // Zoom level
    >
      {/* Optional: Add a marker or a layer to indicate Bangalore */}
      <Layer
        type="fill"
        id="highlight"
        paint={{
          "fill-color": "#FF6347", // Highlight color
          "fill-opacity": 0.5, // Opacity of the highlight
        }}
      >
        <Feature coordinates={bangaloreRegion} />
      </Layer>
    </Map>
  );
};

export default MapComponent;
