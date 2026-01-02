import './globals.css'
import { Stack } from 'expo-router';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useFonts } from 'expo-font';


export default function RootLayout() {
  const [loaded] = useFonts({
    // 9pt
    'GoogleSansFlex_9pt-Black': require('../assets/fonts/GoogleSansFlex_9pt-Black.ttf'),
    'GoogleSansFlex_9pt-Bold': require('../assets/fonts/GoogleSansFlex_9pt-Bold.ttf'),
    'GoogleSansFlex_9pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_9pt-ExtraBold.ttf'),
    'GoogleSansFlex_9pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_9pt-ExtraLight.ttf'),
    'GoogleSansFlex_9pt-Light': require('../assets/fonts/GoogleSansFlex_9pt-Light.ttf'),
    'GoogleSansFlex_9pt-Medium': require('../assets/fonts/GoogleSansFlex_9pt-Medium.ttf'),
    'GoogleSansFlex_9pt-Regular': require('../assets/fonts/GoogleSansFlex_9pt-Regular.ttf'),
    'GoogleSansFlex_9pt-SemiBold': require('../assets/fonts/GoogleSansFlex_9pt-SemiBold.ttf'),
    'GoogleSansFlex_9pt-Thin': require('../assets/fonts/GoogleSansFlex_9pt-Thin.ttf'),

    // 24pt
    'GoogleSansFlex_24pt-Black': require('../assets/fonts/GoogleSansFlex_24pt-Black.ttf'),
    'GoogleSansFlex_24pt-Bold': require('../assets/fonts/GoogleSansFlex_24pt-Bold.ttf'),
    'GoogleSansFlex_24pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_24pt-ExtraBold.ttf'),
    'GoogleSansFlex_24pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_24pt-ExtraLight.ttf'),
    'GoogleSansFlex_24pt-Light': require('../assets/fonts/GoogleSansFlex_24pt-Light.ttf'),
    'GoogleSansFlex_24pt-Medium': require('../assets/fonts/GoogleSansFlex_24pt-Medium.ttf'),
    'GoogleSansFlex_24pt-Regular': require('../assets/fonts/GoogleSansFlex_24pt-Regular.ttf'),
    'GoogleSansFlex_24pt-SemiBold': require('../assets/fonts/GoogleSansFlex_24pt-SemiBold.ttf'),
    'GoogleSansFlex_24pt-Thin': require('../assets/fonts/GoogleSansFlex_24pt-Thin.ttf'),

    // 36pt
    'GoogleSansFlex_36pt-Black': require('../assets/fonts/GoogleSansFlex_36pt-Black.ttf'),
    'GoogleSansFlex_36pt-Bold': require('../assets/fonts/GoogleSansFlex_36pt-Bold.ttf'),
    'GoogleSansFlex_36pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_36pt-ExtraBold.ttf'),
    'GoogleSansFlex_36pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_36pt-ExtraLight.ttf'),
    'GoogleSansFlex_36pt-Light': require('../assets/fonts/GoogleSansFlex_36pt-Light.ttf'),
    'GoogleSansFlex_36pt-Medium': require('../assets/fonts/GoogleSansFlex_36pt-Medium.ttf'),
    'GoogleSansFlex_36pt-Regular': require('../assets/fonts/GoogleSansFlex_36pt-Regular.ttf'),
    'GoogleSansFlex_36pt-SemiBold': require('../assets/fonts/GoogleSansFlex_36pt-SemiBold.ttf'),
    'GoogleSansFlex_36pt-Thin': require('../assets/fonts/GoogleSansFlex_36pt-Thin.ttf'),

    // 72pt
    'GoogleSansFlex_72pt-Black': require('../assets/fonts/GoogleSansFlex_72pt-Black.ttf'),
    'GoogleSansFlex_72pt-Bold': require('../assets/fonts/GoogleSansFlex_72pt-Bold.ttf'),
    'GoogleSansFlex_72pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_72pt-ExtraBold.ttf'),
    'GoogleSansFlex_72pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_72pt-ExtraLight.ttf'),
    'GoogleSansFlex_72pt-Light': require('../assets/fonts/GoogleSansFlex_72pt-Light.ttf'),
    'GoogleSansFlex_72pt-Medium': require('../assets/fonts/GoogleSansFlex_72pt-Medium.ttf'),
    'GoogleSansFlex_72pt-Regular': require('../assets/fonts/GoogleSansFlex_72pt-Regular.ttf'),
    'GoogleSansFlex_72pt-SemiBold': require('../assets/fonts/GoogleSansFlex_72pt-SemiBold.ttf'),
    'GoogleSansFlex_72pt-Thin': require('../assets/fonts/GoogleSansFlex_72pt-Thin.ttf'),
  });
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <View className='flex-1'>
        <Stack screenOptions={{ gestureEnabled: true }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{headerShown: false}}/>
        </Stack>
        <PortalHost />
      </View>
    </SafeAreaProvider>
  );
}
