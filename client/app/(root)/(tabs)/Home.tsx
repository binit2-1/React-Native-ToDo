import { View, Text, ScrollView } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import DayDate from "@/components/day-date";
import TodoCapsule from "@/components/todo-capsule";
import TaskModal from "@/components/task-modal";
import AddTask from "@/components/add-task";

const Home = () => {
  const month: string = new Date().toLocaleString("default", { month: "long" });
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
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
            <AvatarImage source={{ uri: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png" }} />
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
      <ScrollView className="flex-1 w-full pt-4 px-2">
        <TodoCapsule onPress={(todoId) => {
          setSelectedTodoId(todoId);
        }} />
      </ScrollView>
      {selectedTodoId && <TaskModal todoId={selectedTodoId} onClose={() => setSelectedTodoId(null)} />}
      <AddTask isTaskModalOpen={!!selectedTodoId} />
    </View>
  );
};

export default Home;
