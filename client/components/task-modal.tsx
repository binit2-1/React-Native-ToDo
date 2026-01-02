import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { MotiView, MotiText } from "moti";
import Octicons from "@expo/vector-icons/Octicons";
import { useColorScheme } from "nativewind";
import { THEME } from "@/lib/theme";
import { AnimatePresence } from "moti";

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

  return (
    <AnimatePresence>
      {todoId && isVisible && (
        <MotiView
          key={todoId} // Important: key helps AnimatePresence track the component
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
          className="flex bg-foreground h-3/4 w-full rounded-t-[40px]"
        >
          <View className="flex flex-row justify-between w-full px-4 pt-4">
            <Button
              onPress={handleClose}
              className="flex h-16 w-16 bg-background rounded-full items-center justify-center"
            >
              <Feather
                name="chevron-down"
                size={24}
                color={foregroundColor}
              />
            </Button>
            <Button
              onPress={handleClose}
              className="flex h-16 w-16 bg-background rounded-full items-center justify-center"
            >
              <Octicons name="pencil" size={24} color={foregroundColor} />
            </Button>
          </View>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;