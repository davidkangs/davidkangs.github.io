import { env } from 'cloudflare:workers';
import {baseItems} from './camp';
export function getDB(){const db=(env as unknown as {DB:D1Database}).DB;if(!db)throw new Error('Database unavailable');return db;}
export async function ensureBaseItems(db:D1Database){const now=new Date().toISOString();await db.batch(baseItems.map(([name,note],i)=>db.prepare('INSERT OR IGNORE INTO shopping (id,name,quantity,note,status,position,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(`base-${i}`,name,'',note,'need',i,now)));}
