import * as React from 'react';
import {AppProvider} from '@jameslnewell/react-firebase/app';
import {app} from './app';

export const wrapper = ({children}) => (
  <AppProvider app={app}>{children}</AppProvider>
);
