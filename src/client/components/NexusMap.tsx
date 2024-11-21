import { Position } from 'geojson';
import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface NexusMapProps {
    nexusPosition: Position;
    nexusAddress: string;
}

const NexusMap = ({ nexusPosition, nexusAddress }: NexusMapProps) => {
    // Create new array with Position returned by turf.js with type that Leaflet.js accepts
    const nexusLatLngTuple: LatLngTuple = [nexusPosition[0], nexusPosition[1]];

    return (
        <MapContainer
            center={nexusLatLngTuple}
            zoom={13}
            scrollWheelZoom={false}
            style={{
                height: '300px',
                width: '300px',
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={nexusLatLngTuple}>
                <Popup>{nexusAddress}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default NexusMap;
