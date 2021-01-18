import firebase from 'firebase';
import {
  useInvokablePromise,
  UseInvokablePromiseStatus,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import {useApp} from '../app';

export const UseUpdateDocumentStatus = UseInvokablePromiseStatus;
export type UseUpdateDocumentStatus = UseInvokablePromiseStatus;
export type UseUpdateDocumentData = firebase.firestore.DocumentData;
export type UseUpdateDocumentMetadata = UseInvokablePromiseMetadata;

export type UseUpdateDocumentResult = [
  (path: string, data: UseUpdateDocumentData) => Promise<void>,
  UseUpdateDocumentMetadata,
];

export function useUpdateDocument(): UseUpdateDocumentResult {
  const app = useApp();
  const [invoke, , meta] = useInvokablePromise(
    (path: string, data: UseUpdateDocumentData) =>
      app.firestore().doc(path).update(data),
    [app],
  );
  return [invoke, meta];
}
