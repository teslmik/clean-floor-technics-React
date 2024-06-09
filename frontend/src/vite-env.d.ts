/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_FETCH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
