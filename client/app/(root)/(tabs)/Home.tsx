import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import DayDate from "@/components/day-date";
import TodoCapsule from "@/components/todo-capsule";

const Home = () => {
  const month: string = new Date().toLocaleString("default", { month: "long" });

  return (
    <View className="flex-1 bg-background">
      {/* Fixed header */}
      <View className="flex flex-col h-[316px] w-full bg-customPurple rounded-b-[40px] pt-12 px-8">
        {/* Header Section */}
        <View className="flex flex-row justify-between w-full ">
          <Text className="font-google-sans-flex-9pt-regular text-xl text-white">
            Hi Binit👋!
          </Text>
          <Avatar alt="Zach Nugent's Avatar">
            <AvatarImage source={{ uri: "https://github.com/mrzachnugent.png" }} />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
        </View>

        {/* Month Section */}
        <View className="flex flex-row w-full pt-8">
          <Text className="font-google-sans-flex-24pt-semibold text-3xl text-white">
            {month}
          </Text>
        </View>

        {/* Days and Date (fixed) */}
        <View className="flex w-full pt-12">
          <DayDate />
        </View>
      </View>

      {/* Scrollable content below fixed header */}
      <ScrollView className="flex-1 w-full pt-2 px-2">
        <TodoCapsule onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

export default Home;
