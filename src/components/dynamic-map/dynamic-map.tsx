import type { FC } from "react";
import { useEffect, useRef } from "react";
import type { Map, Marker } from "leaflet";

import "./dynamic-map.css";
import iconUrl from "./images/marker-icon.png";
import iconRetinaUrl from "./images/marker-icon-2x.png";
import shadowUrl from "./images/marker-shadow.png";

const MAP_ZOOM = 15;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

type DynamicMapProps = {
  center: [number, number];
  markerPosition: [number, number];
};

const DynamicMap: FC<DynamicMapProps> = ({ center, markerPosition }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    let map: Map | null = null;
    let marker: Marker | null = null;

    (async () => {
      const [leaflet] = await Promise.all([import("leaflet"), import("leaflet/dist/leaflet.css")]);

      if (!mapContainerRef.current || cancelled) {
        return;
      }

      // @ts-expect-error Исправление иконок маркеров
      delete leaflet.Icon.Default.prototype._getIconUrl;

      leaflet.Icon.Default.mergeOptions({
        iconUrl,
        shadowUrl,
        iconRetinaUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        popupAnchor: [1, -34],
      });

      map = leaflet.map(mapContainerRef.current).setView(center, MAP_ZOOM);
      map.attributionControl.remove();
      leaflet.tileLayer(TILE_URL).addTo(map);
      marker = leaflet.marker(markerPosition).addTo(map);
    })();

    return () => {
      cancelled = true;

      if (marker) {
        marker.remove();
      }

      if (map) {
        map.remove();
      }
    };
  }, [center, markerPosition]);

  return <div ref={mapContainerRef} className="dynamic_map" />;
};

DynamicMap.displayName = "DynamicMap";

export { DynamicMap };
