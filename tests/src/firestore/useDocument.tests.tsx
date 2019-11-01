/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {renderHook} from '@testing-library/react-hooks';
import {
  useDocument,
  UseDocumentStatus,
} from '@jameslnewell/react-firebase/firestore';
import {wrapper} from '../wrapper';
import {app} from '../app';

describe('useDocument()', () => {
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
    expect(result.current[0]!.exists).not.toBeTruthy();
    expect(result.current[0]!.data()).toBeUndefined();
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
    expect(result.current[0]!.exists).toBeTruthy();
    expect(result.current[0]!.data()).not.toBeUndefined();
  });
});
