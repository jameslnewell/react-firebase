import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { create } from '@jameslnewell/observable';
import {useObservable, Metadata} from '@jameslnewell/react-observable';
import {useApp} from '../app';

export function useCollection(path: string): [firebase.firestore.QuerySnapshot | undefined, Metadata] {
  const app = useApp();
  return useObservable(() => create(observer => {
    return app.firestore().collection(path).onSnapshot(observer);
  }), [app, path]);
}
