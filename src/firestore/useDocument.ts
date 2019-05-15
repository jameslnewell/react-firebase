import {useEffect, useReducer, useRef} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {useApp} from '../app';

type Snapshot = firebase.firestore.DocumentSnapshot;
type Data = firebase.firestore.DocumentData;

export enum UseDocumentStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Errored = 'errored',
}

type Output = [UseDocumentStatus, Data | undefined, Error | undefined];

interface State {
  status: UseDocumentStatus;
  snapshot?: Snapshot;
  error?: Error;
}

const RESET = 'reset';
const UPDATED = 'updated';
const ERRORED = 'errored';

interface ResetAction {
  type: typeof RESET;
}

interface UpdatedAction {
  type: typeof UPDATED;
  snapshot: Snapshot;
}

interface ErroredAction {
  type: typeof ERRORED;
  error: Error;
}

type Action = ResetAction | UpdatedAction | ErroredAction;

function reset(): ResetAction {
  return {type: RESET};
}

function updated(snapshot: Snapshot): UpdatedAction {
  return {
    type: UPDATED,
    snapshot,
  };
}

function errored(error: Error): ErroredAction {
  return {
    type: ERRORED,
    error,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case RESET:
      return {
        status: UseDocumentStatus.Loading,
      };

    case UPDATED:
      return {
        status: UseDocumentStatus.Loaded,
        snapshot: action.snapshot,
      };

    case ERRORED:
      return {
        status: UseDocumentStatus.Errored,
        error: action.error,
      };

    default:
      return state;
  }
}

export function useDocument(path: string): Output {
  const app = useApp();
  const [state, dispatch] = useReducer(reducer, {
    status: UseDocumentStatus.Loading,
  });
  const previousSubscription = useRef<firebase.Unsubscribe>();

  useEffect(() => {
    // reset the state whenever the app or path changes
    dispatch(reset());

    // unsubscribe when app or path changes
    if (previousSubscription.current) {
      previousSubscription.current();
    }

    // subscribe to the collection state whenever the app or path changes
    const db = app.firestore();
    const reference = db.doc(path);
    const unsubscribe = reference.onSnapshot(
      {},
      {
        next: snapshot => dispatch(updated(snapshot)),
        error: error => dispatch(errored(error)),
      },
    );

    // store the unsubscribe method for when the app or path changes
    previousSubscription.current = unsubscribe;

    return unsubscribe;
  }, [path, app]);

  return [state.status, state.snapshot && state.snapshot.data(), state.error];
}
