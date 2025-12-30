import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Welcome = () => {
  return (
    <SafeAreaProvider className='flex justify-center items-center bg-black h-screen w-screen'>
      <Text className='flex justify-center text-white text-center h-screen w-screen bg-black'>Welcome</Text>
    </SafeAreaProvider>
  )
}

export default Welcome