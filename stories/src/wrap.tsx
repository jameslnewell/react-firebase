import * as React from 'react';
import {AppProvider} from '../../package/src/app';
import {app} from './utils/app';

export const wrap = (Component: React.ComponentType) => () => (
  <AppProvider app={app}>
    <Component />
  </AppProvider>
);
