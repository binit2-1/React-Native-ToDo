import { Stack, router, useRootNavigationState } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { BackHandler } from "react-native";

const Layout = () => {
  const rootState = useRootNavigationState();

  useEffect(() => {
    const onBackPress = () => {
      const canGoBack = router.canGoBack();
      if (canGoBack) {
        router.back();
        return true;
      }
      // No more screens, exit app
      BackHandler.exitApp();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [rootState]);

  return (
    <SafeAreaProvider>
      <>
        <Stack screenOptions={{ gestureEnabled: true }}>
          <Stack.Screen name="Welcome" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} />
        </Stack>
      </>
    </SafeAreaProvider>
  );
};

export default Layout;
