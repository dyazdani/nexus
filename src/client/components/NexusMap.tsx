import { Position } from 'geojson';
import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ChangeView from './ChangeView';

interface NexusMapProps {
    nexusPosition: Position;
    nexusAddress: string;
}

const NexusMap = ({ nexusPosition, nexusAddress }: NexusMapProps) => {
    // Create new array with Position returned by turf.js with type that Leaflet.js accepts
    const nexusLatLngTuple: LatLngTuple = [nexusPosition[1], nexusPosition[0]];

    return (
        <MapContainer
            center={nexusLatLngTuple}
            zoom={13}
            scrollWheelZoom={false}
            style={{
                height: '400px',
                width: '95dvw',
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={nexusLatLngTuple}>
                <Popup>{nexusAddress}</Popup>
            </Marker>
            <ChangeView position={nexusLatLngTuple} zoom={13} />
        </MapContainer>
    );
};

export default NexusMap;
