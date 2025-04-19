import { CheckCircle, Edit as EditIcon, Euro } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { editRate, fetchRates } from "@src/redux/rates/asyncActions";
import { ratesSelector } from "@src/redux/rates/selectors";
import { IRatesItem, Status } from "@src/redux/rates/types";
import { useAppDispatch } from "@src/redux/store";
import { UserType } from "@src/redux/user/types";
import styles from "./dashboard.module.scss";

const DashboardHeader: React.FC<{ user: UserType | null }> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [currency, setCurrency] = React.useState<IRatesItem>();
  const [onEditCurrency, setOnEditCurrency] = React.useState(false);
  const { items: ratesItems, status } = useSelector(ratesSelector);

  const handleUndisableInput = () => setOnEditCurrency(true);
  const handleEditRate = () => {
    setOnEditCurrency(false);
    if (currency) {
      const confirmed = window.confirm(
        "Якщо змінити поточний курс, то зміняться всі ціни на товарах. Ви впевнені, що хочете внести зміни?",
      );
      if (confirmed) {
        dispatch(editRate(currency));
        currency?.value &&
          localStorage.setItem("currentEuro", currency.value.toString());
      }
    }
  };

  React.useEffect(() => {
    if (status === Status.IDLE) dispatch(fetchRates());
    if (ratesItems.rates.length > 0) {
      const rateEuro = ratesItems.rates.find((rate) => rate.currency === "eu");
      setCurrency(rateEuro);
      rateEuro?.value &&
        localStorage.setItem("currentEuro", rateEuro.value.toString());
    }
  }, [ratesItems, status]);
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
              py: 1,
            }}
          >
            <Link to="/" className={styles.logo}>
              <img src="/assets/img/logo/logo-transparent.png" alt="logo" />
            </Link>
            {/* {currency && ( */}
            <Stack direction="row" alignItems="center" gap={2}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <FormControl variant="standard" sx={{ maxWidth: "112px" }}>
                  <InputLabel htmlFor="standard-basic" size="small">
                    Встановлений курс
                  </InputLabel>
                  <Input
                    id="standard-basic"
                    value={
                      currency?.value || localStorage.getItem("currentEuro")
                    }
                    onChange={(e) =>
                      setCurrency({
                        currency: "eu",
                        value: e.target.value,
                      })
                    }
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">€</InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={
                            onEditCurrency
                              ? handleEditRate
                              : handleUndisableInput
                          }
                          edge="end"
                          size="small"
                        >
                          {onEditCurrency ? (
                            <CheckCircle color="success" />
                          ) : (
                            <EditIcon color="success" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    disabled={!onEditCurrency}
                  />
                </FormControl>
              </Stack>
              <Stack direction="column" alignItems="center" gap={0.5}>
                <Chip
                  color="info"
                  label={
                    <Stack direction="row" gap={1}>
                      <Typography>
                        {ratesItems.bankEuro?.rateSell
                          ? ratesItems.bankEuro.rateSell.toFixed(2)
                          : ratesItems.bankEuro?.error || "empty"}
                      </Typography>
                      <Euro />
                    </Stack>
                  }
                />
                <Typography variant="subtitle2" fontSize={12}>
                  Курс € МОНОБАНК
                </Typography>
              </Stack>
            </Stack>
            {/* )} */}
            {user && (
              <Tooltip
                placement="left"
                TransitionComponent={Zoom}
                arrow
                sx={{ display: { sm: "flex", xs: "none" } }}
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
