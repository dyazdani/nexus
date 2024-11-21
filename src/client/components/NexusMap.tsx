import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const NexusMap = () => {
    return (
        <MapContainer
            // TODO: Change this test center to be the result from NexusForm
            center={[51.505, -0.09]}
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
            {/* TODO: Change this test position to be the result from NexusForm */}
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    This is a sample popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default NexusMap;
