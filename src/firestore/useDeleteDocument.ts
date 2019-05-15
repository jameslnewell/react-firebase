import {useEffect, useReducer} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {useApp} from '../app';

type Snapshot = firebase.firestore.DocumentSnapshot;

export enum UseDeleteDocumentStatus {
  Deleting = 'deleting',
  Deleted = 'deleted',
  Errored = 'errored',
}

type Output = [
  UseDeleteDocumentStatus | undefined,
  Error | undefined,
  (id: string) => Promise<void>
];

interface State {
  status?: UseDeleteDocumentStatus;
  snapshot?: Snapshot;
  error?: Error;
}

const RESET = 'reset';
const DELETING = 'deleting';
const DELETED = 'deleted';
const ERRORED = 'errored';

interface ResetAction {
  type: typeof RESET;
}

interface DeletingAction {
  type: typeof DELETING;
}

interface DeletedAction {
  type: typeof DELETED;
}

interface ErroredAction {
  type: typeof ERRORED;
  error: Error;
}

type Action = ResetAction | DeletingAction | DeletedAction | ErroredAction;

function reset(): ResetAction {
  return {type: RESET};
}

function deleting(): DeletingAction {
  return {
    type: DELETING,
  };
}

function deleted(): DeletedAction {
  return {
    type: DELETED,
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

    case DELETING:
      return {
        status: UseDeleteDocumentStatus.Deleting,
      };

    case DELETED:
      return {
        status: UseDeleteDocumentStatus.Deleted,
      };

    case ERRORED:
      return {
        status: UseDeleteDocumentStatus.Errored,
        error: action.error,
      };

    default:
      return state;
  }
}

export function useDeleteDocument(collection: string): Output {
  const app = useApp();
  const [state, dispatch] = useReducer(reducer, {});

  async function del(id: string): Promise<void> {
    dispatch(deleting());
    try {
      const db = app.firestore();
      await db
        .collection(collection)
        .doc(id)
        .delete();
      dispatch(deleted());
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

  return [state.status, state.error, del];
}
