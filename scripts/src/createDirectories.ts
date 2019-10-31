import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import {bundles} from './utils/bundles';

const mkdir = util.promisify(fs.mkdir);

export const createDirectories = async (cwd: string): Promise<void> => {
  await Promise.all(
    bundles.map(async bundle => {
      const buildDirectory = path.resolve(cwd, bundle);
      await mkdir(buildDirectory, {recursive: true});
    }),
  );
};
