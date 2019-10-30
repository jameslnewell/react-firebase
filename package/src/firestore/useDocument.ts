import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { create } from '@jameslnewell/observable';
import {useObservable, Metadata} from '@jameslnewell/react-observable';
import {useApp} from '../app';

export function useDocument(path: string): [firebase.firestore.DocumentSnapshot | undefined, Metadata] {
  const app = useApp();
  return useObservable(() => create(observer => {
    return app.firestore().doc(path).onSnapshot(observer);
  }), [app, path]);
}
