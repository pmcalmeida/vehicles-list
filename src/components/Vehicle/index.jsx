import React, { useState, useEffect, memo } from 'react';

import './style.scss';
import VehicleDetails from '../VehicleDetails';
import VehicleMeta from '../VehicleMeta';

export default memo(function Vehicle({ name, media, details, tabIndex }) {
    const [showMeta, setShowMeta] = useState(false);
    const [isMetaVisible, setIsMetaVisible] = useState(false);

    const { description, price, meta } = details || {};

    const handleToggleMeta = (e) => {
        // On click, pressing enter or space
        if (
            e.type !== 'keydown' ||
            (e.type === 'keydown' && (e.keyCode === 32 || e.keyCode === 13))
        ) {
            setShowMeta((visible) => setShowMeta(!visible));
        }
    };

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
                <picture>
                    <source src={media[0].url} media="(min-width: 801px)" />
                    <img
                        className="Vehicle__img"
                        src={media[1].url}
                        title={media[1].name}
                        alt={description}
                    />
                </picture>
                {details ? (
                    <VehicleDetails
                        name={name}
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
                    description={description}
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
