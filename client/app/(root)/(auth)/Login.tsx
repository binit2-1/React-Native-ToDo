import { SignInForm } from '@/components/sign-in-form';
import { ScrollView, View } from 'react-native';

const Login = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="bg-background flex-1 items-center justify-center mp-72"
      keyboardDismissMode="interactive">
      <View className="w-full max-w-sm">
        <SignInForm />
      </View>
    </ScrollView>
  )
}

export default Login