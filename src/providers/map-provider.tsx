import React, { useRef } from "react";
import { MapRef } from "react-map-gl";

export const MapRefProvider: React.FC<MapRefProviderProps> = ({ children }) => {
    // const [mapRef, setMapRef] = useState<null | MapRef>(null);

    const mapRef = useRef<MapRef>(null);

    return <MapRefContext.Provider value={{ mapRef }}>{children}</MapRefContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMapRef = () => React.useContext(MapRefContext);

export type MapRefProviderProps = React.PropsWithChildren;

const MapRefContext = React.createContext<MapRefContextValue>(null!);

export type MapRefContextValue = {
    mapRef: React.RefObject<MapRef> | null;
};
