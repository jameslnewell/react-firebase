import {useState, useRef, useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useApp} from '../app';

export enum UseSignOutStatus {
  Processing = 'processing',
  Completed = 'completed',
  Errored = 'errored',
}

type Output = [
  UseSignOutStatus | undefined,
  firebase.auth.Error | undefined,
  () => Promise<void>
];

export function useSignOut(): Output {
  const app = useApp();

  useEffect(() => {
    // reset the state whenever the app changes
    dispatch(reset());
  }, [app]);

  const signOut = async (): Promise<void> => {
    try {
      dispatch(processing());
      await app.auth().signOut();
      dispatch(completed());
    } catch (error) {
      dispatch(error(error));
    }
  };

  return [state.status, state.error, signOut];
}
