import {
  useInvokablePromise,
  UseInvokablePromiseStatus,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import firebase from 'firebase';
import {useApp} from '../app';

export const UseDeleteDocumentStatus = UseInvokablePromiseStatus;
export type UseDeleteDocumentStatus = UseInvokablePromiseStatus;
export type UseDeleteDocumentReference = firebase.firestore.DocumentReference;
export type UseDeleteDocumentMetadata = UseInvokablePromiseMetadata;

export type UseDeleteDocumentResult = [
  (path: string) => Promise<void>,
  UseDeleteDocumentMetadata,
];

export function useDeleteDocument(): UseDeleteDocumentResult {
  const app = useApp();
  const [invoke, , meta] = useInvokablePromise(
    (path: string) => app.firestore().doc(path).delete(),
    [app, document],
  );
  return [invoke, {...meta}];
}
