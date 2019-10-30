import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useInvokablePromise} from '@jameslnewell/react-promise';
import {useApp} from '../app';

export enum UseSignInWithPopupStatus {
  Authenticating = 'authenticating',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Errored = 'errored',
}

type Output = [
  (provider: firebase.auth.AuthProvider) => void,
  {
    value: firebase.auth.UserCredential | undefined,
    error: firebase.auth.Error | undefined
  }
];

export function useSignInWithPopup(): Output {
  const app = useApp();
  const {invoke, ...otherProps} = useInvokablePromise((provider: firebase.auth.AuthProvider) => app.auth().signInWithPopup(provider));
  return [invoke, otherProps];
}
