import React, { useState, useEffect } from 'react';
import useData from '../../hooks/useData';
import useFetchDetails from '../../hooks/useFetchDetails';
import Vehicle from '../Vehicle';
import Error from '../Error';
import Loading from '../Loading';

import './style.scss';

const List = function ({ vehicles, isLoading }) {
    if (isLoading) {
        return <Loading testid="details" />;
    }

    return (
        <div className="VehicleList">
            {Array.isArray(vehicles) &&
                vehicles.length &&
                vehicles.map((data, i) => (
                    <Vehicle key={data.id} {...data} tabIndex={i} />
                ))}
        </div>
    );
};

export default function VehicleList() {
    const [loading, error, vehicles] = useData();
    const [detailsLoading, vehiclesDetails] = useFetchDetails(vehicles);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error>{error}</Error>;
    }

    return (
        <main data-testid="results">
            <List vehicles={vehiclesDetails} isLoading={detailsLoading} />
        </main>
    );
}