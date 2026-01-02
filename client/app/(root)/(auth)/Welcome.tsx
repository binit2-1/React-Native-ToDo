import React, { useRef, useState } from "react";
import { View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components/ui/button";
import { Text } from "../../../components/ui/text";
import { router } from "expo-router";
import Swiper from 'react-native-swiper';
import {onboarding} from '../../../constants/index'

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <SafeAreaView className="flex h-full w-full items-center justify-between bg-background">
      <Swiper ref={swiperRef} loop={false}
       dot={<View className="bg-muted/50 mx-1 h-2 w-2 rounded-full" />}
       activeDot={<View className="bg-foreground mx-1 h-2 w-2 rounded-full" />}
       onIndexChanged={(index)=>{
        setActiveIndex(index)
       }}>
        {onboarding.map((item)=>(
          <View key={item.id} className="flex justify-between items-center">
            <Text className="font-google-sans-flex-9pt-medium">{item.title}</Text>
          </View>
        ))}
      </Swiper>
      <View className="flex flex-row gap-4">
        <Button onPress={() => {
          router.replace("/Register")
        }} 
        className="font-google-sans-flex-9pt-medium bg-foreground items-center">
          <Text className="font-google-sans-flex-9pt-medium">
            Skip
          </Text>
        </Button>
        <Button onPress={() => {
          router.replace("/Register")
        }} 
        className="font-google-sans-flex-9pt-medium bg-foreground items-center">
          <Text className="font-google-sans-flex-9pt-medium">
            Next
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
