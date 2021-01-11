import firebase from 'firebase';
import {create} from '@jameslnewell/observable';
import {useObservable} from '@jameslnewell/react-observable';
import {useApp} from '../app';

export enum UseUserStatus {
  Authenticating = 'authenticating',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Errored = 'errored',
}

export type UseUserUser = firebase.User;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseUserMetadata<E = any> {
  status: UseUserStatus;
  error: E | undefined;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  isErrored: boolean;
}

export type UseUserResult = [UseUserUser | undefined, UseUserMetadata];

export function useUser(): UseUserResult {
  const app = useApp();
  const [value, metadata] = useObservable(
    () =>
      create<firebase.User | null>((observer) => {
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
