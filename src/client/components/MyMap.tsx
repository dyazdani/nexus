import { Map } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { useState } from 'react';

const maptilerProvider = maptiler('YzGtcglc6aQH08e5H6Oy', 'streets');

export function MyMap() {
    const [center, setCenter] = useState([41.25716, -95.995102]);
    const [zoom, setZoom] = useState(1);

    return (
        <Map
            provider={maptilerProvider}
            dprs={[1, 2]} // this provider supports HiDPI tiles
            height={500}
            onBoundsChanged={({ center, zoom }) => {
                setCenter(center);
                setZoom(zoom);
            }}
        />
    );
}
