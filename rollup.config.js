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

const coolPicBanner = {
    banner() {
        return `/*! ${pkg.name} ${pkg.version} https://github.com/${pkg.repository.url} @license ${pkg.license} */
eval(getCryptoJS());`;
    }
}
const plugins = [typescript(), tslint(), commonjs(), json(), nodePolyfills(), nodeResolve(), banner];

const coolPicPlugins = [typescript(), tslint(), commonjs(), json(), nodePolyfills(), nodeResolve(), coolPicBanner];


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
}, {
    input: './lib/rules/QuarkPic/index.ts',
    output: [{
        ...umd_out_base,
        name: "QuarkPic",
        file: 'dist/QuarkPic/index.js',
    }, {
        ...umd_out_base,
        name: "QuarkPic",
        file: 'dist/QuarkPic/index.min.js',
        plugins: [terser()]
    }],
    plugins: plugins
}, {
    input: './lib/rules/CoolPic/index.ts',
    output: [{
        ...umd_out_base,
        name: "CoolPic",
        file: 'dist/CoolPic/index.js',
    }, {
        ...umd_out_base,
        name: "CoolPic",
        file: 'dist/CoolPic/index.min.js',
        plugins: [terser()]
    }],
    plugins: coolPicPlugins
}];