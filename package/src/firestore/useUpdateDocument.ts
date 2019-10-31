import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {useInvokablePromise, Metadata} from '@jameslnewell/react-promise';
import {useApp} from '@jameslnewell/react-firebase/app';

type Data = firebase.firestore.DocumentData;

export function useUpdateDocument(
  collection: string,
): [(id: string, data: Data) => void, Metadata] {
  const app = useApp();
  const [invoke, , meta] = useInvokablePromise(
    (id: string, data: Data) =>
      app
        .firestore()
        .collection(collection)
        .doc(id)
        .update(data),
    [app, collection],
  );
  return [invoke, {...meta}];
}
