import { Edit as EditIcon } from "@mui/icons-material";
import {
  Avatar,
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

import { IProductItem } from "../../redux/products/types";
import { euroToHrivna } from "../../utils";
import { ROUTER_KEYS } from "../../constants/app-keys";

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
            secondary={
              <Stack direction="column">
                <Typography variant="caption">
                  {`Price-€: ${product.price}€ | Price-uah: ${euroToHrivna(
                    product.price
                  ).toLocaleString()}₴`}
                </Typography>
                <Typography
                  variant="caption"
                  color={product.availability ? "green" : "error"}
                >
                  {`У наявності: ${product.availability ? "Так" : "Ні"}`}
                </Typography>
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
