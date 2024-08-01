"use client";

import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { forwardRef } from "react";

const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    background: {
      default: "#F7EFE4",
      secondary: "#F5E6D6",
      tertiary: "#E1DBC5",
    },
    primary: {
      main: "#AC4D14",
    },
    secondary: {
      main: "#D9DFDD",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F7EFE4", // Set the background color here
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h6: {
      fontFamily: poppins.style.fontFamily,
    },
    subtitle1: {
      fontFamily: poppins.style.fontFamily,
    },
    button: {
      fontFamily: poppins.style.fontFamily,
    },
  },
});

export default theme;
