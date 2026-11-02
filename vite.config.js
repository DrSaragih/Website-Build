import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({build:{rollupOptions:{input:Object.fromEntries(['index','mall','directory','whats-next','shopping-program'].map(name=>[name,resolve(process.cwd(),`${name}.html`)]))}}});
