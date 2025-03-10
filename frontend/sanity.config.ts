import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./cms/schemaTypes";

export default defineConfig({
  name: "default",
  title: "clean_floor",

  projectId: "4mt7knge",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
