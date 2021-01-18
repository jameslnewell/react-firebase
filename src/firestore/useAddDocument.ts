import firebase from 'firebase';
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

export interface UseAddDocumentMetadata
  extends Omit<UseInvokablePromiseMetadata, 'value'> {
  ref?: UseAddDocumentReference;
}

export type UseAddDocumentResult = [
  (
    collection: string,
    data: UseAddDocumentData,
  ) => Promise<UseAddDocumentReference>,
  UseAddDocumentMetadata,
];

export function useAddDocument(): UseAddDocumentResult {
  const app = useApp();
  const [invoke, value, meta] = useInvokablePromise(
    (collection: string, data: UseAddDocumentData) =>
      app.firestore().collection(collection).add(data),
    [app],
  );
  return [invoke, {...meta, ref: value}];
}
