import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills'

const banner = {
    banner() {
        return `/*! ${pkg.name} ${pkg.version} https://github.com/${pkg.repository.url} @license ${pkg.license} */`;
    }
}
const plugins = [typescript(), tslint(), commonjs(), json(), nodePolyfills(), nodeResolve(), banner];


const umd_out_base = { format: 'umd', exports: 'named' };

export default [{
    input: './lib/rules/senlinjimore/index.ts',
    output: [{
        ...umd_out_base,
        name: "senlinjimore",
        file: 'dist/senlinjimore/index.js',
    }, {
        ...umd_out_base,
        name: "senlinjimore",
        file: 'dist/senlinjimore/index.min.js',
        plugins: [terser()]
    }],
    plugins: plugins
}];