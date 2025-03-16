/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TOKEN_TG: string;
  readonly VITE_APP_CHAT_ID: string;
  readonly VITE_APP_FETCH_URL: string;
  readonly VITE_APP_SANITY_PROJECT_ID: string;
  readonly VITE_PUBLIC_SANITY_DATASET: string;
  readonly VITE_SANITY_STUDIO_URL: string;
  readonly VITE_SANITY_API_READ_TOKEN: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
