import { points, center } from '@turf/turf';
import opencage from 'opencage-api-client';
import { useState } from 'react';

const features = points([
    [-86.148003, 39.791],
    [-82.98333, 39.983334],
    [-84.512016, 39.103119],
]);

const nexus = center(features);

const Nexus = () => {
    const [nexusAddress, setNexusAddress] = useState<null | string>(null);

    const handleClick = async () => {
        try {
            const response = await opencage.geocode({
                key: import.meta.env.VITE_OPENCAGE_API_KEY,
                q: `${nexus.geometry.coordinates[1]}, ${nexus.geometry.coordinates[0]}`,
                language: 'en',
            });

            if (response.status.code === 200 && response.results.length > 0) {
                const place = response.results[0];
                setNexusAddress(place.formatted);
            } else {
                // TODO: Make some user-facing message instead of console logs
                console.log('status', response.status.message);
                console.log('total_results', response.total_results);
            }
        } catch (error: any) {
            // TODO: find a way to type this error
            // TODO: Handle this error with something in UI instead of just console logs
            console.log('error', error.message);
            if (error.status?.code === 402) {
                console.log('hit free trial daily limit');
                console.log(
                    'become a customer: https://opencagedata.com/pricing'
                );
            }
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                }}
            >
                Get Nexus
            </button>
            {nexusAddress ? <p>{nexusAddress}</p> : undefined}
        </>
    );
};

export default Nexus;
