import * as React from 'react';
import * as firebase from 'firebase';

export const AppContext = React.createContext<firebase.app.App | undefined>(
  undefined,
);
