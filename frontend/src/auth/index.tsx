import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button, Typography, Container } from "@mui/material";
import { loginValidate } from "../constants/auth-validation";
import { CircleLoader } from "../components";
import { ROUTER_KEYS } from "../constants/app-keys";

import styles from "./auth.module.scss";

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  // const {
  //   mutate: login,
  //   isLoading: loginLoading,
  //   isSuccess: loginSuccess,
  // } = useLoginUser();
  // const {
  //   mutate: registration,
  //   isLoading: registerLoading,
  //   isSuccess: registerSuccess,
  // } = useRegisterUser();

  const handleFormSubmit = (
    values: {
      confirmPassword: string;
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formValues = { email: values.email, password: values.password };
    // login(formValues);

    setSubmitting(false);
  };

  const { values, handleChange, errors, handleSubmit, isValid, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validateOnBlur: false,
      validate: loginValidate,
      onSubmit: handleFormSubmit,
    });

  // React.useEffect(() => {
  //   if (loginSuccess) {
  //     navigate(ROUTER_KEYS.ROOT);
  //   }
  // }, [loginSuccess, registerSuccess, navigate]);

  // if (loginLoading || registerLoading || loginSuccess || registerSuccess) {
  //   return <CircleLoader />;
  // }

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
