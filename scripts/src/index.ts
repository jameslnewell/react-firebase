import {createDirectories} from './createDirectories';
import {createBundles} from './createBundles';
import {createManifests} from './createManifests';
import {createTypings} from './createTypings';

(async () => {
  try {
    const cwd = '/Users/jamesnewell/code/@jameslnewell/react-firebase/package';
    await createDirectories(cwd);
    await Promise.all([
      createBundles(cwd),
      createManifests(cwd),
      createTypings(cwd),
    ]);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
})();
