"use client";
import Image from "next/image";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Palette_Mosaic } from "next/font/google";

export default function Home() {
  const theme = useTheme();

  return (
    <main>
      <Box
        sx={{
          backgroundColor: theme.palette.background.secondary,
          mt: 4, // margin-top: 16px (default spacing unit is 8px)
          mx: 4, // margin-left and margin-right: 8px
          p: 4, // padding: 8px
          height: "50vh",
          borderRadius: 4,
          boxShadow: 1,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to My Kitchen Pantry App
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.background.secondary,
          mt: 4,
          mx: 4,
          p: 4,
          minHeight: "25vh",
          borderRadius: 4,
          boxShadow: 1,
        }}
      >
        <Grid
          container
          spacing={3}
          gap={4}
          sx={{
            mt: 0,
            mx: 0,
            p: 0,
            borderRadius: 4,
            flexGrow: 1,
            justifyItems: "center",
          }}
          direction="row"
        >
          <Grid item xs={10} sm={10} md={3}>
            <Box
              sx={{
                backgroundColor: theme.palette.secondary.main,
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Items
              </Typography>
              <Typography variant="body2">
                The count of total unique items in your pantry
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={10} sm={10} md={3}>
            <Box
              sx={{
                backgroundColor: theme.palette.secondary.main,
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Items
              </Typography>
              <Typography variant="body2">
                The count of total unique items in your pantry
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={10} sm={10} md={3}>
            <Box
              sx={{
                backgroundColor: theme.palette.secondary.main,
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Items
              </Typography>
              <Typography variant="body2">
                The count of total unique items in your pantry
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
