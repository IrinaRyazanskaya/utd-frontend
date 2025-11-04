type LeafletModule = typeof import("leaflet");

const fixLeafletIcons = async (): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  const { default: L } = (await import("leaflet")) as { default: LeafletModule };
  const { default: markerIcon } = await import("leaflet/dist/images/marker-icon.png");
  const { default: markerIcon2x } = await import("leaflet/dist/images/marker-icon-2x.png");
  const { default: markerShadow } = await import("leaflet/dist/images/marker-shadow.png");

  // @ts-expect-error Исправление иконок маркеров
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    popupAnchor: [1, -34],

    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconRetinaUrl: markerIcon2x,
  });
};

export { fixLeafletIcons };
