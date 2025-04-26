import { sortList } from "@src/constants/sort-list";
import { SortPropertyEnum, SortTypeState } from "@src/redux/filter/types";

export const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const filters = params.get("filters")?.split(",") || [];
  const sort = params.get("sort");

  let sortState: SortTypeState = {
    name: "по популярності",
    sortProperty: SortPropertyEnum.RATING,
  };

  if (sort) {
    const property = sort as SortPropertyEnum;
    if (Object.values(SortPropertyEnum).includes(property)) {
      const sortItem = sortList.find(
        (item: { name: string; sortProperty: SortPropertyEnum }) =>
          item.sortProperty === property,
      );
      sortState = {
        name: sortItem?.name || "по популярності",
        sortProperty: property,
      };
    }
  }

  return { filters, sortState };
};

export const updateUrlParams = (filters: string[], sort: SortTypeState) => {
  const params = new URLSearchParams();

  if (filters.length > 0) {
    params.set("filters", filters.join(","));
  }

  if (sort.sortProperty !== SortPropertyEnum.RATING) {
    params.set("sort", sort.sortProperty);
  }

  const newUrl = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
  window.history.pushState({}, "", newUrl);
};
