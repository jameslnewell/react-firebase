import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  useInvokablePromise,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import {useApp} from '../app';

export type UseSignInWithPopupProvider = firebase.auth.AuthProvider;
export type UseSignInWithPopupUser = firebase.auth.UserCredential;
export type UseSignInWithPopupMetadata = UseInvokablePromiseMetadata & {
  value: UseSignInWithPopupUser | undefined;
};

export function useSignInWithPopup(): [
  (provider: UseSignInWithPopupProvider) => void,
  UseSignInWithPopupMetadata,
] {
  const app = useApp();
  const [invoke, value, metadata] = useInvokablePromise(
    (provider: UseSignInWithPopupProvider) =>
      app.auth().signInWithPopup(provider),
    [app],
  );
  return [invoke, {...metadata, value}];
}
