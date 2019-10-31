import 'firebase/app';
import 'firebase/firestore';
import {useInvokablePromise, Metadata} from '@jameslnewell/react-promise';
import {useApp} from '@jameslnewell/react-firebase/app';

export function useDeleteDocument(
  collection: string,
): [(id: string) => void, Metadata] {
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
