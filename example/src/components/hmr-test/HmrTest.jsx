import { Button } from '@chayns-components/core';
import React, { useReducer } from 'react';

export default function HmrTest() {
    const [counter, increaseCounter] = useReducer((s) => s + 1, 0);

    return (
        <div>
            <h2>Hot Module Replacement</h2>
            <Button onClick={increaseCounter}>I&apos;ve been clicked {counter} times.</Button>
        </div>
    );
}
