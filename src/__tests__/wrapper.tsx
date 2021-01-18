import React from 'react';
import {Provider} from '../app';
import {app} from './firebase.ts';

export const wrapper: React.FC = ({children}) => (
  <Provider app={app as any}>{children}</Provider>
);
