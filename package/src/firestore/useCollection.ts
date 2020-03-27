import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {create} from '@jameslnewell/observable';
import {
  UseObservableStatus,
  UseObservableMetadata,
  useObservable,
} from '@jameslnewell/react-observable';
import {useApp} from '../app';

export const UseCollectionStatus = UseObservableStatus;
export type UseCollectionStatus = UseObservableStatus;
export type UseCollectionSnapshot = firebase.firestore.QuerySnapshot;
export type UseCollectionMetadata = UseObservableMetadata<Error>;

export function useCollection(
  path: string,
): [UseCollectionSnapshot | undefined, UseCollectionMetadata] {
  const app = useApp();
  return useObservable(
    () =>
      create<UseCollectionSnapshot, Error>((observer) =>
        app.firestore().collection(path).onSnapshot(observer),
      ),
    [app, path],
  );
}
