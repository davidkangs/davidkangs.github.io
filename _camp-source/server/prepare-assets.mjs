import {cpSync} from 'node:fs';
cpSync('../web/public','./public',{recursive:true});
