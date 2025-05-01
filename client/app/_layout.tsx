import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Add your authentication logic here
  useEffect(() => {
    // Check authentication status
  }, []);

  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      {/* You can add conditional screens or redirects here if needed */}
    </Stack>
  );
}