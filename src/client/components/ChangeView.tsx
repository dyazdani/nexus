import { LatLngTuple } from 'leaflet';
import { useMap } from 'react-leaflet';

interface ChangeViewProps {
    position: LatLngTuple;
    zoom: number;
}

// This component uses hook to modify Map instance when nexus coordinates are updated.
const ChangeView = ({ position, zoom }: ChangeViewProps) => {
    const map = useMap();

    map.setView(position, zoom);
    return null;
};

export default ChangeView;
