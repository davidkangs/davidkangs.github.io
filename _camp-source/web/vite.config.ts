import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath,URL} from 'node:url';
export default defineConfig({base:'/ai-team-autumn/',plugins:[react()],server:{host:'127.0.0.1',port:5174,strictPort:true,proxy:{'/api':{target:'http://127.0.0.1:5173',changeOrigin:true,headers:{Origin:'https://davidkangs.github.io'}}}},resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},build:{outDir:'../../ai-team-autumn',emptyOutDir:true}});
