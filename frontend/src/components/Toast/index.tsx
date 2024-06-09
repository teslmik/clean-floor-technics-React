import { Alert, Snackbar } from "@mui/material";
import React from "react";

type Properties = {
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  message: string;
  type: "success" | "info" | "warning" | "error";
};

export const Toast: React.FC<Properties> = ({
  open,
  handleClose,
  message,
  type,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
