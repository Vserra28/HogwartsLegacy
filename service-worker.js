const CACHE_NAME = "hogwarts-checklist-v55";
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => {e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()));});
self.addEventListener("activate", e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("hogwarts-checklist-")&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch", e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return; if(e.request.mode==="navigate"){e.respondWith(fetch(e.request,{cache:"no-store"}).then(async r=>{if(r.ok){const c=await caches.open(CACHE_NAME);await c.put("./index.html",r.clone());}return r;}).catch(()=>caches.match("./index.html")));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
