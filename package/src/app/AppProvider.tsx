import * as React from 'react';
import * as firebase from 'firebase/app';
import {AppContext} from './AppContext';

export interface AppProviderProps {
  app: firebase.app.App;
  children: React.ReactNode;
}

export function AppProvider({app, children}: AppProviderProps): JSX.Element {
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
}
