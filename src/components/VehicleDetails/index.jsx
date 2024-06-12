import React, { memo } from 'react';
import './style.scss';

export default memo(function VehicleDetails({
    name,
    price,
    description,
    showMeta,
    handleToggleMeta,
    tabIndex,
}) {
    return (
        <div className="VehicleDetails" data-testid="details">
            <h2>{name}</h2>
            <p>From {price}</p>
            <div className="VehicleDetails__description">
                <p>{description}</p>
            </div>
            <div
                data-testid="show_meta"
                className="VehicleDetails__showMore"
                onClick={handleToggleMeta}
                onKeyDown={handleToggleMeta}
                tabIndex={tabIndex + 1}
                role="button"
                aria-expanded={showMeta}
                aria-pressed={showMeta}
            >
                {showMeta ? 'Hide info' : 'Read more...'}
            </div>
        </div>
    );
});
