import {writeFile} from 'node:fs/promises';
const base = new URL('../assets/', import.meta.url);
const n=220,m=16,tau=Math.PI*2;
const norm = a => {const l=Math.hypot(...a);return a.map(x=>x/l)};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const center=t=>[(1+.39*Math.cos(3*t))*Math.cos(2*t),(1+.39*Math.cos(3*t))*Math.sin(2*t),.39*Math.sin(3*t)];
const rotate=([x,y,z])=>{let a=-.7,b=.45;const y1=y*Math.cos(a)-z*Math.sin(a),z1=y*Math.sin(a)+z*Math.cos(a);return [x*Math.cos(b)+z1*Math.sin(b),y1,-x*Math.sin(b)+z1*Math.cos(b)]};
function vertex(t,a){const c=center(t),d=center(t+.001),v=norm(d.map((x,i)=>x-c[i]));const u=norm(cross(v,[0,0,1])),w=cross(v,u);const normal=u.map((x,i)=>Math.cos(a)*x+Math.sin(a)*w[i]);return {p:rotate(c.map((x,i)=>x+.17*normal[i])),normal:rotate(normal)};}
const faces=[];
for(let i=0;i<n;i++)for(let j=0;j<m;j++){
  const t=i/n*tau,a=j/m*tau;
  const verts=[vertex(t,a),vertex(t+tau/n,a),vertex(t+tau/n,a+tau/m),vertex(t,a+tau/m)];
  const normal=vertex(t+tau/n/2,a+tau/m/2).normal;
  const light=Math.max(0,normal[0]*-.35+normal[1]*-.65+normal[2]*.68);
  const shine=Math.pow(light,10);
  const color=[114,135,55].map((v,k)=>Math.min(255,Math.round(v+[94,103,85][k]*light+70*shine)));
  faces.push({z:verts.reduce((s,v)=>s+v.p[2],0)/4,d:verts.map((v,k)=>(k?'L':'M')+(320+v.p[0]*183).toFixed(2)+' '+(320+v.p[1]*183).toFixed(2)).join(' ')+'Z',color:`rgb(${color.join(',')})`});
}
faces.sort((a,b)=>a.z-b.z);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><title>A sculptural loop representing connected Python workflows</title>${faces.map(f=>`<path d="${f.d}" fill="${f.color}" stroke="${f.color}" stroke-width=".6"/>`).join('')}</svg>`;
await writeFile(new URL('python-loop.svg',base),svg);
await writeFile(new URL('social-cover.svg',base),`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#1d211d"/><text x="70" y="90" fill="#f4f1e9" font-family="Arial,sans-serif" font-size="30">DILEP KUMAR K / PYTHON DEVELOPER</text><text x="65" y="290" fill="#f4f1e9" font-family="Arial,sans-serif" font-size="120" letter-spacing="-7">Python, with</text><text x="65" y="445" fill="#dbf08a" font-family="Georgia,serif" font-style="italic" font-size="150" letter-spacing="-5">personality.</text><circle cx="1050" cy="390" r="65" fill="#f38c72"/><text x="70" y="565" fill="#b6bfaa" font-family="Arial,sans-serif" font-size="21">FastAPI · Django · React / Four independent applications.</text></svg>`);
console.log('Generated sculpture and social cover.');
