import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Login = () => {
  return (
    <SafeAreaProvider>
      <Text>Login</Text>
    </SafeAreaProvider>
  )
}

export default Login