import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./cms/schemaTypes";
import { structure } from "./cms/structure";

export default defineConfig({
  name: "default",
  title: "clean_floor",

  projectId: "4mt7knge",
  dataset: "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: { types: schemaTypes },
});
