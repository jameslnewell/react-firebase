/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {renderHook} from '@testing-library/react-hooks';
import {useDocument, UseDocumentStatus} from '.';
import {wrapper} from '../__tests__/wrapper';
import {app} from '../__tests__/firebase';

describe.skip('useDocument()', () => {
  afterEach(async () => {
    await app.firestore().terminate();
  });

  test('returned a non-existant document snapshot after mounting', async () => {
    // render the hook
    const {result, waitForNextUpdate} = renderHook(
      () => useDocument('users/does-not-exist'),
      {wrapper},
    );

    // expect we're waiting for data
    expect(result.current).toEqual([
      undefined,
      {
        status: UseDocumentStatus.Waiting,
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
        status: UseDocumentStatus.Receieved,
        isWaiting: false,
        isReceived: true,
        isCompleted: false,
        isErrored: false,
      },
    ]);

    // expect the database to return some results
    const [snapshot] = result.current;
    expect(snapshot && snapshot.exists).not.toBeTruthy();
    expect(snapshot && snapshot.data()).toBeUndefined();
  });

  test('returned a document snapshot after mounting', async () => {
    // render the hook
    const {result, waitForNextUpdate} = renderHook(
      () => useDocument('users/DgzaP4btqMqB4fK29YQk'),
      {wrapper},
    );

    // expect we're waiting for data
    expect(result.current).toEqual([
      undefined,
      {
        status: UseDocumentStatus.Waiting,
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
        status: UseDocumentStatus.Receieved,
        isWaiting: false,
        isReceived: true,
        isCompleted: false,
        isErrored: false,
      },
    ]);

    // expect the database to return some results
    const [snapshot] = result.current;
    expect(snapshot && snapshot.exists).toBeTruthy();
    expect(snapshot && snapshot.data()).not.toBeUndefined();
  });
});
