import path from 'path';
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs-extra';

fs.removeSync(path.resolve(__dirname, './node_modules/.rts2_cache'));
fs.removeSync(path.resolve(__dirname, './dist'));

const tsPlugin = ts({
    check: true,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
        compilerOptions: {
            sourceMap: true,
            declaration: true,
            // declarationMap: true,
        },
        exclude: ['**/__test__'],
    },
});

const config = {
    input: path.resolve(__dirname, 'src/index.ts'),
    output: [
        {
            name: pkg.biuldOptions.name,
            file: pkg.main,
            format: 'umd',
            plugins: [terser()],
        },
        {
            file: pkg.module,
            format: 'es',
            plugins: [terser()],
        },
    ],

    plugins: [tsPlugin, nodeResolve(), commonjs()],
};

export default config;
