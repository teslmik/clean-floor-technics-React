import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Euro } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";

import { UserType } from "../../redux/user/types";
import { ratesSelector } from "../../redux/rates/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchRates } from "../../redux/rates/asyncActions";

import styles from "./dashboard.module.scss";
import { Status } from "../../redux/rates/types";

const DashboardHeader: React.FC<{ user: UserType | null }> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { items: ratesItems, status } = useSelector(ratesSelector);

  React.useEffect(() => {
    dispatch(fetchRates());
  }, []);
  return (
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
            {status === Status.SUCCESS && (
              <Typography color="info">
                {ratesItems.bankEuro?.rateSell?.toString()}
              </Typography>
            )}
            {user && (
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
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DashboardHeader;
