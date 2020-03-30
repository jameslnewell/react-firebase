import * as firebase from 'firebase';
import {
  useInvokablePromise,
  UseInvokablePromiseStatus,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import {useApp} from '../app';

export const UseAddDocumentStatus = UseInvokablePromiseStatus;
export type UseAddDocumentStatus = UseInvokablePromiseStatus;
export type UseAddDocumentData = firebase.firestore.DocumentData;
export type UseAddDocumentReference = firebase.firestore.DocumentReference;
export type UseAddDocumentMetadata = UseInvokablePromiseMetadata & {
  value?: UseAddDocumentReference;
};

export function useAddDocument(
  collection: string,
): [
  (data: UseAddDocumentData) => Promise<UseAddDocumentReference>,
  UseAddDocumentMetadata,
] {
  const app = useApp();
  const [invoke, value, meta] = useInvokablePromise(
    (data: UseAddDocumentData) =>
      app.firestore().collection(collection).add(data),
    [app, collection],
  );
  return [invoke, {...meta, value}];
}
