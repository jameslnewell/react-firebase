import React from 'react';
import {Story} from '@storybook/react';
import {Provider} from '../app';
import {app} from './firebase';

export function decorator(Story: Story): React.ReactNode {
  return (
    <Provider app={app}>
      <Story />
    </Provider>
  );
}
