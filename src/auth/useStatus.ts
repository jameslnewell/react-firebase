import firebase from 'firebase';
import {create} from '@jameslnewell/observable';
import {useObservable} from '@jameslnewell/react-observable';
import {useApp} from '../app';

export enum Status {
  Authenticating = 'authenticating',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Errored = 'errored',
}

export interface UseStatusMetadata {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  isErrored: boolean;
}

export type UseStatusResult = [Status, UseStatusMetadata];

export function useStatus(): UseStatusResult {
  const app = useApp();
  const [, metadata] = useObservable(
    () =>
      create<firebase.User | null>((observer) =>
        app.auth().onAuthStateChanged(observer),
      ),
    [app],
  );

  const status = (() => {
    if (metadata.isErrored) {
      return Status.Errored;
    }
    if (user) {
      return Status.Authenticated;
    }
    if ((metadata.isReceived || metadata.isCompleted) && user === undefined) {
      return Status.Unauthenticated;
    }
    return Status.Authenticating;
  })();

  return [
    status,
    {
      isAuthenticating: status === UseUserStatus.Authenticating,
      isAuthenticated: status === UseUserStatus.Authenticated,
      isUnauthenticated: status === UseUserStatus.Unauthenticated,
      isErrored: status === UseUserStatus.Errored,
    },
  ];
}
