import { Save as SaveIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useFormik } from "formik";
import React from "react";

import { editValidate } from "../../constants/edit-validation";
import { labelKeys } from "../../constants/label-keys";
import { ISanityProduct } from "../../redux/products/types";
import { useAppDispatch } from "../../redux/store";
import { euroToHrivna, filterList } from "../../utils";

import styles from "./dashboard.module.scss";

type Properties = {
  open: boolean;
  handleClose: () => void;
  product: ISanityProduct | null;
  showAlert: () => void;
  setMessage: (s: string) => void;
};

const EditModal: React.FC<Properties> = ({
  handleClose,
  showAlert,
  setMessage,
  open,
  product,
}) => {
  const dispatch = useAppDispatch();
  const [oldPrice, setOldPrice] = React.useState(false);

  const productInstallments =
    typeof product?.installments === "boolean" ? product.installments : true;

  const onSubmit = (
    values: {
      price: number;
      oldPrice: number | null;
      availability: boolean;
      promo: boolean;
      new: boolean;
      popular: boolean;
      installments: boolean;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (product) {
      const id = product._id;
      const payload = {
        price: values.price,
        oldPrice: values.oldPrice,
        availability: values.availability,
        label: {
          promo: values.promo,
          new: values.new,
          popular: values.popular,
        },
        installments: values.installments,
      };
      setTimeout(() => {
        // dispatch(editProduct({ payload, id }));
        handleClose();
        setSubmitting(false);
        setMessage("Product successfully saved!");
        showAlert();
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
      oldPrice: product?.oldPrice || null,
      availability: product?.availability || false,
      promo: product?.label.promo || false,
      new: product?.label.new || false,
      popular: product?.label.popular || false,
      installments: productInstallments,
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
      product.label.new === values.new &&
      product.label.popular === values.popular &&
      product.label.promo === values.promo &&
      product.oldPrice === values.oldPrice &&
      product.installments === values.installments);

  const handleChangeOldPrice = () => {
    setOldPrice(!oldPrice);
    setFieldValue("oldPrice", oldPrice ? null : euroToHrivna(product?.price!));
  };

  React.useEffect(() => {
    if (product) {
      setFieldValue("price", product.price);
      setFieldValue("oldPrice", product.oldPrice);
      setFieldValue("availability", product.availability);
      setFieldValue("new", product.label.new);
      setFieldValue("promo", product.label.promo);
      setFieldValue("popular", product.label.popular);
      setOldPrice(product.oldPrice !== null);
      setFieldValue("installments", productInstallments);
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
              label={`${euroToHrivna(+values.price).toLocaleString()} ₴`}
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2} height={40}>
            {oldPrice && (
              <TextField
                id="oldPrice-label"
                label="Стара ціна-грн."
                value={values.oldPrice}
                name="oldPrice"
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={oldPrice}
                  onChange={handleChangeOldPrice}
                  color="success"
                />
              }
              label="Стара ціна"
              labelPlacement="start"
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
          <Stack direction="row" alignItems="center" gap={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={values.installments}
                  onChange={handleChange}
                  name="installments"
                  color="success"
                />
              }
              label="Оформлення розстрочки"
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
