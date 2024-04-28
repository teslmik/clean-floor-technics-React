import { Box, Grid, List, Paper, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { fetchProducts } from "../../redux/products/asyncActions";
import { productsSelector } from "../../redux/products/selectors";
import { IProductItem, Status } from "../../redux/products/types";
import { useAppDispatch } from "../../redux/store";
import { userSelector } from "../../redux/user/selectors";
import DashboardHeader from "./DashboardHeader";
import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";
import EditModal from "./EditModal";
import { fetchUser } from "../../redux/user/asyncActions";
import { STORAGE_KEYS } from "../../constants/app-keys";
import { Toast } from "../../components";
import { tabsMap } from "../../constants/tabs-map";

type TabKey = keyof (typeof tabsMap)[number];

const Dashboard: React.FC = () => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [open, setOpen] = React.useState<{
    product: IProductItem | null;
    open: boolean;
  }>({ product: null, open: false });
  const [tab, setTab] = React.useState<TabKey>("all");

  const dispatch = useAppDispatch();
  const { user } = useSelector(userSelector);
  const { items: products, status: productsStatus } =
    useSelector(productsSelector);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleOpen = (product: IProductItem | null) => {
    setOpen({ product, open: true });
  };
  const handleClose = () => setOpen({ product: null, open: false });
  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabKey) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    if (!user) {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      dispatch(fetchUser(token));
    }
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <Box sx={{ maxHeight: "100vh", maxWidth: "100vw" }}>
        <DashboardHeader user={user} />
        <Box
          sx={{
            flexGrow: 0,
            marginTop: "1rem",
            maxWdth: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography textAlign={"center"} variant="h1" fontSize={40}>
            Dashboard
          </Typography>
          <Grid container spacing={4} sx={{ padding: 2 }}>
            <Grid item xs={12} padding={0}>
              <Paper
                sx={{
                  padding: 2,
                  paddingRight: 0,
                  maxHeight: "calc(100vh - 182px)",
                  overflowY: "auto",
                }}
              >
                <Grid
                  container
                  spacing={4}
                  sx={{ padding: 2, paddingRight: 0 }}
                >
                  <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    {tabsMap.map((item, i) => {
                      const [value, label] = Object.entries(item)[0];
                      return <Tab key={i} label={label} value={value} />;
                    })}
                  </Tabs>
                  <List disablePadding sx={{ width: "100%" }}>
                    {productsStatus === Status.LOADING
                      ? [...new Array(6)].map((_, i) => (
                          <ProductSkeleton key={i} />
                        ))
                      : products.products
                          .toSorted((a, b) => {
                            if (a.availability === b.availability) {
                              return b.rating - a.rating;
                            }
                            return a.availability ? -1 : 1;
                          })
                          .filter((product) =>
                            tab === "all" ? product : product.category === tab
                          )
                          .map((product) => (
                            <ProductItem
                              key={product._id}
                              product={product}
                              handleOpen={() => handleOpen(product)}
                            />
                          ))}
                  </List>
                </Grid>
                <Grid
                  container
                  spacing={4}
                  sx={{ padding: 2, paddingRight: 0 }}
                >
                  <List disablePadding sx={{ width: "100%" }}></List>
                </Grid>
              </Paper>
            </Grid>
            {/* <Grid item xs={6}>
              <Grid container spacing={4} sx={{ padding: 2 }}></Grid>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
      <EditModal
        handleClose={handleClose}
        showAlert={handleClick}
        open={open.open}
        product={open.product}
        setMessage={setAlertMessage}
      />
      <Toast
        open={openAlert}
        type={productsStatus === Status.ERROR ? "error" : alertType}
        handleClose={handleCloseAlert}
        message={productsStatus === Status.ERROR ? "Error" : alertMessage}
      />
    </>
  );
};

export default Dashboard;
