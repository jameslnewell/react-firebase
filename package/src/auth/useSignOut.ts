import 'firebase/app';
import 'firebase/auth';
import {
  useInvokablePromise,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import {useApp} from '../app';

export type UseSignOutMetadata = UseInvokablePromiseMetadata;

export function useSignOut(): [() => void, UseInvokablePromiseMetadata] {
  const app = useApp();
  const [invoke, , metadata] = useInvokablePromise(() => app.auth().signOut(), [
    app,
  ]);
  return [invoke, metadata];
}
