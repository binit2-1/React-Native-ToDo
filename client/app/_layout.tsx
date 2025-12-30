import './globals.css'
import { Stack } from 'expo-router';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <PortalHost />
      </>
    </SafeAreaProvider>
  );
}
