import * as React from 'react';
import * as firebase from 'firebase/app';

export const AppContext = React.createContext<firebase.app.App | undefined>(
  undefined,
);
