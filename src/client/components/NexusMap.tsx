import { Position } from 'geojson';
import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ChangeView from './ChangeView';

interface NexusMapProps {
    originPositions: Position[];
    nexusPosition: Position;
    nexusAddress: string;
}

const NexusMap = ({
    nexusPosition,
    nexusAddress,
    originPositions,
}: NexusMapProps) => {
    // Create new arrays with [Lat, Lng] order for Leaflet.js
    const nexusLatLngTuple: LatLngTuple = [nexusPosition[1], nexusPosition[0]];
    const originLatLngTuples: LatLngTuple[] = [
        [originPositions[0][1], originPositions[0][0]],
        [originPositions[1][1], originPositions[1][0]],
        [originPositions[2][1], originPositions[2][0]],
    ];

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
            <Marker position={originLatLngTuples[0]}>
                <Popup>First Coordinate</Popup>
            </Marker>
            <Marker position={originLatLngTuples[1]}>
                <Popup>Second Coordinate</Popup>
            </Marker>
            <Marker position={originLatLngTuples[2]}>
                <Popup>Third Coordinate</Popup>
            </Marker>
            <ChangeView position={nexusLatLngTuple} zoom={13} />
        </MapContainer>
    );
};

export default NexusMap;
