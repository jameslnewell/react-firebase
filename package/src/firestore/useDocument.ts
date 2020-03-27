import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {create} from '@jameslnewell/observable';
import {
  UseObservableStatus,
  UseObservableMetadata,
  useObservable,
} from '@jameslnewell/react-observable';
import {useApp} from '../app';

export const UseDocumentStatus = UseObservableStatus;
export type UseDocumentStatus = UseObservableStatus;
export type UseDocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type UseDocumentMetadata = UseObservableMetadata<Error>;

export function useDocument(
  path: string,
): [UseDocumentSnapshot | undefined, UseDocumentMetadata] {
  const app = useApp();
  return useObservable(
    () => create((observer) => app.firestore().doc(path).onSnapshot(observer)),
    [app, path],
  );
}
