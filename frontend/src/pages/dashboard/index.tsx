import { Box, Grid, List, Paper, Typography } from "@mui/material";
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

const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState<{
    product: IProductItem | null;
    open: boolean;
  }>({ product: null, open: false });
  const dispatch = useAppDispatch();
  const { user } = useSelector(userSelector);
  const { items: products, status: productsStatus } =
    useSelector(productsSelector);

  const handleOpen = (product: IProductItem | null) => {
    setOpen({ product, open: true });
  };
  const handleClose = () => setOpen({ product: null, open: false });

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
                  <List disablePadding sx={{ width: "100%" }}>
                    {productsStatus === Status.LOADING
                      ? [...new Array(6)].map((_, i) => (
                          <ProductSkeleton key={i} />
                        ))
                      : products.products.map((product) => (
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
        open={open.open}
        product={open.product}
      />
    </>
  );
};

export default Dashboard;
