import { createClient } from "@sanity/client";

const client = createClient({
  projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2025-03-10",
  useCdn: true,
});

export default client;
