import {useEffect, useReducer} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {useApp} from '../app';

type Snapshot = firebase.firestore.DocumentSnapshot;
type Reference = firebase.firestore.DocumentReference;
type Data = firebase.firestore.DocumentData;

export enum UseCreateDocumentStatus {
  Adding = 'adding',
  Added = 'added',
  Errored = 'errored',
}

type Output = [
  UseCreateDocumentStatus | undefined,
  Error | undefined,
  (data: Data) => Promise<Reference>
];

interface State {
  status?: UseCreateDocumentStatus;
  snapshot?: Snapshot;
  error?: Error;
}

const RESET = 'reset';
const ADDING = 'adding';
const ADDED = 'added';
const ERRORED = 'errored';

interface ResetAction {
  type: typeof RESET;
}

interface AddingAction {
  type: typeof ADDING;
}

interface AddedAction {
  type: typeof ADDED;
}

interface ErroredAction {
  type: typeof ERRORED;
  error: Error;
}

type Action = ResetAction | AddingAction | AddedAction | ErroredAction;

function reset(): ResetAction {
  return {type: RESET};
}

function adding(): AddingAction {
  return {
    type: ADDING,
  };
}

function added(): AddedAction {
  return {
    type: ADDED,
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
      return {};

    case ADDING:
      return {
        status: UseCreateDocumentStatus.Adding,
      };

    case ADDED:
      return {
        status: UseCreateDocumentStatus.Added,
      };

    case ERRORED:
      return {
        status: UseCreateDocumentStatus.Errored,
        error: action.error,
      };

    default:
      return state;
  }
}

export function useCreateDocument(collection: string): Output {
  const app = useApp();
  const [state, dispatch] = useReducer(reducer, {});

  async function add(data: Data): Promise<Reference> {
    dispatch(adding());
    try {
      const db = app.firestore();
      const ref = await db.collection(collection).add(data);
      dispatch(added());
      return ref;
    } catch (error) {
      dispatch(errored(error));
      throw error;
    }
  }

  useEffect(() => {
    // reset the state whenever the app or collection changes
    dispatch(reset());
    // TODO: ignore handling of the existing promise
  }, [collection, app]);

  return [state.status, state.error, add];
}
