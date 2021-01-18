import {renderHook} from '@testing-library/react-hooks';
import {useApp} from '.';
import {app} from '../__tests__/firebase';
import {wrapper} from '../__tests__/wrapper';

describe('app', () => {
  describe('useApp()', () => {
    test('throws an error when not wrapped with a provider', () => {
      const {result} = renderHook(() => useApp());
      expect(String(result.error)).toContain('<Provider app={app}/>');
    });

    test('returns the app when wrapped with a provider', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: wrapper,
      });
      expect(result.current).toEqual(app);
    });
  });
});
