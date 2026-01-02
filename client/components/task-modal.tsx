import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { MotiView, MotiText } from "moti";
import Octicons from "@expo/vector-icons/Octicons";
import { useColorScheme } from "nativewind";
import { THEME } from "@/lib/theme";
import { AnimatePresence } from "moti";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TODOS } from "@/constants/todo";
import { cn } from "@/lib/utils";

const TaskModal = ({
  todoId,
  onClose,
}: {
  todoId: string;
  onClose: () => void;
}) => {
  const { colorScheme } = useColorScheme();
  const foregroundColor =
    THEME[colorScheme === "dark" ? "dark" : "light"].foreground;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (todoId) {
      setIsVisible(true);
    }
  }, [todoId]);

  const handleClose = () => {
    setIsVisible(false);
    // Call onClose after animation completes
    setTimeout(() => {
      onClose();
    }, 300); // Adjust timing to match your animation duration
  };

  // Find the specific todo that matches todoId
  const todo = TODOS.find((t) => t.id === todoId);

  if (!todo) return null;

  return (
    <AnimatePresence>
    {todoId && isVisible && (    
        <MotiView
          key={todoId}
          from={{
            opacity: 1,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: 1000,
          }}
          exit={{
            opacity: 1,
            height: 0,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 90,
          }}
          className="flex bg-foreground h-3/4 w-full rounded-t-[40px] backdrop-filter backdrop-blur-"
        >
          <View className="flex flex-row justify-between w-full px-4 pt-4">
            <Button
              onPress={handleClose}
              className="flex h-16 w-16 bg-background rounded-full items-center justify-center"
            >
              <Feather name="chevron-down" size={24} color={foregroundColor} />
            </Button>
            <Button
              onPress={handleClose}
              className="flex h-16 w-16 bg-background rounded-full items-center justify-center"
            >
              <Octicons name="pencil" size={24} color={foregroundColor} />
            </Button>
          </View>
          {/* render the timing for the current todo */}
          {todo.from && todo.to && (
            <View className="flex flex-row justify-center items-center mx-auto my-0 bg-customPurple p-4 rounded-full">
              <Text className="text-lg font-google-sans-flex-24pt-semibold text-center text-foreground">
                {todo.from} - {todo.to}
              </Text>
            </View>
          )}
          {/* render the title and description for the current todo */}
          {todo.title && todo.description && (
            <View className="flex flex-col justify-center items-center px-4 pt-4">
              <Text className="text-2xl font-google-sans-flex-24pt-semibold text-center text-background">
                {todo.title}
              </Text>
              <Text className="text-sm font-google-sans-flex-9pt-regular text-center text-background mt-4">
                {todo.description}
              </Text>
            </View>
          )}

          {/* render assignees for the current todo */}
          {todo.assignees && todo.assignees.length > 0 && (
            <View className="flex flex-row justify-center items-center px-4 pt-4">
              {todo.assignees.slice(0, 3).map((assignee, index) => (
                <View
                  key={`${todo.id}-assignee-${index}`}
                  className={cn(
                    "rounded-full border-4 border-white",
                    index > 0 && "-ml-6"
                  )}
                  style={{ zIndex: todo.assignees!.length - index }}
                >
                  <Avatar className="h-16 w-16" alt={`Assignee ${index + 1}`}>
                    <AvatarImage source={{ uri: assignee }} />
                    <AvatarFallback>
                      <Text className="text-xs">U</Text>
                    </AvatarFallback>
                  </Avatar>
                </View>
              ))}
              {todo.assignees.length > 3 && (
                <View
                  key={`${todo.id}-assignee-count`}
                  className={cn(
                    "rounded-full border-4 border-white bg-customPurple items-center justify-center -ml-6",
                    "h-16 w-16"
                  )}
                  style={{ zIndex: 0 }}
                >
                  <Text className="text-white text-xs font-google-sans-flex-9pt-semibold">
                    +{todo.assignees.length - 3}
                  </Text>
                </View>
              )}
            </View>
          )}
          {/* render the plans for the current todo */}
          {todo.plans && todo.plans.length > 0 && (
            <View className="flex flex-col justify-center items-center px-4 pt-4">
              <Text className="text-5xl font-google-sans-flex-24pt-bold text-center text-background">
                Plans
              </Text>
              {todo.plans.map((plan, index) => (
                <View key={`${todo.id}-plan-${index}`} className="flex flex-col justify-center items-center px-4 pt-4">
                  <View className="flex flex-row justify-between items-center bg-neutral-200 w-full px-6 py-8 rounded-[40px]">
                    <Text className="text-xl font-google-sans-flex-24pt-semibold text-center text-background ">
                        {plan.title}
                    </Text>
                    <Text className="text-xl font-google-sans-flex-24pt-semibold text-center text-background">
                      {plan.from} - {plan.to}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
