/* eslint-disable */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {Provider} from '../app';
import {useUrl} from '../storage';
import {app} from '../__utilities__/firebase';

export const UseUrlExample: React.FC = () => {
  const [url, {error}] = useUrl('file.jpg');
  return (
    <>
      {error && String(error)}
      {url && <img src={url} style={{maxWidth: '100%'}} />}
    </>
  );
};

storiesOf('Storage', module).add('URL', () => (
  <Provider app={app}>
    <UseUrlExample />
  </Provider>
));
