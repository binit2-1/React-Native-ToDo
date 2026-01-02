import React, { useRef, useState } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import Swiper from 'react-native-swiper';
import {onboarding} from '@/constants/index'

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <SafeAreaView className="flex flex-col h-full w-full items-center justify-between bg-background">
      <Button variant="ghost" size="icon" className="flex pt-4 justify-end pr-4 w-full" onPress={() => router.replace("/Register")}>
        <Text className="font-google-sans-flex-9pt-medium text-foreground">Skip</Text>
      </Button>
      <View className="flex flex-1 w-full h-[500px] pt-40">
      <Swiper ref={swiperRef} loop={false}
       dot={<View className="bg-muted/50 mx-1 h-2 w-2 rounded-full" />}
       activeDot={<View className="bg-foreground mx-1 h-2 w-2 rounded-full" />}
       onIndexChanged={(index)=>{
        setActiveIndex(index)
       }}>
        {onboarding.map((item)=>(
          <View key={item.id} className="flex justify-between items-center">
            <Image source={item.image} className="w-72 h-64" resizeMode="contain"/>
            <Text className="font-google-sans-flex-24pt-extrabold text-3xl mt-8">{item.title}</Text>
            <Text className="font-google-sans-flex-9pt-regular w-72 text-center mt-8 text-neutral-400">{item.desc}</Text>
          </View>
        ))}
      </Swiper>
      </View>
      <View className="flex flex-row mb-56 gap-4">
        <Button onPress={() => {
          setActiveIndex((prev) => {
            const newIndex = prev - 1;
            swiperRef.current?.scrollBy(-1);
            return newIndex < 0 ? 0 : newIndex;
          });
        }} 
        className="font-google-sans-flex-9pt-medium bg-foreground items-center">
          <Text className="font-google-sans-flex-9pt-medium">
            Back
          </Text>
        </Button>
        <Button onPress={() => {
          if(activeIndex === onboarding.length - 1){
            router.replace("/Register")
            return;
          }
          setActiveIndex((prev) => {
            const newIndex = prev + 1;
            swiperRef.current?.scrollBy(1);
            return newIndex > onboarding.length - 1 ? onboarding.length - 1 : newIndex;
          });
        }} 
        className="font-google-sans-flex-9pt-medium bg-foreground items-center">
          <Text className="font-google-sans-flex-9pt-medium">
            {activeIndex === onboarding.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
