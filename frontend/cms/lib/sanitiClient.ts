import { createClient } from "@sanity/client";

const client = createClient({
  projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-03-10",
  useCdn: true,
  token: import.meta.env.VITE_APP_SANITY_TOKEN,
});

export default client;
