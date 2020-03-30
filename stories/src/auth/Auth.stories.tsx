import * as React from 'react';
import * as firebase from 'firebase';
import {wrap} from '../wrap';
import {
  useUser,
  useSignInWithPopup,
  useSignOut,
} from '../../../package/src/auth';

export default {
  title: 'auth',
};

export const Auth = wrap(() => {
  const [user, {status, error}] = useUser();
  const [signIn] = useSignInWithPopup();
  const [signOut] = useSignOut();

  function handleSignInOrOut(): void {
    if (user) {
      signOut();
    } else {
      signIn(new firebase.auth.GoogleAuthProvider());
    }
  }

  return (
    <>
      <p>{status}</p>
      <p>{error && String(error)}</p>
      <code>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </code>
      <button onClick={handleSignInOrOut}>
        {user ? 'sign out' : 'sign in'}
      </button>
    </>
  );
});
