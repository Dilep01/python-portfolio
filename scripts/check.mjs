import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Script} from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../');
const html=await readFile(resolve(root,'index.html'),'utf8');
const css=await readFile(resolve(root,'styles.css'),'utf8');
const js=await readFile(resolve(root,'app.js'),'utf8');
new Script(js);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,'IDs must be unique');
for(const [,ref] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
 if(ref.startsWith('#')) assert.ok(ids.includes(ref.slice(1)),`Missing anchor ${ref}`);
 else if(ref.startsWith('./')) await access(resolve(root,ref));
}
for(const [,ref] of css.matchAll(/url\(['"]?(\.\/[^)'"\s]+)/g))await access(resolve(root,ref));
const projectKeys=[...html.matchAll(/data-project="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(projectKeys).size,4);
for(const key of new Set(projectKeys))assert.match(js,new RegExp(key+': \\{'));
assert.match(html,/prefers-reduced-motion|motion-toggle/);
assert.match(css,/prefers-reduced-motion/);
assert.match(html,/<dialog[^>]*aria-labelledby="dialog-title"/);
assert.match(html,/Independent portfolio applications/);
assert.match(js,/does not use an LLM/);
console.log('PASS: script syntax, local assets, unique IDs, anchors, four case studies, evidence boundaries, dialog labeling, and reduced motion.');
