import {useEffect, useReducer} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {useApp} from '../app';

type Snapshot = firebase.firestore.DocumentSnapshot;
type Data = firebase.firestore.DocumentData;

export enum UseUpdateDocumentStatus {
  Updating = 'updating',
  Updated = 'updated',
  Errored = 'errored',
}

type Output = [
  UseUpdateDocumentStatus | undefined,
  Error | undefined,
  (id: string, data: Data) => Promise<void>
];

interface State {
  status?: UseUpdateDocumentStatus;
  snapshot?: Snapshot;
  error?: Error;
}

const RESET = 'reset';
const UPDATING = 'updating';
const UPDATED = 'updated';
const ERRORED = 'errored';

interface ResetAction {
  type: typeof RESET;
}

interface UpdatingAction {
  type: typeof UPDATING;
}

interface UpdatedAction {
  type: typeof UPDATED;
}

interface ErroredAction {
  type: typeof ERRORED;
  error: Error;
}

type Action = ResetAction | UpdatingAction | UpdatedAction | ErroredAction;

function reset(): ResetAction {
  return {type: RESET};
}

function updating(): UpdatingAction {
  return {
    type: UPDATING,
  };
}

function updated(): UpdatedAction {
  return {
    type: UPDATED,
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

    case UPDATING:
      return {
        status: UseUpdateDocumentStatus.Updating,
      };

    case UPDATED:
      return {
        status: UseUpdateDocumentStatus.Updated,
      };

    case ERRORED:
      return {
        status: UseUpdateDocumentStatus.Errored,
        error: action.error,
      };

    default:
      return state;
  }
}

export function useUpdateDocument(collection: string): Output {
  const app = useApp();
  const [state, dispatch] = useReducer(reducer, {});

  async function update(id: string, data: Data): Promise<void> {
    dispatch(updating());
    try {
      const db = app.firestore();
      await db
        .collection(collection)
        .doc(id)
        .update(data);
      dispatch(updated());
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

  return [state.status, state.error, update];
}
