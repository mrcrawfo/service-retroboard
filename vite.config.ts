import viteReact from '@vitejs/plugin-react';
// import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig, loadEnv } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

dotenv.config();

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [TanStackRouterVite(), viteReact()],
        server: {
            port: parseInt(env.VITE_PORT) || 3000,
        },
        build: {
            manifest: true,
            rollupOptions: {
                external: ['src/schema.ts', 'src/server.ts'],
            },
        },
    };
});
