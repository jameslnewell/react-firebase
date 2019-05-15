import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Provider} from '../../src/app';
import {useUrl} from '../../src/storage';
import {app} from '../utils/app';

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
