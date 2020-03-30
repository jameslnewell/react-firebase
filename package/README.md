# @jameslnewell/react-firebase

![npm (scoped)](https://img.shields.io/npm/v/@jameslnewell/react-firebase.svg)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/@jameslnewell/react-firebase)](https://bundlephobia.com/result?p=@jameslnewell/react-firebase)
[![Actions Status](https://github.com/jameslnewell/react-firebase/workflows/main/badge.svg)](https://github.com/jameslnewell/react-firebase/actions)

🎣 React hooks for working with firebase.

## Installation

NPM:

```bash
npm install @jameslnewell/react-firebase
```

Yarn:

```bash
yarn add @jameslnewell/react-firebase
```

## Usage

`index.js`

```jsx
import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppProvider} from '@jameslnewell/react-firebase';
import {App} from './App';

const app = firebase.initializeApp({
  /* your firebase config */
});

ReactDOM.render(
  <AppProvider app={app}>
    <App />
  </AppProvider>,
  document.getElementById('app'),
);
```

`Navbar.js`

```jsx
import React from 'react';
import firebase from 'firebase';
import {useUser, useSignInWithPopup useSignOut} from '@jameslnewell/react-firebase/auth';

export const Navbar = () => {
  const [user] = useUser();
  const [signIn] = useSignInWithPopup();
  const [signOut] = useSignOut();

  const handleSignInOrOut = () => {
    if (user) {
      signOut();
    } else {
      signIn(new firebase.auth.GoogleAuthProvider());
    }
  };

  return (
    <nav>
      <button onClick={handleSignInOrOut}>{user ? 'Sign out' : Sign in}</button>
    </nav>
  );
}
```

`UserProfile.js`

```js
import React from 'react';
import {useDocument} from '@jameslnewell/react-firebase/firestore';

export const UserProfile = ({userId}) => {
  const [user, {status}] = useDocument(`users/${userId}`);
  switch (status) {
    case 'receiving':
      return 'Loading...';
    case 'errored':
      return 'Unable to fetch profile for user';
    default:
      return (
        <>
          {user && user.id}
          {user && user.get('name')}
        </>
      );
  }
};
```

## API

### app

#### &lt;AppProvider&gt;

#### useApp()

### auth

#### useUser()

#### useSignInWithPopup()

#### useSignOut()

### firestore

#### useCollection()

#### useDocument()

#### useCreateDocument()

#### useUpdateDocument()

#### useDeleteDocument()

#### &lt;Collection&gt;

#### &lt;Document&gt;

### storage
