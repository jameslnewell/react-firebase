import * as path from 'path';
import * as ts from 'typescript';
import glob from 'fast-glob';
import {bundles} from './utils/bundles';

const compile = (fileNames: string[], options: ts.CompilerOptions) => {
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let {line, character} = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!,
      );
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character +
          1}): ${message}`,
      );
    } else {
      console.log(
        `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`,
      );
    }
  });

  if (emitResult.emitSkipped) {
    throw new Error('Type errors!');
  }
};

export const createTypings = async (cwd: string) => {
  await Promise.all(
    bundles.map(async bundle => {
      const buildDirectory = path.resolve(cwd, bundle);
      // list the files we want to compile
      const files = await glob<string>(
        [`src/${bundle}/**/*.{ts,tsx}`, 'typings/**/*.d.ts'],
        {
          cwd,
          ignore: ['**/*.tests.{ts,tsx}', '**/*.stories.tsx'],
        },
      );
      compile(files.map(f => path.resolve(cwd, f)), {
        strict: true,
        noEmitOnError: true,
        noImplicitAny: true,
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS,
        declaration: true,
        emitDeclarationOnly: true,
        jsx: ts.JsxEmit.React,
        outDir: buildDirectory,
      });
    }),
  );
};
