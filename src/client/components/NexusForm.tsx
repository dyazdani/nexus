import { points, center } from '@turf/turf';
import { Position } from 'geojson';
import opencage from 'opencage-api-client';
import { useState } from 'react';

const Nexus = () => {
    const [nexusAddress, setNexusAddress] = useState<null | string>(null);
    const [coordinates, setCoordinates] = useState<string[][]>([
        ['', ''],
        ['', ''],
        ['', ''],
    ]);

    const handleSubmit = async () => {
        // Convert strings from number input tags to numbers for turf.js points function
        const coordinatesAsPositions: Position[] = coordinates.map((el) => [
            parseFloat(el[0]),
            parseFloat(el[1]),
        ]);

        const nexus = center(points(coordinatesAsPositions));

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
        <div>
            <h1>Set Your Coordinates</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <fieldset>
                    <legend>First Coordinates</legend>
                    <label htmlFor="latitude-one">Latitude: </label>
                    <input
                        type="number"
                        id="latitude-one"
                        name="latitude-one"
                        step="any"
                        min="-90"
                        max="90"
                        required
                        value={coordinates[0][1] ?? 0}
                        onChange={(e) => {
                            e.preventDefault();
                            const newCoordinates: string[][] = [...coordinates];
                            newCoordinates[0][1] = e.target.value;
                            setCoordinates(newCoordinates);
                        }}
                    />
                    <label htmlFor="longitude-one">Longitude: </label>
                    <input
                        type="number"
                        id="longitude-one"
                        name="longitude-one"
                        step="any"
                        min="-180"
                        max="180"
                        required
                        value={coordinates[0][0] ?? 0}
                        onChange={(e) => {
                            e.preventDefault();
                            const newCoordinates: string[][] = [...coordinates];
                            newCoordinates[0][0] = e.target.value;
                            setCoordinates(newCoordinates);
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Second Coordinates</legend>
                    <label htmlFor="latitude-two">Latitude: </label>
                    <input
                        type="number"
                        id="latitude-two"
                        name="latitude-two"
                        step="any"
                        min="-90"
                        max="90"
                        required
                        value={coordinates[1][1] ?? 0}
                        onChange={(e) => {
                            e.preventDefault();
                            const newCoordinates: string[][] = [...coordinates];
                            newCoordinates[1][1] = e.target.value;
                            setCoordinates(newCoordinates);
                        }}
                    />
                    <label htmlFor="longitude-two">Longitude: </label>
                    <input
                        type="number"
                        id="longitude-two"
                        name="longitude-two"
                        step="any"
                        min="-180"
                        max="180"
                        required
                        value={coordinates[1][0] ?? 0}
                        onChange={(e) => {
                            e.preventDefault();
                            const newCoordinates: string[][] = [...coordinates];
                            newCoordinates[1][0] = e.target.value;
                            setCoordinates(newCoordinates);
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Third Coordinates</legend>
                    <label htmlFor="latitude-three">Latitude: </label>
                    <input
                        type="number"
                        id="latitude-three"
                        name="latitude-three"
                        step="any"
                        min="-90"
                        max="90"
                        required
                        value={coordinates[2][1] ?? 0}
                        onChange={(e) => {
                            e.preventDefault();
                            const newCoordinates: string[][] = [...coordinates];
                            newCoordinates[2][1] = e.target.value;
                            setCoordinates(newCoordinates);
                        }}
                    />
                    <label htmlFor="longitude-three">Longitude: </label>
                    <input
                        type="number"
                        id="longitude-three"
                        name="longitude-three"
                        step="any"
                        min="-180"
                        max="180"
                        required
                        value={coordinates[2][0] ?? 0}
                        onChange={(e) => {
                            e.preventDefault();
                            const newCoordinates: string[][] = [...coordinates];
                            newCoordinates[2][0] = e.target.value;
                            setCoordinates(newCoordinates);
                        }}
                    />
                </fieldset>
                <button>Get Nexus</button>
            </form>

            {nexusAddress ? <p>{nexusAddress}</p> : undefined}
        </div>
    );
};

export default Nexus;
