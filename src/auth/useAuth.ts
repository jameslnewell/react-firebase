
import {useState, useEffect} from 'react';
import 'firebase/auth';
import {useApp} from '../app';

type AuthStatus = 'loading' | 'loaded' | 'errored';

export type Auth = [
  firebase.User | undefined,
  {
    status: AuthStatus;
    error?: firebase.auth.Error;
    signInWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
    signOut: () => Promise<void>;
  }
];

interface State {
  error?: firebase.auth.Error;
  user?: firebase.User;
}

function getStatus(state: State): AuthStatus {
  if (state.error) {
    return 'errored';
  } else if (state.user) {
    return 'loaded';
  } else {
    return 'loading';
  }
}

function updated(user?: firebase.User) {
  return () => ({
    user,
    error: undefined
  });
}

function errored(error: firebase.auth.Error) {
  return () => ({
    error
  });
}

export function useAuth(): Auth {
  const app = useApp();
  const [state, setState] = useState<State>({});

  useEffect(() => {
    // reset the state whenever the app changes
    setState({});
    // TODO: unsubscribe when app changes

    // subscribe to the auth state whenever the app changes
    // TODO: call old unsubscribe method
    const unsubscribe = app.auth().onAuthStateChanged(
      (user) => setState(updated(user || undefined)), 
      (error) => setState(errored(error))
    );

    return () => unsubscribe();
  }, [app]);

  function signInWithPopup(provider: firebase.auth.AuthProvider) {
    return app.auth().signInWithPopup(provider);
  }

  function signOut() {
    return app.auth().signOut();
  }

  return [
    state.user,
    {
      status: getStatus(state),
      error: state.error, 
      signInWithPopup,
      signOut
    }
  ];
}