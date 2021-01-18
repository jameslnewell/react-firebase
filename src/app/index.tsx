import React from 'react';
import firebase from 'firebase';

const Context = React.createContext<firebase.app.App | undefined>(undefined);

export interface ProviderProps {
  app: firebase.app.App;
  children: React.ReactNode;
}

export const Provider = ({app, children}: ProviderProps): JSX.Element => (
  <Context.Provider value={app}>{children}</Context.Provider>
);

export const useApp = (): firebase.app.App => {
  const app = React.useContext(Context);
  if (!app) {
    throw new Error('Please provide a firebase app: <Provider app={app}/>.');
  }
  return app;
};
