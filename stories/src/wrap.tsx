import * as React from 'react';
import {Provider} from '../../package/src/app'
import {app} from './utils/app';

export const wrap = (Component: React.ComponentType) => () => (
  <Provider app={app}>
    <Component/>
  </Provider>
);


