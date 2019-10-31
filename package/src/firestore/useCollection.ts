import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {create} from '@jameslnewell/observable';
import {useObservable, Metadata} from '@jameslnewell/react-observable';
import {useApp} from '@jameslnewell/react-firebase/app';

type Snapshot = firebase.firestore.QuerySnapshot;

export function useCollection(
  path: string,
): [firebase.firestore.QuerySnapshot | undefined, Metadata<Error>] {
  const app = useApp();
  return useObservable(
    () =>
      create<Snapshot, Error>(observer =>
        app
          .firestore()
          .collection(path)
          .onSnapshot(observer),
      ),
    [app, path],
  );
}
