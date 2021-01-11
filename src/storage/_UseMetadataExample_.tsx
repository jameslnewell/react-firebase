/* eslint-disable */
import React from 'react';
import {useMetadata} from '../../src/storage';

export function UseMetadataExample() {
  const [metadata, {error}] = useMetadata('file.jpg');
  return (
    <>
      {error && String(error)}
      <code>
        <pre>{metadata && JSON.stringify(metadata, null, 2)}</pre>
      </code>
    </>
  );
}
