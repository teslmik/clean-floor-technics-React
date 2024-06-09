import {
  Avatar,
  Box,
  Chip,
  FormControlLabel,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Checkbox,
  Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import React from "react";
import { green } from "@mui/material/colors";

import { editValidate } from "../../constants/edit-validation";
import { editProduct } from "../../redux/products/asyncActions";
import { IProductItem } from "../../redux/products/types";
import { useAppDispatch } from "../../redux/store";
import { euroToHrivna, filterList } from "../../utils";
import { labelKeys } from "../../constants/label-keys";

import styles from "./dashboard.module.scss";

type Properties = {
  open: boolean;
  handleClose: () => void;
  product: IProductItem | null;
};

const EditModal: React.FC<Properties> = ({ handleClose, open, product }) => {
  const dispatch = useAppDispatch();

  const onSubmit = (
    values: {
      price: number;
      availability: boolean;
      _promo: boolean;
      _new: boolean;
      _popular: boolean;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (product) {
      const id = product._id;
      const payload = {
        price: values.price,
        availability: values.availability,
        label: {
          _promo: values._promo,
          _new: values._new,
          _popular: values._popular,
        },
      };
      setTimeout(() => {
        dispatch(editProduct({ payload, id }));
        handleClose();
        setSubmitting(false);
      }, 500);
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      price: product?.price || 0,
      availability: product?.availability || false,
      _promo: product?.label._promo || false,
      _new: product?.label._new || false,
      _popular: product?.label._popular || false,
    },
    validateOnBlur: false,
    validate: editValidate,
    onSubmit,
  });

  const disabled =
    !isValid ||
    isSubmitting ||
    (values.price === product?.price &&
      values.availability === product?.availability &&
      product.label._new === values._new &&
      product.label._popular === values._popular &&
      product.label._promo === values._promo);

  React.useEffect(() => {
    if (product) {
      setFieldValue("price", product.price);
      setFieldValue("availability", product.availability);
      setFieldValue("_new", product.label._new);
      setFieldValue("_promo", product.label._promo);
      setFieldValue("_popular", product.label._popular);
    }
  }, [product]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.editModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Редагувати продукт
        </Typography>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <Stack direction="row" alignItems="center">
            <Avatar variant="rounded" sx={{ backgroundColor: "transparent" }}>
              <img
                src={`assets/img/products/${product?.imageUrl}.png`}
                alt="product img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Avatar>
            <Typography variant="subtitle1" sx={{ my: 2 }}>
              {product?.title}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <TextField
              id="price-label"
              label="Ціна-€uro"
              value={values.price}
              name="price"
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <Chip
              size="medium"
              label={`${euroToHrivna(
                values.price as number
              ).toLocaleString()} ₴`}
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={values.availability}
                  onChange={handleChange}
                  name="availability"
                  color="success"
                />
              }
              label="У наявності"
              labelPlacement="start"
            />
          </Stack>
          <Divider />
          <Stack
            direction="row"
            gap={0}
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {labelKeys.map((key) => (
              <FormControlLabel
                style={{ marginRight: 0 }}
                key={key.name}
                control={
                  <Checkbox
                    name={key.name}
                    color={key.color}
                    size="medium"
                    checked={values[key.name]}
                    onChange={handleChange}
                  />
                }
                label={
                  <Chip
                    label={
                      filterList.find((list) => list.name === key.name)?.value
                    }
                    color={key.color}
                    size="small"
                  />
                }
              />
            ))}
          </Stack>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={{ mt: 4, p: 3 }}
            disabled={disabled}
          >
            {!isSubmitting ? (
              <Stack direction="row" gap={1}>
                <SaveIcon />
                <Typography>Зберігти</Typography>
              </Stack>
            ) : (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
