import * as React from 'react';
import * as firebase from 'firebase/app';
import {Context} from './Context';

export interface ProviderProps {
  app: firebase.app.App;
  children: React.ReactNode;
}

export function Provider({app, children}: ProviderProps): JSX.Element {
  return <Context.Provider value={app}>{children}</Context.Provider>;
}
