import { Edit as EditIcon } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTER_KEYS } from "../../constants/app-keys";
import { labelKeys } from "../../constants/label-keys";
import { IProductItem } from "../../redux/products/types";
import { euroToHrivna, filterList } from "../../utils";

type Properties = {
  product: IProductItem;
  handleOpen: () => void;
};

const ProductItem: React.FC<Properties> = ({ product, handleOpen }) => {
  const navigate = useNavigate();

  const handleClickItem = () => {
    navigate(`/${ROUTER_KEYS.PRODUCTS}/${product.category}/${product._id}`);
  };
  return (
    <Grid key={product._id} item xs={12} padding={0}>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickItem}>
          <ListItemAvatar>
            <Avatar variant="rounded" sx={{ backgroundColor: "transparent" }}>
              <img
                src={`assets/img/products/${product.imageUrl}.webp`}
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
            secondary={
              <Stack direction="column">
                <Stack direction="row" columnGap={1} flexWrap="wrap">
                  <Typography variant="caption">
                    {`Price-€: ${product.price}€`}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    {`Price-uah: ${euroToHrivna(
                      product.price
                    ).toLocaleString()}₴`}
                  </Typography>
                  {product.oldPrice && (
                    <>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="caption">
                        {`Old price-uah: ${product.oldPrice}₴`}
                      </Typography>
                    </>
                  )}
                </Stack>
                <Typography
                  variant="caption"
                  color={product.availability ? "green" : "error"}
                >
                  {`У наявності: ${product.availability ? "Так" : "Ні"}`}
                </Typography>
                <Stack direction="row" gap={0.5}>
                  {labelKeys.map(
                    (key) =>
                      product.label[key.name] === true && (
                        <Chip
                          key={key.name}
                          label={
                            filterList.find((list) => list.name === key.name)
                              ?.value
                          }
                          color={key.color}
                          size="small"
                        />
                      )
                  )}
                  {product.oldPrice && (
                    <Chip
                      label={`-
                        ${Math.round(
                          (100 *
                            (Number(product.oldPrice) -
                              euroToHrivna(product.price))) /
                            Number(product.oldPrice)
                        )}
                        %`}
                      color="secondary"
                      size="small"
                    />
                  )}
                </Stack>
              </Stack>
            }
          />
        </ListItemButton>
        <ListItemIcon>
          <Tooltip
            placement="right"
            TransitionComponent={Zoom}
            arrow
            title="Edit"
          >
            <IconButton sx={{ width: 40, height: 40 }} onClick={handleOpen}>
              <EditIcon color="success" />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
      </ListItem>
    </Grid>
  );
};

export default ProductItem;
