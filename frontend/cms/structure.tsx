import { CogIcon } from "@sanity/icons";
import { StructureResolver } from "sanity/structure";

import { UpdateRateButton } from "./components/UpdateRate";

export const structure: StructureResolver = (S) =>
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
      S.divider(),
      S.listItem()
        .title("Update Monobank Euro Rate")
        .icon(() => <span>💰</span>)
        .child(
          S.component()
            .component(() => <UpdateRateButton />)
            .title("Update Monobank Euro Rate"),
        ),
    ]);
