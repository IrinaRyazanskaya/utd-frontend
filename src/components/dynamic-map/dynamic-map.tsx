import { useEffect } from "react";
import type { FC, RefObject } from "react";
import type { Map, Marker } from "leaflet";

import iconUrl from "./images/marker-icon.png";
import iconRetinaUrl from "./images/marker-icon-2x.png";
import shadowUrl from "./images/marker-shadow.png";

const MAP_ZOOM = 15;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

type DynamicMapProps = {
  center: [number, number];
  markerPosition: [number, number];
  mapContainerRef: RefObject<HTMLDivElement | null>;
  visibleClassName: string;
};

const DynamicMap: FC<DynamicMapProps> = ({
  center,
  markerPosition,
  mapContainerRef,
  visibleClassName,
}) => {
  useEffect(() => {
    let cancelled = false;

    let map: Map | null = null;
    let marker: Marker | null = null;
    const container = mapContainerRef.current;

    (async () => {
      const [leaflet] = await Promise.all([import("leaflet"), import("leaflet/dist/leaflet.css")]);

      if (!container || cancelled) {
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

      map = leaflet.map(container).setView(center, MAP_ZOOM);
      map.attributionControl.remove();

      const layer = leaflet.tileLayer(TILE_URL);
      layer.addTo(map);
      marker = leaflet.marker(markerPosition).addTo(map);

      layer.on("load", () => {
        if (!cancelled) {
          container.classList.add(visibleClassName);
        }
      });
    })();

    return () => {
      cancelled = true;

      if (container) {
        container.classList.remove(visibleClassName);
      }

      if (marker) {
        marker.remove();
      }

      if (map) {
        map.remove();
      }
    };
  }, [center, markerPosition, visibleClassName, mapContainerRef]);

  return null;
};

DynamicMap.displayName = "DynamicMap";

export { DynamicMap };
