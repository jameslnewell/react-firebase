/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {renderHook} from '@testing-library/react-hooks';
import {UseCollectionStatus, useCollection} from '.';
import {wrapper} from '../__tests__/wrapper';
import {app} from '../__tests__/firebase';

describe('useCollection()', () => {
  afterEach(() => {
    app.firestore().terminate();
  });
  test.skip('returned a collection snapshot after mounting', async () => {
    // render the hook
    const {result, waitForNextUpdate} = renderHook(
      () => useCollection('users'),
      {wrapper},
    );

    // expect we're waiting for data
    expect(result.current).toEqual([
      undefined,
      {
        status: UseCollectionStatus.Waiting,
        isWaiting: true,
        isReceived: false,
        isCompleted: false,
        isErrored: false,
      },
    ]);

    // wait until the state has updated
    await waitForNextUpdate();

    // expect we've received data
    expect(result.current).toEqual([
      expect.any(Object),
      {
        status: UseCollectionStatus.Receieved,
        isWaiting: false,
        isReceived: true,
        isCompleted: false,
        isErrored: false,
      },
    ]);

    // expect the database to return some results
    const [snapshot] = result.current;
    expect(snapshot && snapshot.empty).not.toBeTruthy();
    expect(Array.isArray(snapshot && snapshot.docs)).toBeTruthy();
  });
});
