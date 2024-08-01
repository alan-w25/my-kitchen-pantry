"use client";
import Image from "next/image";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useAuth } from "../hooks/AuthProvider";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Home() {
  const theme = useTheme();
  const { currentUser } = useAuth();

  const [numCategories, setNumCategories] = useState(0);
  const [numUniqueItems, setNumUniqueItems] = useState(0);
  const [numTotalItems, setNumTotalItems] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({
    labels: [],
    data: [],
  });

  const fetchData = async () => {
    try {
      const categoryCollection = currentUser
        ? collection(db, "users", currentUser.uid, "categories")
        : collection(db, "categories");
      const itemCollection = currentUser
        ? collection(db, "users", currentUser.uid, "items")
        : collection(db, "items");

      const categorySnapshot = await getDocs(categoryCollection);
      const categoryData = categorySnapshot.docs.map((doc) => doc.data());
      setNumCategories(categoryData.length);

      const itemsSnapshot = await getDocs(itemCollection);
      const itemsData = itemsSnapshot.docs
        .map((doc) => doc.data())
        .filter((item) => item.itemName !== "initialItem");
      setNumUniqueItems(itemsData.length);
      const totalItems = itemsData.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
      setNumTotalItems(totalItems);
      processCategoryData(itemsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const processCategoryData = (itemsData) => {
    const categoryMap = itemsData.reduce((acc, item) => {
      const category = item.category || "Unknown";
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += item.quantity || 1; // Use quantity if available
      return acc;
    }, {});

    // Prepare data for the bar chart
    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    setCategoryCounts({ labels, data });
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  return (
    <main>
      <Box
        sx={{
          backgroundColor: theme.palette.background.secondary,
          mt: 4, // margin-top: 16px (default spacing unit is 8px)
          mx: 4, // margin-left and margin-right: 8px
          p: 4, // padding: 8px
          height: "70vh",
          borderRadius: 4,
          boxShadow: 1,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to{" "}
          {currentUser ? `${currentUser.displayName}'s Pantry` : " Pantry"}
        </Typography>

        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: categoryCounts.labels,
              scaleType: "band",
              label: "Categories",
            },
          ]}
          series={[
            {
              data: categoryCounts.data,
            },
          ]}
          yAxis={[
            {
              label: "Number of Items", // Custom label for the y-axis
            },
          ]}
          colors={[theme.palette.chart.two]}
          sx={{
            width: "25%",
            height: "25%",
            mb: 8,
            mt: 2,
          }}
        />
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
          mb: 6,
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
              <Typography variant="h5">{numTotalItems}</Typography>
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
                Total Unique Items
              </Typography>
              <Typography variant="h5">{numUniqueItems}</Typography>
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
                Total Categories
              </Typography>
              <Typography variant="h5">{numCategories}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
