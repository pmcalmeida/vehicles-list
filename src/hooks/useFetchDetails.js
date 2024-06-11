import { useState, useEffect, useCallback } from 'react';
import getData from '../api';

const detailsCache = new Map();

export default function useFetchDetails(vehicles) {
    const [vehiclesDetails, setVehiclesDetails] = useState([]);
    const [detailsLoading, setDetailsLoading] = useState(true);

    const fetchVehicleDetails = useCallback(
        async function fetchDetails(vehicle) {
            const vehicleDetails = { ...vehicle };

            // Return details from cache if present
            if (detailsCache.has('id')) {
                const details = detailsCache.get('id');
                vehicleDetails.details = details;
            }

            await getData(vehicle.apiUrl)
                .then((details) => {
                    vehicleDetails.details = details;
                    detailsCache.set(vehicle.id, vehicleDetails);
                })
                .catch((err) =>
                    // eslint-disable-next-line no-console
                    console.error(`${err}: vehicle - ${vehicle.id}`)
                );

            // Ignore vehicles with not details data or price
            if (vehicleDetails.details && vehicleDetails.details.price) {
                return Promise.resolve(vehicleDetails);
            }
            return false;
        },
        [vehicles]
    );

    useEffect(() => {
        if (Array.isArray(vehicles) && vehicles.length) {
            // Create an array of primises to
            // fetch all valid vehicle details from the vehicle.apiUrl or from cache
            const fetchAllDetails = vehicles.map(fetchVehicleDetails);

            // After all promises have been resolved, set the vehicleDetails list
            Promise.all(fetchAllDetails)
                .then((details) => {
                    setVehiclesDetails(details.filter(Boolean));
                })
                .finally(() => setDetailsLoading(false));
        }
    }, [vehicles, fetchVehicleDetails]);

    return [detailsLoading, vehiclesDetails];
}
