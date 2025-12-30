import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaProvider>
      <>
        <Stack>
          <Stack.Screen name="Welcome" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} />
        </Stack>
      </>
    </SafeAreaProvider>
  );
};

export default Layout;
