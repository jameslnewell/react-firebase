import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useInvokablePromise, Metadata} from '@jameslnewell/react-promise';
import {useApp} from '@jameslnewell/react-firebase/app';

export enum UseSignInWithPopupStatus {
  Authenticating = 'authenticating',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Errored = 'errored',
}

type Provider = firebase.auth.AuthProvider;
type User = firebase.auth.UserCredential;

type Output = [
  (provider: Provider) => void,
  Metadata & {
    value: User | undefined;
  },
];

export function useSignInWithPopup(): Output {
  const app = useApp();
  const [invoke, value, metadata] = useInvokablePromise(
    (provider: firebase.auth.AuthProvider) =>
      app.auth().signInWithPopup(provider),
    [app],
  );
  return [invoke, {...metadata, value}];
}
