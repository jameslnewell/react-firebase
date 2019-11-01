import 'firebase/app';
import 'firebase/firestore';
import {
  useInvokablePromise,
  UseInvokablePromiseStatus,
  UseInvokablePromiseMetadata,
} from '@jameslnewell/react-promise';
import {useApp} from '@jameslnewell/react-firebase/app';

export const UseDeleteDocumentStatus = UseInvokablePromiseStatus;
export type UseDeleteDocumentStatus = UseInvokablePromiseStatus;
export type UseDeleteDocumentMetadata = UseInvokablePromiseMetadata;

export function useDeleteDocument(
  collection: string,
): [(id: string) => void, UseDeleteDocumentMetadata] {
  const app = useApp();
  const [invoke, , meta] = useInvokablePromise(
    (id: string) =>
      app
        .firestore()
        .collection(collection)
        .doc(id)
        .delete(),
    [app, collection],
  );
  return [invoke, {...meta}];
}
