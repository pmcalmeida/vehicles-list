import React from 'react';

export default function Loading({ testid = '' }) {
    return <div data-testid={`loading${testid}`}>Loading</div>;
}
