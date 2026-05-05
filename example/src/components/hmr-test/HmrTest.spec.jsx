import { PageProvider } from '@chayns-components/core';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChaynsProvider } from 'chayns-api';
import React from 'react';
import { expect, test } from 'vitest';
import HmrTest from './HmrTest';

const chaynsApiMock = {
    data: {
        site: {
            siteId: '00000-00000',
            colorMode: 0,
            color: '#FF0000',
        },
        environment: {},
    },
    functions: {
        addWindowMetricsListener: () => {},
        getWindowMetrics: () => ({}),
    },
};

test('should increase count after clicking', async () => {
    const { getByText } = render(
        <ChaynsProvider data={chaynsApiMock.data} functions={chaynsApiMock.functions} isModule>
            <PageProvider>
                <HmrTest />
            </PageProvider>
        </ChaynsProvider>,
    );
    const user = userEvent.setup();

    const node = getByText("I've been clicked 0 times.");

    await user.click(node);

    expect(getByText("I've been clicked 1 times.")).toBeDefined();
});
