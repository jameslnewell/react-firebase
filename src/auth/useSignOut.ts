import {
  useInvokablePromise,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import {useApp} from '../app';

export type UseSignOutInvocator = () => void;
export type UseSignOutMetadata = UseInvokablePromiseMetadata;
export type UseSignOutResult = [
  UseSignOutInvocator,
  UseInvokablePromiseMetadata,
];

export function useSignOut(): UseSignOutResult {
  const app = useApp();
  const [invoke, , metadata] = useInvokablePromise(() => app.auth().signOut(), [
    app,
  ]);
  return [invoke, metadata];
}
