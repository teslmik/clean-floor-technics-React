import {
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

const ProductSkeleton: React.FC = () => {
  return (
    <Grid item xs={12} padding={0}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component="div" variant="h4">
                <Skeleton />
              </Typography>
            }
            secondary={
              <Typography component="div" variant="body1">
                <Skeleton />
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </Grid>
  );
};

export default ProductSkeleton;
