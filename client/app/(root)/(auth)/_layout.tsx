import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView>
      <>
        <Stack>
          <Stack.Screen name="Welcome" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} />
        </Stack>
      </>
    </SafeAreaView>
  );
};

export default Layout;
