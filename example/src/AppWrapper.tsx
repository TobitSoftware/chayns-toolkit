import React, { ComponentProps } from 'react';
import App from './App';
import { ChaynsProvider, withCompatMode } from 'chayns-api';
import { PageProvider } from '@chayns-components/core';

type Props = ComponentProps<typeof ChaynsProvider> | {};

export const AppWrapper: React.FC<Props> = (props) => {
    return (
        <ChaynsProvider {...props}>
            <PageProvider>
                <App />
            </PageProvider>
        </ChaynsProvider>
    );
};

export default withCompatMode(AppWrapper);
