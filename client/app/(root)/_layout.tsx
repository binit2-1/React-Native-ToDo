import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView>
      <>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </>
    </SafeAreaView>
  );
};

export default Layout;
