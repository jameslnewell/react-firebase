import {useContext, useState, useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {Context} from '../app/Context';

type Reference = firebase.firestore.CollectionReference;
type Snapshot = firebase.firestore.QuerySnapshot;
type Data = firebase.firestore.DocumentData;


type Status = 'loading' | 'loaded' | 'errored';

interface DocumentMeta {
  set: (data: Data) => void; 
  update: (data: Data) => void; 
  delete: () => void;
}

interface CollectionMeta {
  status: Status;
  error?: Error;
    add: (data: Data) => void;
}

type Document = [
  string, 
  Data,
  DocumentMeta
]; 

type Output = [
  Document[],
  CollectionMeta
];

interface State {
  reference?: Reference;
  unsubscribe?: () => void;
  snapshot?: Snapshot;
  error?: Error;
}

function getStatus(state: State): Status {
  if (state.error) {
    return 'errored';
  } else if (state.snapshot) {
    return 'loaded';
  } else {
    return 'loading';
  }
}

function updated(snapshot: Snapshot) {
  return (s: State) => ({
    ...s,
    snapshot,
    error: undefined
  });
}

function errored(error: Error) {
  return (s: State) => ({
    ...s,
    error
  });
}

export function useCollection(path: string): Output {
  const app = useContext(Context);
  const [state, setState] = useState<State>({});

  function add(document: Data) {
    if (!state.reference) {
      throw new Error(`Firestore is not ready yet.`);
    }
    state.reference.add(document);
  }

  useEffect(() => {
    setState({});
    // TODO: unsubscribe when app changes

    const db = app.firestore();

    db.settings({
      timestampsInSnapshots: true
    });

    const reference = db.collection(path);
    const unsubscribe = reference.onSnapshot(
      {},
      {
        next: snapshot => setState(updated(snapshot)),
        error: error => setState(errored(error))
      }
    );

    setState({
      reference,
      unsubscribe
    });

    return unsubscribe;
  }, [path, app]);

  const documents = state.snapshot ? state.snapshot.docs.map<[string, Data, DocumentMeta]>(snapshot => ([
    snapshot.ref.id,
    snapshot.data(),
    {
      set: (data: Data) => {
        snapshot.ref.set(data);
      },
      update: (data: Data) => {
        snapshot.ref.update(data);
      },
      delete: () => {
        snapshot.ref.delete();
      }
    }
  ])) : [];

  return [documents, {status: getStatus(state), error: state.error, add}];
}