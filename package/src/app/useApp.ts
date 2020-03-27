import {useContext} from 'react';
import * as firebase from 'firebase';
import {AppContext} from './AppContext';

export const useApp = (): firebase.app.App => {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error('Please provide a firebase app: <AppProvider app={app}/>.');
  }
  return app;
};
