import viteReact from '@vitejs/plugin-react';
// import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig, loadEnv } from 'vite';
// import { TanStackRouterVite } from '@tanstack/router-plugin/dist/cjs/vite.cjs'

dotenv.config();

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            // TanStackRouterVite(),
            viteReact(),
        ],
        server: {
            port: parseInt(env.VITE_PORT) || 5172,
        },
        build: {
            manifest: true,
            rollupOptions: {
                external: ['src/schema.ts', 'src/server.ts'],
            },
        },
    };
});
