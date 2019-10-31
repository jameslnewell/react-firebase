import * as firebase from 'firebase/app';
import 'firebase/auth';
import {create} from '@jameslnewell/observable';
import {useObservable} from '@jameslnewell/react-observable';
import {useApp} from '@jameslnewell/react-firebase/app';

export enum UseUserStatus {
  Authenticating = 'authenticating',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Errored = 'errored',
}

export interface UseUserMetadata<E = any> {
  status: UseUserStatus;
  error: E | undefined;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  isErrored: boolean;
}

export function useUser(): [firebase.User | undefined, UseUserMetadata] {
  const app = useApp();
  const [value, metadata] = useObservable(
    () =>
      create<firebase.User | null>(observer => {
        return app.auth().onAuthStateChanged(observer);
      }),
    [app],
  );

  const user = value || app.auth().currentUser || undefined;
  const status = (() => {
    if (metadata.isErrored) {
      return UseUserStatus.Errored;
    }
    if (user) {
      return UseUserStatus.Authenticated;
    }
    if ((metadata.isReceived || metadata.isCompleted) && user === undefined) {
      return UseUserStatus.Unauthenticated;
    }
    return UseUserStatus.Authenticating;
  })();

  return [
    user,
    {
      status,
      error: metadata.error,
      isAuthenticating: status === UseUserStatus.Authenticating,
      isAuthenticated: status === UseUserStatus.Authenticated,
      isUnauthenticated: status === UseUserStatus.Unauthenticated,
      isErrored: status === UseUserStatus.Errored,
    },
  ];
}