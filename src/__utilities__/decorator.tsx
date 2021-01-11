import React from 'react';
import {Story} from '@storybook/react';
import {AppProvider} from '../app';
import {app} from './firebase';

export function decorator(Story: Story): React.ReactNode {
  return (
    <AppProvider app={app}>
      <Story />
    </AppProvider>
  );
}
