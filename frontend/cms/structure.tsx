import { CogIcon } from "@sanity/icons";
import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("products").title("Products"),
      S.divider(),
      S.listItem()
        .title("Config")
        .icon(CogIcon)
        .child(S.document().schemaType("config")),
    ]);
