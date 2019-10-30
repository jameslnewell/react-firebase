# @jameslnewell/react-firebase

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

`firebase.js` - initialise a firebase app

```jsx
import * as firebase from 'firebase/app';

export const app = firebase.initializeApp({
  // firebase app options
});
```

`App.jsx` - inject the firebase app into your root component

```jsx
import * as React from 'react';
import {Provider} from '@jameslnewell/react-firebase/app';
import {app} from './firebase';
import {Navbar} from './Navbar';
import {Albums} from './Albums';

const App = () => (
  <Provider app={app}>
    <>
      <Navbar/>
      <Albums>
    </>
  </Provider>
);

```

`Navbar.jsx` - use of authentication hooks

```jsx
import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  useUser,
  useSignInWithPopup,
  useSignOut,
} from '@jameslnewell/react-firebase/auth';

const Navbar = () => {
  const [, user] = useUser();
  const [, , signIn] = useSignInWithPopup();
  const [, , signOut] = useSignOut();

  const handleSignInOrOut = () => {
    if (user) {
      signOut();
    } else {
      signIn(new firebase.auth.GoogleProvider());
    }
  };

  return (
    <nav>
      {user && <b>{user.displayName}</b>}
      <button onClick={handleSignInOrOut}>
        {user ? 'Sign out' : 'Sign in'}
      </button>
    </nav>
  );
};
```

`Albums.jsx` - use of firestore hooks

```jsx
import * as React from 'react';
import {
  useCollection,
  useCreateDocument,
} from '@jameslnewell/react-firebase/firestore';

const Albums = () => {
  const input = useRef(null);
  const [, albums] = useCollection('albums');
  const [, , createAlbum] = useCreateDocument('albums');
  const [, , deleteAlbum] = useDeleteDocument('albums');
  return (
    <>
      <ul>
        {albums.map(([id, album]) => (
          <div key={id}>
            {album.name}
            <button onClick={() => deleteAlbum(id)}>❌</button>
          </div>
        ))}
      </ul>
      <input ref={input} />
      <button onClick={() => createAlbum({name: input.current.value})}>
        ➕
      </button>
    </>
  );
};
```

## API

### Auth

#### `useUser()`

Retrieve information about the currently authenticated user.

```js
import {useUser} from '@jameslnewell/react-firebase/auth';

const [status, user, error] = useUser();
```

##### Returns:

- `status` - One of `authenticated`, `unauthenticated` or `errored`.
- `user` - A `firebase.User` or `undefined` if there is no authenticated user.
- `error` - An `Error` or `undefined`.

// TODO: useSignInWithPopup
// TODO: useSignOut

### Firestore

#### `useCollection(path: string)`

Retrieve multiple documents within a collection.

```js
import {useCollection} from '@jameslnewell/react-firebase/firestore';

const [status, albums, error] = useCollection('albums');
```

##### Returns:

- `status` - One of `loading`, `loaded` or `errored`.
- `albums` - An array of documents.
- `error` - The error.

#### `useDocument(path: string)`

```js
import {useDocument} from '@jameslnewell/react-firebase/firestore';

const [status, album, error] = useDocument(
  'albums/992486b6-80f2-4141-b8c5-573fc541af9b',
);
```

##### Returns:

- `status` - One of `loading`, `loaded` or `errored`.
- `album` - A document.
- `error` - The error.

// TODO: useCreateDocument
// TODO: useUpdateDocument
// TODO: useDeleteDocument

### Storage

// TODO: useUpload()

```js
const [status, error, upload, {pause, resume, cancel}] = useUpload();
```

// TODO: useURL()
// TODO: useMeta()
