import { useState, useEffect } from 'react';
import getData from '../api';

export default function useData() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = 'api/vehicles.json';

    useEffect(() => {
        getData(apiUrl)
            .then((response) => setVehicles(response))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return [loading, error, vehicles];
}
