# @jameslnewell/react-firebase

> ⚠️ Warning: Hooks aren't stable yet so be careful using this library in production.

React hooks for working with firebase.

## Installation

```
yarn add @jameslnewell/react-firebase
```

## Usage

`Navbar.tsx`
```jsx
import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useAuth} from '@jameslnewell/react-firebase/auth';

const Navbar = () => {
  const [user, {signInWithPopup, signOut}] = useAuth();

  function handleSignInOrOut() {
    if (user) {
      signOut();
    } else {
      signInWithPopup(new firebase.auth.GoogleProvider());
    }
  }

  return (
    <nav>
      {user && <b>{user.displayName}</b>}
      <button onClick={handleSignInOrOut}>{user ? 'Sign out' : 'Sign in'}</button>
    </nav>
  )
}
```

`SongCollection.tsx`
```jsx
import * as React from 'react';
import {useCollection} from '@jameslnewell/react-firebase/firestore';

const SongCollection = () => {
  const input = useRef(null);
  const [songs, {add}] = useCollection('songs');
  return (
    <>
      <ul>
        {songs.map(([id, song]) => (
          <div key={id}>
            {song.name}
          </div>
        ))}
      </ul>
      <input ref={input}/>
      <button onClick={() => add(input.current.value)}>Add song</button>
    </>
  );
}
```

`App.tsx`
```jsx
import * as React from 'react';
import * as firebase from 'firebase/app';
import {Provider} from '@jameslnewell/react-firebase/app';
import {Navbar} from './Navbar';
import {SongCollection} from './SongCollection';

const app = firebase.initializeApp({
  // app options
});

const App = () => (
  <Provider app={app}>
    <>
      <Navbar/>
      <SongCollection>
    </>
  </Provider>
);
```

## API

### auth

#### `useAuth()`

```
const [user, meta] = useAuth();
```

Get information about the currently authenticated user.

##### Returns
- `user` - A `firebase.User` or `undefined` if there  is no authenticated user.
- `meta`
  - `status` - One of `loading`, `loaded` or `errored`.
  - `error` - The `Error`.
  - `signInWithPopup` - A `function` that prompts the user to sign in.
  - `signOut` - A `function` that signs the user out.

### storage

#### `useUrl(path: string)`

```
const [url, meta] = useUrl('user/xyz/profile.jpg');
```

Retrieve the url for a file.

##### Returns
- `url` - The url or `undefined` if the document url hasn't hasn't been returned yet.
- `meta`
  - `status` - One of `loading`, `loaded` or `errored`.
  - `error` - The `Error`.

#### `useMetadata(path: string)`

```
const [metadata, meta] = useMetadata('user/xyz/profile.jpg');
```

Retrieve the metadata for a file.

##### Returns
- `metadata` - The metadata or `undefined` if the document metadata hasn't hasn't been returned yet.
- `meta`
  - `status` - One of `loading`, `loaded` or `errored`.
  - `error` - The `Error`.

#### `useUpload(path: string)`

```
const {upload, canPause} = useUpload('user/xyz/profile.jpg');
```

Upload a file.

##### Returns
- `metadata` - The metadata or `undefined` if the document metadata hasn't hasn't been returned yet.
- `meta`
  - `status` - One of `loading`, `loaded` or `errored`.
  - `error` - The `Error`.

### firestore

#### `useCollection(path: string)`

```
const [songs, meta] = useCollection('songs');
```

Retrieve multiple documents within a collection.

##### Returns
- `songs` - An array of documents or `undefined` if the query hasn't returned any data yet.
- `meta`
  - `status` - One of `loading`, `loaded` or `errored`.
  - `error` - The `Error`.
  - `add` - A `function` that adds a new document to the collection.

#### `useDocument(path: string)`

```
const [song, meta] = useDocument('songs/abc-def');
```

Retrieve a single document within a collection.

##### Returns
- `song` - A document or `undefined` if the document hasn't hasn't been returned yet.
- `meta`
  - `status` - One of `loading`, `loaded` or `errored`.
  - `error` - The `Error`.
  - `set` - A `function` that overwrites all of the values in a document.
  - `updates` - A `function` that updates some of the values within a document.
  - `delete` - A `function` that deletes the document.
