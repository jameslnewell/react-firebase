import * as React from 'react';
import {useUrl} from '../../src/storage';

export function UseUrlExample() {
  const [url, {error}] = useUrl('file.jpg');
  return (
    <>
      {error && String(error)}
      {url && <img src={url} style={{maxWidth: '100%'}}/>}
    </>
  );
}