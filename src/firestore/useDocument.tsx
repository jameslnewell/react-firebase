import {useContext, useState, useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {Context} from '../app/Context';

type Reference = firebase.firestore.DocumentReference;
type Snapshot = firebase.firestore.DocumentSnapshot;
type Data = firebase.firestore.DocumentData;

interface DocumentMeta {
  error?: Error;
  loaded: boolean;
  set: (data: Data) => void; 
  update: (data: Data) => void; 
  delete: () => void;
}

type Output = [
  undefined | Data,
  DocumentMeta
];

interface State {
  reference?: Reference;
  unsubscribe?: () => void;
  snapshot?: Snapshot;
  error?: Error;
}

const initalState = {
  loaded: false
};

function updated(snapshot: Snapshot) {
  return (s: State) => ({
    ...s,
    snapshot
  });
}

function errored(error: Error) {
  return (s: State) => ({
    ...s,
    error
  });
}

export function useDocument(path: string): Output {
  const app = useContext(Context);
  const [state, setState] = useState<State>({});

  function set(data: Data) {
    if (!state.reference) {
      throw new Error('Firestore has not loaded yet.');
    }
    state.reference.set(data);
  }

  function update(data: Data) {
    if (!state.reference) {
      throw new Error('Firestore has not loaded yet.');
    }
    state.reference.update(data);
  }

  function del() {
    if (!state.reference) {
      throw new Error('Firestore has not loaded yet.');
    }
    state.reference.delete();
  }

  useEffect(() => {
    setState({});
    // TODO: unsubscribe when app changes

    const db = app.firestore();

    db.settings({
      timestampsInSnapshots: true
    });

    const reference = db.doc(path);
    const unsubscribe = reference.onSnapshot(
      {},
      {
        next: snapshot => setState(updated(snapshot)),
        error: error => setState(errored(error))
      }
    );

    setState({
      ...initalState,
      reference,
      unsubscribe
    });

    return unsubscribe;
  }, [path, app]);

  return [
    state.snapshot && state.snapshot.data(),
    {loaded: Boolean(state.snapshot), error: state.error, set, update, delete: del}
  ];
}