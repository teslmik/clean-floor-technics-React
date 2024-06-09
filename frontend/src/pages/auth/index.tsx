import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CircleLoader } from "../../components";
import { ROUTER_KEYS, STORAGE_KEYS } from "../../constants/app-keys";
import { loginValidate } from "../../constants/auth-validation";
import { useAppDispatch } from "../../redux/store";
import { fetchUser } from "../../redux/user/asyncActions";
import { userSelector } from "../../redux/user/selectors";
import { Status } from "../../redux/user/types";

import styles from "./auth.module.scss";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status } = useSelector(userSelector);

  const handleFormSubmit = async (
    values: {
      confirmPassword: string;
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formValues = { email: values.email, password: values.password };
    const { data } = await axios.post<{ token: string }>(
      `${import.meta.env.VITE_APP_FETCH_URL}/login`,
      formValues
    );
    dispatch(fetchUser(data.token));

    if (data) localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);

    setSubmitting(false);
  };

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    isValid,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: false,
    validate: loginValidate,
    onSubmit: handleFormSubmit,
  });

  React.useEffect(() => {
    if (user && user?.role === "admin") navigate(`/${ROUTER_KEYS.DASHBOARD}`);
  }, [navigate, user]);

  if (status === Status.LOADING || isSubmitting) {
    return <CircleLoader />;
  }

  return (
    <Container className={styles.container}>
      <Typography className={styles.title} variant="h2">
        Clean Floor Technics Dashboard
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Typography align="center" variant="h5">
          Login
        </Typography>
        <TextField
          error={!!errors.email && !touched.email}
          helperText={!touched.email && errors.email}
          fullWidth
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
        />
        <TextField
          error={!!errors.password && !touched.password}
          helperText={!touched.password && errors.password}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isValid}
          className={styles.button}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default AuthPage;
