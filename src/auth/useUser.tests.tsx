import {useUser, UseUserStatus} from '.';
import {renderHook} from '@testing-library/react-hooks';
import {wrapper} from '../__tests__/wrapper';

describe('auth', () => {
  describe('useUser()', () => {
    test('returns undefined when first mounted', () => {
      const {result} = renderHook(() => useUser(), {wrapper});
      expect(result.current).toEqual([
        undefined,
        {
          isAuthenticated: false,
          isAuthenticating: true,
          isErrored: false,
          isUnauthenticated: false,
          status: UseUserStatus.Authenticating,
        },
      ]);
    });
  });
});
