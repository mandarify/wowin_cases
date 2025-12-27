import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   base: '/wowin_cases/',
   plugins: [react()],
});
