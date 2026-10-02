const API_URL = import.meta.env.DEV ? '/api/camp' : 'https://ai-team-autumn-2026.ksw3037.chatgpt.site/api/camp';
const sessionKey = 'ai-team-autumn-2026:session';
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
function sessionId(){
  let id=localStorage.getItem(sessionKey);
  if(!id || !uuid.test(id)){id=crypto.randomUUID();localStorage.setItem(sessionKey,id);}
  return id;
}
export function campFetch(init:RequestInit={}){
  const headers=new Headers(init.headers);
  headers.set('X-Camp-Session',sessionId());
  return fetch(API_URL,{...init,headers,credentials:'omit',cache:'no-store'});
}
