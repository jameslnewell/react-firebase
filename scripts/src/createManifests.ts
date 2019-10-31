import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import {bundles} from './utils/bundles';

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

export const createManifests = async (cwd: string): Promise<void> => {
  await Promise.all(
    bundles.map(async bundle => {
      const buildDirectory = path.resolve(cwd, bundle);
      await mkdir(buildDirectory, {recursive: true});
      await writeFile(
        `${buildDirectory}/package.json`,
        JSON.stringify(
          {
            name: `@jameslnewell/react-firebase/${bundle}`,
            private: true,
            main: 'index.js',
            module: 'index.esm.js',
            typings: 'index.d.ts',
            sideEffects: false,
          },
          null,
          2,
        ),
      );
    }),
  );
};
