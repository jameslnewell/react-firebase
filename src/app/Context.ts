import * as React from 'react';
import * as firebase from 'firebase/app';

export const Context = React.createContext<firebase.app.App | undefined>(
  undefined,
);
