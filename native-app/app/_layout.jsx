import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AuthProvider from "../context/AuthProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "../services/i18n";
import "./index.css";

const RootLayout = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("An error occurred:", error);
    }
  }, [error]);
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default RootLayout;
