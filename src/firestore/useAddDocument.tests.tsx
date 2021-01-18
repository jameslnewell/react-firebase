import {act, renderHook} from '@testing-library/react-hooks';
import {wrapper} from '../__tests__/wrapper';
import {useAddDocument} from './useAddDocument';

describe('firestore', () => {
  describe('useAddDocument()', () => {
    test('creates a document', async () => {
      const collection = 'users';
      const document = {name: 'Johnny Applesmith'};
      const {result} = renderHook(() => useAddDocument(), {wrapper});
      await act(async () => {
        const ref = await result.current[0](collection, document);
        const data = await ref.get();
        expect(data.data()).toEqual(document);
      });
    });
  });
});
