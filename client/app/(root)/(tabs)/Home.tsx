import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { ScrollView } from "react-native";
import DayDate from "@/components/day-date";

const Home = () => {
  const month: string = new Date().toLocaleString('default', { month: 'long' });


  return (
    <ScrollView className="flex h-full w-full bg-background">
      <View className="flex flex-col h-[316px] w-full bg-customPurple rounded-b-[40px] pt-12 px-8">
        {/* Header Section */}
        <View className="flex flex-row justify-between w-full ">
          <Text className="font-google-sans-flex-9pt-regular text-xl text-white">
            Hi Binit👋!
          </Text>
          <Avatar alt="Zach Nugent's Avatar">
            <AvatarImage
              source={{ uri: "https://github.com/mrzachnugent.png" }}
            />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
        </View>
        {/* Month Section */}
        <View className="flex flex-row w-full pt-12">
          <Text className="font-google-sans-flex-9pt-regular text-3xl text-white">
              {month}
          </Text>
        </View>
        {/*Days and Date*/}
        <View className="flex w-full">
          <DayDate />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
