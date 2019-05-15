import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import {dependencies, peerDependencies} from './package.json';

const externals = [
  '../app',
  'firebase/app',
  'firebase/auth',
  'firebase/firestore',
  'firebase/storage',
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
];

const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'];

export default ['app', 'auth', 'firestore', 'storage'].map(name => ({
  input: `src/${name}/index.ts`,
  output: [
    {
      file: `${name}/index.js`,
      format: 'cjs',
    },
    {
      file: `${name}/index.mjs`,
      format: 'esm',
    },
  ],
  external: externals,
  plugins: [
    babel({
      extensions,
    }),
    resolve({
      extensions,
    }),
  ],
}));
