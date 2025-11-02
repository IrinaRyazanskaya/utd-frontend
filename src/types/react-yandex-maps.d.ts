declare module "react-yandex-maps" {
  import type { ComponentType, ReactNode } from "react";

  export interface MapProps {
    defaultState?: Record<string, unknown>;
    state?: Record<string, unknown>;
    instanceRef?: (instance: unknown) => void;
    children?: ReactNode;
    className?: string;
    width?: number | string;
    height?: number | string;
    [key: string]: unknown;
  }

  export interface PlacemarkProps {
    geometry?: unknown;
    properties?: Record<string, unknown>;
    options?: Record<string, unknown>;
    className?: string;
    [key: string]: unknown;
  }

  export const YMaps: ComponentType<{ children?: ReactNode }>;
  export const Map: ComponentType<MapProps>;
  export const Placemark: ComponentType<PlacemarkProps>;
  export const GeolocationControl: ComponentType<Record<string, unknown>>;
  export const ZoomControl: ComponentType<Record<string, unknown>>;
}
