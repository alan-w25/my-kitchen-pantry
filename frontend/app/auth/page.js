"use client";

import React from "react";
import Box from "@mui/material/Box";
import AuthForm from "../../components/AuthForm";
import Header from "@/components/Header";

const AuthPage = () => {
  return (
    <main>
      <Header />
      <Box>
        <AuthForm />
      </Box>
    </main>
  );
};

export default AuthPage;
