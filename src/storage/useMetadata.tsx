import firebase from 'firebase';
import {useState, useEffect} from 'react';
import {useApp} from '../app';

type Status = 'loading' | 'loaded' | 'errored';

type UseMetadataOutput = [
  firebase.storage.FullMetadata | undefined,
  {
    status: Status;
    error?: string;
  },
];

interface State {
  error?: string;
  metadata?: firebase.storage.FullMetadata;
}

function getStatus(state: State): Status {
  if (state.error) {
    return 'errored';
  } else if (state.metadata) {
    return 'loaded';
  } else {
    return 'loading';
  }
}

export function useMetadata(path: string): UseMetadataOutput {
  const app = useApp();
  const [state, setState] = useState<State>({});

  useEffect(() => {
    // reset the state whenever app or path changes
    setState({});

    // fetch the data
    app
      .storage()
      .ref(path)
      .getMetadata()
      .then(
        (metadata) => setState({metadata}),
        (error) => setState({error}),
      );
  }, [app, path]);

  return [
    state.metadata,
    {
      status: getStatus(state),
      error: state.error,
    },
  ];
}
