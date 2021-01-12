import firebase from 'firebase';
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

export type UseSignInInvocator = (
  provider: UseSignInWithPopupProvider,
) => Promise<UseSignInWithPopupUser>;
export type UseSignInResult = [UseSignInInvocator, UseSignInWithPopupMetadata];

export function useSignInWithPopup(): UseSignInResult {
  const app = useApp();
  const [invoke, value, metadata] = useInvokablePromise(
    (provider: UseSignInWithPopupProvider) =>
      app.auth().signInWithPopup(provider),
    [app],
  );
  return [invoke, {...metadata, value}];
}
