import {act, renderHook} from '@testing-library/react-hooks';
import {wrapper} from '../__tests__/wrapper';
import {app} from '../__tests__/firebase';
import {useUpdateDocument} from './useUpdateDocument';

describe('firestore', () => {
  describe('useUpdateDocument()', () => {
    test('updates a document', async () => {
      const collection = 'users';
      const document = {name: 'Johnny Applesmith'};
      const ref = await app.firestore().collection(collection).add(document);
      const {result} = renderHook(() => useUpdateDocument(), {wrapper});
      await act(async () => {
        await result.current[0](`users/${ref.id}`, document);
        const data = await app
          .firestore()
          .collection(collection)
          .doc(ref.id)
          .get();
        expect(data.data()).toEqual(document);
      });
    });
  });
});
