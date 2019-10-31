import 'firebase/app';
import 'firebase/auth';
import {useInvokablePromise, Metadata} from '@jameslnewell/react-promise';
import {useApp} from '@jameslnewell/react-firebase/app';

type Output = [() => void, Metadata];

export function useSignOut(): Output {
  const app = useApp();
  const [invoke, , metadata] = useInvokablePromise(() => app.auth().signOut(), [
    app,
  ]);
  return [invoke, metadata];
}
