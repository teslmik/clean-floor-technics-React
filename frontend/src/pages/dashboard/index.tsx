import {
  Container,
  Toolbar,
  AppBar,
  Avatar,
  Box,
  Tooltip,
  Zoom,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";

import { userSelector } from "../../redux/user/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/products/asyncActions";
import { productsSelector } from "../../redux/products/selectors";
import { euroToHrivna } from "../../utils";

import styles from "./dashboard.module.scss";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(userSelector);
  const { items: products, status: productsStatus } =
    useSelector(productsSelector);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <Box sx={{ maxHeight: "100vh", maxWidth: "100vw" }}>
      <AppBar color="transparent" position="static">
        <Container sx={{ width: "100%" }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className={styles.logo}>
                <img src="/assets/img/logo/logo-transparent.png" alt="logo" />
              </div>
              <Tooltip
                placement="left"
                TransitionComponent={Zoom}
                arrow
                title={
                  user && (
                    <>
                      <p>{`email: ${user?.email}`}</p>
                      <p>{`role: ${user?.role}`}</p>
                    </>
                  )
                }
              >
                <Avatar>{user?.name[0]?.toUpperCase()}</Avatar>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          flexGrow: 0,
          marginTop: "1rem",
          maxWdth: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography textAlign={"center"} variant="h1" fontSize={60}>
          Dashboard
        </Typography>
        <Grid container spacing={4} sx={{ padding: 2 }}>
          <Grid item xs={6} padding={0}>
            <Paper
              sx={{
                padding: 2,
                paddingRight: 0,
                maxHeight: "calc(100vh - 182px)",
                overflowY: "auto",
              }}
            >
              <Grid container spacing={4} sx={{ padding: 2, paddingRight: 0 }}>
                <List disablePadding sx={{ width: "100%" }}>
                  {products.map((product) => (
                    <Grid key={product._id} item xs={12} padding={0}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              variant="rounded"
                              sx={{ backgroundColor: "transparent" }}
                            >
                              <img
                                src={`assets/img/products/${product.imageUrl}.png`}
                                alt="product img"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.title}
                            secondary={`Price-€: ${
                              product.price
                            }€ | Price-uah: ${euroToHrivna(
                              product.price
                            ).toLocaleString()}₴`}
                          />
                        </ListItemButton>
                        <ListItemIcon>
                          <Tooltip
                            placement="right"
                            TransitionComponent={Zoom}
                            arrow
                            title="Edit"
                          >
                            <IconButton sx={{ width: 40, height: 40 }}>
                              <EditIcon color="success" />
                            </IconButton>
                          </Tooltip>
                        </ListItemIcon>
                      </ListItem>
                    </Grid>
                  ))}
                </List>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={4} sx={{ padding: 2 }}></Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
