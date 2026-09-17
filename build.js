import { cp, mkdir, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

await promisify(execFile)(process.execPath, ['--check', 'src/main.js']);
await rm('dist',{recursive:true,force:true}); await mkdir('dist');
await cp('index.html','dist/index.html'); await cp('src','dist/src',{recursive:true});
console.log('Static site built in dist/');
