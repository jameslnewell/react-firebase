import React from 'react';
import {AppProvider} from '../app';
import {app} from './firebase';

export const wrapper: React.FC = ({children}) => (
  <AppProvider app={app}>{children}</AppProvider>
);
