import React, { memo } from 'react';
import './style.scss';

export default memo(function ({ meta, showMeta, isMetaVisible }) {
    return (
        <div
            data-testid="vehicle_meta"
            className="VehicleMeta"
            style={{
                opacity: showMeta ? '1' : '0',
                display: isMetaVisible ? 'block' : 'none',
            }}
        >
            <p>
                {meta.bodystyles && meta.bodystyles.length
                    ? `Body styles: ${meta.bodystyles.join(', ')}`
                    : ''}
            </p>
            <p>
                {meta.drivetrain && meta.drivetrain.length
                    ? `Drivetrain: ${meta.drivetrain.join(', ')}`
                    : ''}
            </p>
            <p>{meta.passengers ? `Passengers: ${meta.passengers}` : ''}</p>
            <p>
                {meta.emissions
                    ? `${meta.emissions.template}: ${meta.emissions.value}`
                    : ''}
            </p>
        </div>
    );
});
