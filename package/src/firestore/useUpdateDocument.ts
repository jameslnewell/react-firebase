import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
  useInvokablePromise,
  UseInvokablePromiseStatus,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import {useApp} from '../app';

export const UseUpdateDocumentStatus = UseInvokablePromiseStatus;
export type UseUpdateDocumentStatus = UseInvokablePromiseStatus;
export type UseUpdateDocumentData = firebase.firestore.DocumentData;
export type UseUpdateDocumentReference = firebase.firestore.DocumentReference;
export type UseUpdateDocumentMetadata = UseInvokablePromiseMetadata;

export function useUpdateDocument(
  collection: string,
): [
  (id: string, data: UseUpdateDocumentData) => Promise<void>,
  UseUpdateDocumentMetadata,
] {
  const app = useApp();
  const [invoke, , meta] = useInvokablePromise(
    (id: string, data: UseUpdateDocumentData) =>
      app.firestore().collection(collection).doc(id).update(data),
    [app, collection],
  );
  return [invoke, meta];
}
