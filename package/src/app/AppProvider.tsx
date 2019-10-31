import * as React from 'react';
import * as firebase from 'firebase/app';
import {Context} from './Context';

export interface AppProviderProps {
  app: firebase.app.App;
  children: React.ReactNode;
}

export function AppProvider({app, children}: AppProviderProps): JSX.Element {
  return <Context.Provider value={app}>{children}</Context.Provider>;
}
