import 'firebase/app';
import 'firebase/firestore';
import { useInvokablePromise, Status } from '@jameslnewell/react-promise';
import {useApp} from '../app';

export function useDeleteDocument(collection: string): [(id: string) => void, {status?: Status, error?: any}] {
  const app = useApp();
  const [invoke,, meta] = useInvokablePromise((id: string) => app.firestore().collection(collection).doc(id).delete(), [app, collection]);
  return [invoke, {...meta}];
}
