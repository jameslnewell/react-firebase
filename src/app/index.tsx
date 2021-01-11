import React from 'react';
import firebase from 'firebase';

const AppContext = React.createContext<firebase.app.App | undefined>(undefined);

export interface AppProviderProps {
  app: firebase.app.App;
  children: React.ReactNode;
}

export const AppProvider = ({app, children}: AppProviderProps): JSX.Element => (
  <AppContext.Provider value={app}>{children}</AppContext.Provider>
);

export const useApp = (): firebase.app.App => {
  const app = React.useContext(AppContext);
  if (!app) {
    throw new Error('Please provide a firebase app: <AppProvider app={app}/>.');
  }
  return app;
};
