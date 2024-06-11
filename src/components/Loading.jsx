import React from 'react';

export default function ({ testid = '' }) {
    return <div data-testid={`loading${testid}`}>Loading</div>;
}
