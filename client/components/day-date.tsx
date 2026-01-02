import React from "react";
import { View, Text } from "react-native";
import { upcomingDays } from "@/lib/dayDate";

const DayDate = () => {
  return (
    <View className="flex flex-row w-full justify-between ">
      {upcomingDays.map((day) => {
        const isToday = !!day.isToday;
        return (
          <View key={day.id} className="flex flex-col items-center">
            <View
              className={`relative rounded-[700px] px-3 py-2 ${isToday ? 'bg-foreground' : 'bg-transparent'}`}
            >
              <Text
                className={`${isToday ? 'text-customPurple' : 'text-white'} font-google-sans-flex-9pt-medium text-sm text-center`}
              >
                {day.day}
              </Text>
              <Text
                className={`${isToday ? 'text-customPurple' : 'text-white'} font-google-sans-flex-9pt-regular text-2xl text-center mt-4`}
              >
                {day.date}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default DayDate;
