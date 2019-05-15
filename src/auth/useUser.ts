import {useState, useRef, useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useApp} from '../app';

export enum UseUserStatus {
  // TODO: it'd be ideal to have an authenticating status
  Unauthenticated = 'unauthenticated',
  Authenticated = 'authenticated',
  Errored = 'errored',
}

type Output = [
  UseUserStatus,
  firebase.User | undefined,
  firebase.auth.Error | undefined
];

function getStatus(
  user: firebase.User | undefined,
  error: firebase.auth.Error | undefined,
): UseUserStatus {
  if (error) {
    return UseUserStatus.Errored;
  } else if (user) {
    return UseUserStatus.Authenticated;
  } else {
    return UseUserStatus.Unauthenticated;
  }
}

export function useUser(): Output {
  const app = useApp();
  const [user, setUser] = useState<firebase.User | undefined>(
    app.auth().currentUser || undefined,
  );
  const [error, setError] = useState<firebase.auth.Error | undefined>(
    undefined,
  );
  const previousSubscription = useRef<firebase.Unsubscribe>();

  useEffect(() => {
    // reset the state whenever the app changes
    setUser(undefined);
    setError(undefined);

    // unsubscribe when app changes
    if (previousSubscription.current) {
      previousSubscription.current();
    }

    // subscribe to the auth state whenever the app changes
    const unsubscribe = app.auth().onAuthStateChanged(
      user => setUser(user || undefined),
      error => setError(error), // not sure if this ever gets called - errors get returned from signIn*()
    );

    // store the unsubscribe method for when the app changes
    previousSubscription.current = unsubscribe;

    return () => unsubscribe();
  }, [app]);

  return [getStatus(user, error), user, error];
}
