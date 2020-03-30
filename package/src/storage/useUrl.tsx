import {useState, useEffect} from 'react';
import {useApp} from '../app';

type Status = 'loading' | 'loaded' | 'errored';

type UseURLOutput = [
  string | undefined,
  {
    status: Status;
    error?: Error;
  },
];

interface State {
  error?: Error;
  url?: string;
}

function getStatus(state: State): Status {
  if (state.error) {
    return 'errored';
  } else if (state.url) {
    return 'loaded';
  } else {
    return 'loading';
  }
}

export function useUrl(path: string): UseURLOutput {
  const app = useApp();
  const [state, setState] = useState<State>({});

  useEffect(() => {
    // reset the state whenever app or path changes
    setState({});

    // fetch the data
    app
      .storage()
      .ref(path)
      .getDownloadURL()
      .then(
        (url) => setState({url, error: undefined}),
        (error) => setState({error}),
      );
  }, [app, path]);

  return [state.url, {status: getStatus(state), error: state.error}];
}
