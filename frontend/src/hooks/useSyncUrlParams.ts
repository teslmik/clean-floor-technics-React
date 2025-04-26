import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { filterSelector } from "@src/redux/filter/selectors";
import { updateUrlParams } from "@src/utils/urlParams";

export const useSyncUrlParams = () => {
  const location = useLocation();
  const { filterState, sortState } = useSelector(filterSelector);

  useEffect(() => {
    if (location.pathname === "/catalog") {
      updateUrlParams(filterState, sortState);
    }
  }, [location.pathname, filterState, sortState]);
};
