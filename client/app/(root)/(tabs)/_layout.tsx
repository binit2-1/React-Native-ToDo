import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaProvider>
      <>
        <Stack>
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen name="Progress" options={{ headerShown: false }} />
        </Stack>
      </>
    </SafeAreaProvider>
  );
};

export default Layout;
