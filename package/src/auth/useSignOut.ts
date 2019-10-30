import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useInvokablePromise} from '@jameslnewell/react-promise';
import {useApp} from '../app';

type Output = [
  () => void,
  {
    value: void,
    error: firebase.auth.Error | undefined,
  }
];

export function useSignOut(): Output {
  const app = useApp();
  const {invoke, ...otherProps} = useInvokablePromise(() => app.auth().signOut());
  return [invoke, otherProps];
}
