import * as React from 'react';
import {storiesOf} from '@storybook/react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useUser, useSignInWithPopup, useSignOut} from '../../src/auth';
import {app} from '../utils/app';
import {Provider} from '../../src/app';

const UseAuthExample: React.FC = () => {
  const [status, user, error] = useUser();
  const [, , signIn] = useSignInWithPopup();
  const [, , signOut] = useSignOut();

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

storiesOf('Auth', module).add('useAuth()', () => (
  <Provider app={app}>
    <UseAuthExample />
  </Provider>
));
