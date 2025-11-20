import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";

// Helper component to control map and fly to location
const FlyToLocation = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 10, { duration: 2 });
    }
  }, [coords, map]);

  return null;
};

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenter = useLoaderData();
  const [targetCoord, setTargetCoord] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim().toLowerCase();

    if (!location) return;
    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location)
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      setTargetCoord(coord);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="my-16">
      <Container>
        <SectionTitle title="We are available in 64 districts" />
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-4">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              className="grow"
              placeholder="Search district"
            />
          </label>
        </form>
        {/* Map Section */}
        <div className="border h-[1000px] overflow-hidden rounded-xl">
          <MapContainer
            className="h-[1000px] w-full"
            center={position}
            zoom={8}
            scrollWheelZoom={false}
          >
            {/* Fly effect */}
            <FlyToLocation coords={targetCoord} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* All service center markers */}
            {serviceCenter.map((center, idx) => (
              <Marker key={idx} position={[center.latitude, center.longitude]}>
                <Popup>
                  <strong>{center.district}</strong> <br />
                  Service Area: {center.covered_area.join(", ")}.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Container>
    </div>
  );
};

export default Coverage;
