import React, { useState, useEffect, memo } from 'react';

import './style.scss';
import VehicleDetails from '../VehicleDetails';
import VehicleMeta from '../VehicleMeta';

export default memo(function Vehicle({ media, details, tabIndex }) {
    const [showMeta, setShowMeta] = useState(false);
    const [isMetaVisible, setIsMetaVisible] = useState(false);

    const { description, price, meta } = details || {};

    const handleToggleMeta = () =>
        setShowMeta((visible) => setShowMeta(!visible));

    useEffect(() => {
        if (!showMeta) {
            // Wait for fade-out animation to set display none
            setTimeout(() => setIsMetaVisible(false), 200);
        } else {
            setIsMetaVisible(true);
        }
    }, [showMeta]);

    return (
        <div className="VehicleContainer">
            <section
                className="Vehicle"
                tabIndex={tabIndex + 1}
                data-testid="vehicle"
                style={{ animationDelay: `${0.1 + tabIndex * 0.1}s` }}
            >
                <img
                    className="Vehicle__img_desktop"
                    src={media[0].url}
                    alt={description}
                    title={media[0].name}
                />
                <img
                    className="Vehicle__img_mobile"
                    src={media[1].url}
                    alt={description}
                    title={media[1].name}
                />
                {details ? (
                    <VehicleDetails
                        name={media[0].name}
                        price={price}
                        description={description}
                        showMeta={showMeta}
                        handleToggleMeta={handleToggleMeta}
                        tabIndex={tabIndex}
                    />
                ) : (
                    ''
                )}
            </section>
            {isMetaVisible ? (
                <VehicleMeta
                    meta={meta}
                    showMeta={showMeta}
                    isMetaVisible={isMetaVisible}
                />
            ) : (
                ''
            )}
        </div>
    );
});
