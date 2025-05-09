import { exec } from 'node:child_process';
import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import swc, { type JscConfig } from '@swc/core';
import type { JscTarget, Output } from '@swc/types';
import type { PluginBuild } from 'esbuild';
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';
import { glob } from 'glob';
import { defineConfig } from 'tsup';
import tsConfig from './tsconfig.json';

const pexec = promisify(exec);

export default defineConfig({
  shims: true,
  clean: true,
  config: true,
  bundle: true,
  sourcemap: true,
  platform: 'browser',
  external: ['react', 'react-dom'],
  format: ['cjs', 'esm'],
  tsconfig: 'tsconfig.json',
  entry: ['src/**/*{.ts,.tsx}'],
  minify: process.env.NODE_ENV === 'production',
  onSuccess: async () => {
    try {
      await pexec('tsc --emitDeclarationOnly --declaration && tsc-alias');
      const files = await glob('dist/**/*.d.ts');
      await Promise.all(
        files.map((file) => copyFile(file, file.replace('.d.ts', '.d.mts'))),
      );
    } catch (err) {
      console.error();
      console.error('Typescript compilation error:');
      console.error();
      console.error(err.stdout);
      throw err;
    }
  },
  esbuildPlugins: [
    preserveDirectivesPlugin({
      directives: ['use client', 'use server', 'use strict'],
      include: /\.tsx?$/,
      exclude: /node_modules/,
    }),
  ],
  plugins: [
    {
      name: 'override-swc',
      esbuildOptions: (esbuildOptions) => {
        const plugin = esbuildOptions.plugins?.find((p) => p.name === 'swc');
        if (plugin) {
          plugin.setup = (build: PluginBuild) => {
            build.initialOptions.keepNames =
              build.initialOptions.keepNames !== undefined
                ? build.initialOptions.keepNames
                : true;

            build.onLoad(
              { filter: /\.[jt]sx?$/ },
              async (args: { path: string }) => {
                const isTs = /\.tsx?$/.test(args.path);

                const jsc: JscConfig = {
                  parser: {
                    syntax: isTs ? 'typescript' : 'ecmascript',
                    decorators: true,
                  },
                  transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                  },
                  baseUrl: path.resolve(
                    __dirname,
                    tsConfig.compilerOptions.baseUrl || '.',
                  ),
                  paths: tsConfig.compilerOptions.paths,
                  keepClassNames: true,
                  target: (
                    ('target' in tsConfig.compilerOptions
                      ? tsConfig.compilerOptions.target
                      : 'es2022') as string
                  ).toLowerCase() as JscTarget,
                };

                const result: Output = await swc.transformFile(args.path, {
                  jsc,
                  sourceMaps: true,
                  configFile: false,
                  swcrc: false,
                });

                let code = result.code;
                if (result.map) {
                  const map: { sources: string[] } = JSON.parse(result.map);
                  map.sources = map.sources.map((source) => {
                    return path.isAbsolute(source)
                      ? path.relative(path.dirname(args.path), source)
                      : source;
                  });
                  code += `//# sourceMappingURL=data:application/json;base64,${Buffer.from(
                    JSON.stringify(map),
                  ).toString('base64')}`;
                }
                return {
                  contents: code,
                };
              },
            );
          };
        }
      },
    },
  ],
});
