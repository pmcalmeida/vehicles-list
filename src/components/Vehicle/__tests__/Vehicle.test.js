import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Vehicle from '..';

describe('<Vehicle /> Tests', () => {
    it('Should display vehicle details', () => {
        const media = [
            { url: 'test.jpg', name: 'vehicle' },
            { url: 'test.jpg', name: 'vehicle' },
        ];
        const details = { description: 'test description', price: '50.000£' };

        const { queryByTestId } = render(
            <Vehicle media={media} details={details} tabIndex={0} />
        );

        expect(queryByTestId('vehicle')).not.toBeNull();
        expect(queryByTestId('details')).not.toBeNull();
    });

    it('Should not display details when its not set', () => {
        const media = [
            { url: 'test.jpg', name: 'vehicle' },
            { url: 'test.jpg', name: 'vehicle' },
        ];

        const { queryByTestId } = render(
            <Vehicle media={media} tabIndex={0} />
        );

        expect(queryByTestId('vehicle')).not.toBeNull();
        expect(queryByTestId('details')).toBeNull();
    });

    it('Should open vehicle meta info', () => {
        const media = [
            { url: 'test.jpg', name: 'vehicle' },
            { url: 'test.jpg', name: 'vehicle' },
        ];
        const meta = {
            passengers: 5,
            drivetrain: ['AWD', 'RWD'],
            bodystyles: ['saloon'],
            emissions: {
                template: 'CO2 Emissions $value g/km',
                value: 99,
            },
        };
        const details = {
            description: 'test description',
            price: '50.000£',
            meta,
        };

        const { queryByTestId, getByTestId } = render(
            <Vehicle media={media} details={details} tabIndex={0} />
        );

        fireEvent.click(getByTestId('show_meta'));

        expect(queryByTestId('vehicle_meta')).not.toBeNull();
    });
});
