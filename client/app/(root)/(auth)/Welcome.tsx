import React from "react";
import { View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components/ui/button";
import { Text } from "../../../components/ui/text";

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center bg-black">
        <Button>
          <Text className="font-google-sans-flex-9pt-medium">
            Welcome
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
