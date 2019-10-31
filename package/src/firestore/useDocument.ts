import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {create} from '@jameslnewell/observable';
import {useObservable, Metadata} from '@jameslnewell/react-observable';
import {useApp} from '@jameslnewell/react-firebase/app';

type Snapshot = firebase.firestore.DocumentSnapshot;
type Error = firebase.firestore.FirestoreError;

export function useDocument(
  path: string,
): [Snapshot | undefined, Metadata<Error>] {
  const app = useApp();
  return useObservable(
    () =>
      create(observer =>
        app
          .firestore()
          .doc(path)
          .onSnapshot(observer),
      ),
    [app, path],
  );
}
