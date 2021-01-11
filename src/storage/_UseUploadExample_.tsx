/* eslint-disable */
import React from 'react';
import {useUpload, Upload} from '../storage';

function FileProgress(props: {file: Upload}) {
  const {file} = props;

  if (!file.status) {
    return null;
  }
  return (
    <>
      {file.status}
      {' - '}
      {((file.transferred / file.total) * 100).toFixed(2)}%
      <br />
      {file.error && String(file.error)}
    </>
  );
}

export function UseUploadExample() {
  const file = useUpload('file.jpg');
  const input = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (!input.current.files.length) {
      input.current.click();
      return;
    }
    file.upload(input.current.files[0]);
  }

  return (
    <>
      <FileProgress file={file} />
      <form onSubmit={handleSubmit}>
        <input type="file" autoFocus={true} ref={input} />
        <button type="submit" disabled={file.canPause() || file.canResume()}>
          Upload
        </button>
        <button
          type="button"
          disabled={!file.canPause() && !file.canResume()}
          onClick={() => (file.canResume() ? file.resume() : file.pause())}
        >
          {file.canPause() ? '⏸' : '▶️'}
        </button>
        <button
          type="button"
          disabled={!file.canCancel()}
          onClick={() => file.cancel()}
        >
          ❌
        </button>
      </form>
    </>
  );
}
