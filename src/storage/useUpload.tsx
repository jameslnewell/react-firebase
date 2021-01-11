import {useState} from 'react';
import firebase from 'firebase';
import {useApp} from '../app';

type Snapshot = firebase.storage.UploadTaskSnapshot;

export type UploadStatus =
  | 'uploading'
  | 'paused'
  | 'uploaded'
  | 'canceled'
  | 'errored';

interface UploadState {
  status?: UploadStatus;
  transferred?: number;
  total?: number;
  error?: Error;
}

interface UploadMethods {
  upload: (
    file: string | Blob,
    metadata?: firebase.storage.UploadMetadata,
  ) => void;
  canPause: () => boolean;
  pause: () => void;
  canResume: () => boolean;
  resume: () => void;
  canCancel: () => boolean;
  cancel: () => void;
}

export type Upload = UploadState & UploadMethods;

function getStatus(state: firebase.storage.TaskState): UploadStatus {
  switch (state) {
    case firebase.storage.TaskState.RUNNING:
      return 'uploading';
    case firebase.storage.TaskState.PAUSED:
      return 'paused';
    case firebase.storage.TaskState.SUCCESS:
      return 'uploaded';
    case firebase.storage.TaskState.ERROR:
      return 'errored';
    case firebase.storage.TaskState.CANCELED:
      return 'canceled';
    default:
      throw new Error('Invalid task state');
  }
}

function updated(snapshot: Snapshot): UploadState {
  const status = getStatus(snapshot.state);
  if (status === 'canceled' || status === 'errored') {
    throw new Error('Invalid state');
  } else {
    return {
      status,
      transferred: snapshot.bytesTransferred,
      total: snapshot.totalBytes,
    };
  }
}

function errored(snapshot: Snapshot, error: Error): UploadState {
  const status = getStatus(snapshot.state);
  if (status === 'canceled' || status === 'errored') {
    return {
      status,
      error,
    };
  } else {
    throw new Error('Invalid state');
  }
}

export function useUpload(path: string): Upload {
  const app = useApp();
  const [state, setState] = useState<UploadState>({status: undefined});
  const [uploader, setUploader] = useState<
    firebase.storage.UploadTask | undefined
  >(undefined);

  const methods: UploadMethods = {
    upload(
      file: string | File | Blob,
      metadata?: firebase.storage.UploadMetadata,
    ) {
      if (!app) {
        throw new Error('Firebase is not ready yet');
      }

      // get the uploader
      const ref = app.storage().ref(path);
      let task: firebase.storage.UploadTask;
      if (typeof file === 'string') {
        task = ref.putString(file);
      } else {
        task = ref.put(file, metadata);
      }

      setUploader(task);
      setState(updated(task.snapshot));

      // observe changes in state
      task.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        next: () => {
          setState(updated(task.snapshot));
          setState(updated(task.snapshot));
        },
        error: (error) => {
          setUploader(undefined);
          setState(errored(task.snapshot, error));
        },
        complete: () => {
          setUploader(undefined);
          setState(updated(task.snapshot));
        },
      });
    },

    canPause(): boolean {
      return state.status === 'uploading';
    },

    pause() {
      if (!uploader) {
        throw new Error('File upload is not in progress.');
      }
      uploader.pause();
    },

    canResume(): boolean {
      return state.status === 'paused';
    },

    resume() {
      if (!uploader) {
        throw new Error('File upload is not in progress.');
      }
      uploader.resume();
    },

    canCancel(): boolean {
      return state.status === 'uploading';
    },

    cancel() {
      if (!uploader) {
        throw new Error('File upload is not in progress.');
      }
      uploader.cancel();
    },
  };

  return {
    ...state,
    ...methods,
  };
}
