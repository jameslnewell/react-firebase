import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useAuth} from '../../src/auth';

export function UseAuthExample() {
  const {error, user, signInWithPopup, signOut} = useAuth();

  function handleSignInOrOut() {
    if (user) {
      signOut();
    } else {
      signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  return (
    <>
      {error && String(error)}
      <code>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </code>
      <button onClick={handleSignInOrOut}>{user ? 'sign out' : 'sign in'}</button>
    </>
  );
}