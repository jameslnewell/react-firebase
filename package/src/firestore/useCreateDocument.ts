import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {useInvokablePromise, Metadata} from '@jameslnewell/react-promise';
import {useApp} from '@jameslnewell/react-firebase/app';

type Data = firebase.firestore.DocumentData;
type Reference = firebase.firestore.DocumentReference;

export function useCreateDocument(
  collection: string,
): [(data: Data) => void, Metadata & {value?: Reference}] {
  const app = useApp();
  const [invoke, value, meta] = useInvokablePromise(
    (data: Data) =>
      app
        .firestore()
        .collection(collection)
        .add(data),
    [app, collection],
  );
  return [invoke, {...meta, value}];
}
