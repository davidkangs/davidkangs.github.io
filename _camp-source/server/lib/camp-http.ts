const pagesOrigin = 'https://davidkangs.github.io';
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export function campSession(req: Request) {
  const external = req.headers.get('origin') === pagesOrigin;
  if (external) return {id: req.headers.get('x-camp-session')!, cookie: undefined};
  const raw = req.headers.get('cookie')?.match(/(?:^|;\s*)camp_session=([a-f0-9-]{36})(?:;|$)/)?.[1];
  const id = raw && uuid.test(raw) ? raw : crypto.randomUUID();
  return {id, cookie: id === raw ? undefined : `camp_session=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${new URL(req.url).protocol === 'https:' ? '; Secure' : ''}`};
}

export async function withCampAccess(req: Request, handler: () => Promise<Response>) {
  const origin = req.headers.get('origin');
  const allowed = origin === pagesOrigin || origin === new URL(req.url).origin;
  const crossSite = req.headers.get('sec-fetch-site') === 'cross-site';
  const headers = new Headers({'Cache-Control': 'no-store', Vary: 'Origin'});
  if (origin && allowed) headers.set('Access-Control-Allow-Origin', origin);
  const error = (message: string, status: number) => {
    const h = new Headers(headers); h.set('Content-Type', 'application/json');
    return new Response(JSON.stringify({error: message}), {status, headers: h});
  };
  if ((origin && !allowed) || (!origin && crossSite)) return error('접근할 수 없습니다.', 403);
  if (req.method === 'OPTIONS') {
    if (!origin || !allowed) return error('접근할 수 없습니다.', 403);
    const method = req.headers.get('access-control-request-method');
    const requested = (req.headers.get('access-control-request-headers') || '').toLowerCase().split(',').map(x => x.trim()).filter(Boolean);
    if (!['GET', 'POST'].includes(method || '') || requested.some(x => !['content-type', 'x-camp-session'].includes(x))) return error('허용되지 않은 요청입니다.', 403);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Camp-Session');
    headers.set('Access-Control-Max-Age', '600');
    return new Response(null, {status: 204, headers});
  }
  if (origin === pagesOrigin && !uuid.test(req.headers.get('x-camp-session') || '')) return error('브라우저의 저장 기능을 허용한 뒤 다시 시도해 주세요.', 400);
  if (req.method === 'POST' && req.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return error('입력 형식을 확인해 주세요.', 415);
  const response = await handler();
  const merged = new Headers(response.headers);
  headers.forEach((value, key) => merged.set(key, value));
  return new Response(response.body, {status: response.status, headers: merged});
}
