import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppWrapper } from './AppWrapper';

const root = createRoot(document.querySelector('#app') as Element);
root.render(<AppWrapper />);
