import type { FC } from "react";
import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const tileUrlPattern = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

type DynamicMapProps = {
  center: [number, number];
  markerPosition: [number, number];
};

type ReactLeafletExports = Pick<
  typeof import("react-leaflet"),
  "MapContainer" | "Marker" | "TileLayer" | "ZoomControl"
>;

const DynamicMap: FC<DynamicMapProps> = ({ center, markerPosition }) => {
  const [leafletComponents, setLeafletComponents] = useState<ReactLeafletExports | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      const [leaflet, reactLeaflet] = await Promise.all([
        import("leaflet"),
        import("react-leaflet"),
      ]);

      const { MapContainer, Marker, TileLayer, ZoomControl } = reactLeaflet;

      // @ts-expect-error Исправление иконок маркеров
      delete leaflet.Icon.Default.prototype._getIconUrl;

      leaflet.Icon.Default.mergeOptions({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        popupAnchor: [1, -34],

        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconRetinaUrl: markerIcon2x,
      });

      if (!isMounted) {
        return;
      }

      setLeafletComponents({
        MapContainer,
        Marker,
        TileLayer,
        ZoomControl,
      });
    };

    if (typeof window !== "undefined") {
      void loadLeaflet();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (!leafletComponents) {
    return null;
  }

  const { MapContainer, Marker, TileLayer, ZoomControl } = leafletComponents;

  return (
    <MapContainer
      zoom={16}
      center={center}
      zoomControl={false}
      scrollWheelZoom={true}
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url={tileUrlPattern} maxZoom={19} />
      <Marker position={markerPosition} />
      <ZoomControl position="topright" />
    </MapContainer>
  );
};

DynamicMap.displayName = "DynamicMap";

export { DynamicMap };
