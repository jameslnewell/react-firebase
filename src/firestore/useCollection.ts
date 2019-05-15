import {useEffect, useRef, useReducer} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {useApp} from '../app';

type Snapshot = firebase.firestore.QuerySnapshot;
type Data = firebase.firestore.DocumentData;

export enum UseCollectionStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Errored = 'errored',
}

type Document = [string, Data];

export type UseCollectionOutput = [
  UseCollectionStatus,
  Document[],
  Error | undefined
];

interface State {
  status: UseCollectionStatus;
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
        status: UseCollectionStatus.Loading,
      };

    case UPDATED:
      return {
        status: UseCollectionStatus.Loaded,
        snapshot: action.snapshot,
      };

    case ERRORED:
      return {
        status: UseCollectionStatus.Errored,
        error: action.error,
      };

    default:
      return state;
  }
}

export function useCollection(path: string): UseCollectionOutput {
  const app = useApp();
  const [state, dispatch] = useReducer(reducer, {
    status: UseCollectionStatus.Loading,
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
    const reference = db.collection(path);
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

  // map the documents to an array
  const documents = state.snapshot
    ? state.snapshot.docs.map<[string, Data]>(snapshot => [
        snapshot.ref.id,
        snapshot.data(),
      ])
    : [];

  return [state.status, documents, state.error];
}
