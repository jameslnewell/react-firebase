import React from 'react';
import firebase from 'firebase';
import {decorator} from '../__utilities__/decorator';
import {useUser, useSignInWithPopup, useSignOut} from '.';

export default {
  title: 'auth',
  decorators: [decorator],
};

export const Example: React.FC = () => {
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
};
