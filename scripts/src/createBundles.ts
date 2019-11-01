import path from 'path';
import {rollup} from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {bundles} from './utils/bundles';

function createRollupOptions(cwd: string, bundle: string): {} {
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

  // exclude dependencies which may be imported like `uuid` or `uuid/v4`
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(path.resolve(cwd, 'package.json'));
  const regexp = [
    '@jameslnewell/react-firebase/app',
    '@jameslnewell/react-firebase/auth',
    '@jameslnewell/react-firebase/firestore',
    '@jameslnewell/react-firebase/storage',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ].map(dep => new RegExp(`^${dep}($|/)`));
  const external = (id: string): boolean =>
    regexp.some(regexp => regexp.test(id));

  return {
    input: path.resolve(cwd, `src/${bundle}/index.ts`),
    external,
    plugins: [
      resolve({extensions}),
      commonjs({
        include: /node_modules/,
        // 😢@see https://github.com/reduxjs/react-redux/issues/643#issuecomment-364064645
        // 😢@see https://github.com/styled-components/styled-components/issues/1654
        namedExports: {
          '../node_modules/react/index.js': [
            'Component',
            'cloneElement',
            'createContext',
            'createElement',
            'Fragment',
            'useContext',
            'useMemo',
            'useState',
            'useReducer',
            'useEffect',
            'useRef',
          ],
          '../node_modules/react-dom/index.js': ['render', 'hydrate'],
          '../node_modules/react-is/index.js': [
            'isElement',
            'isValidElementType',
            'ForwardRef',
          ],
        },
      }),
      babel({
        extensions,
      }),
    ],
  };
}

export const createBundles = async (cwd: string): Promise<void> => {
  await Promise.all(
    bundles.map(async bundle => {
      const result = await rollup(createRollupOptions(cwd, bundle));
      await Promise.all([
        await result.write({
          file: path.resolve(cwd, `${bundle}/index.js`),
          format: 'cjs',
          sourcemap: true,
        }),
        await result.write({
          file: path.resolve(cwd, `${bundle}/index.esm.js`),
          format: 'es',
          sourcemap: true,
        }),
      ]);
    }),
  );
};
