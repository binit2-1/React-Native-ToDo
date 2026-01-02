import { ScrollView, View, Text } from 'react-native'
import { SignUpForm } from '@/components/sign-up-form'

const Register = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="bg-background flex-1 items-center justify-center mp-72"
      keyboardDismissMode="interactive">
      <View className="w-full max-w-sm">
        <SignUpForm />
      </View>
    </ScrollView>
  )
}

export default Register