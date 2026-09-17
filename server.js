import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'};
createServer(async(req,res)=>{try{let path=join(process.cwd(),decodeURI(req.url.split('?')[0]));if((await stat(path)).isDirectory())path=join(path,'index.html');res.setHeader('Content-Type',types[extname(path)]||'application/octet-stream');res.end(await readFile(path))}catch{res.statusCode=404;res.end('Not found')}}).listen(4173,()=>console.log('NOVA running at http://localhost:4173'));
