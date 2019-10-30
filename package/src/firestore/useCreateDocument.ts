import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { useInvokablePromise, Status } from '@jameslnewell/react-promise';
import {useApp} from '../app';

type Data = firebase.firestore.DocumentData;
type Reference = firebase.firestore.DocumentReference;

export function useCreateDocument(collection: string): [(data: Data) => void, {status?: Status, error?: any, value?: Reference}] {
  const app = useApp();
  const [invoke, value, meta] = useInvokablePromise((data: Data) => app.firestore().collection(collection).add(data), [app, collection]);
  return [invoke, {...meta, value}];
}
