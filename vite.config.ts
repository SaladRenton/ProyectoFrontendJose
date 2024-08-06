import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {


  
  // Cargar las variables de entorno basadas en el modo
  const env = loadEnv(mode, process.cwd());

  const modeAppEnv = env.VITE_APP_ENV;

  // Verificar que las variables de entorno se cargan
  console.log(`Building for ${modeAppEnv}`);
  console.log(env);

  // Configurar la carpeta de salida según el modo
  let buildDir = 'dist';
  if (modeAppEnv === 'staging') {
    buildDir = 'dist-staging';
  } else if (modeAppEnv === 'production') {
    buildDir = 'dist-production';
  }

  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: buildDir,
      chunkSizeWarningLimit: 3000,
    },
  };
});
