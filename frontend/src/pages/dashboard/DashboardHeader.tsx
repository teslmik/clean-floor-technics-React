import {
  AppBar,
  Avatar,
  Box,
  Container,
  Toolbar,
  Tooltip,
  Zoom,
} from "@mui/material";
import React from "react";

import { UserType } from "../../redux/user/types";

import styles from "./dashboard.module.scss";

const DashboardHeader: React.FC<{ user: UserType | null }> = ({ user }) => {
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
