import { View, Text, Pressable } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiPressable } from "moti/interactions";
import { AnimatePresence, MotiView } from "moti";
import { Portal } from '@rn-primitives/portal';

interface AddTaskProps {
  isTaskModalOpen?: boolean;
}

const AddTask = ({ isTaskModalOpen = false }: AddTaskProps) => {
  const [rotate, setRotate] = useState<boolean>(false);

  // Close add-task modal when task modal opens
  useEffect(() => {
    if (isTaskModalOpen && rotate) {
      setRotate(false);
    }
  }, [isTaskModalOpen]);

  return (
    <>
      {/* Render button in portal so it can have controlled z-index */}
      <Portal name="add-task-button-portal">
        <View
          className="absolute bottom-16 w-full flex items-center"
          style={{ zIndex: isTaskModalOpen ? 10 : 60 }}
          pointerEvents={isTaskModalOpen ? "none" : "box-none"}
        >
          <MotiPressable
            onPressIn={() => {
              if (!isTaskModalOpen && !rotate) {
                setRotate(true);
              } else if (!isTaskModalOpen && rotate) {
                setRotate(false);
              }
            }}
            animate={useMemo(
              () => ({
                rotate: rotate ? "45deg" : "0deg",
              }),
              [rotate]
            )}
            transition={useMemo(() => ({ type: "timing", duration: 150 }), [])}
            style={{ backgroundColor: "#6961ff", borderRadius: 9999, padding: 4 }}
          >
            <MaterialIcons name="add" size={64} color="white" />
          </MotiPressable>
        </View>
      </Portal>

      <Portal name="add-task-portal">
        <AnimatePresence exitBeforeEnter>
          {rotate && (
            <>
              {/* Backdrop filter (animated) - z-40 so it's below task-modal */}
              <MotiView
                key="add-task-backdrop"
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "timing", duration: 200 }}
                exitTransition={{ type: "timing", duration: 150 }}
                className="absolute inset-0 bg-black/80"
                style={{ zIndex: 40 }}
              >
                <Pressable className="absolute inset-0" onPress={() => setRotate(false)} />
              </MotiView>

              {/* Modal (animated) - z-45 so it's below task-modal (z-50) */}
              <MotiView
                key="add-task-modal"
                from={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "timing", duration: 200 }}
                exitTransition={{ type: "timing", duration: 150 }}
                className="absolute bottom-[150px] left-3 bg-white h-3/4 w-[90%] mx-2 p-16 rounded-[44px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                style={{ zIndex: 45 }}
              >
                <Text className="font-google-sans-flex-16pt-medium text-black">
                  Add Task Modal
                </Text>
                {/* Additional modal content can go here */}
              </MotiView>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default AddTask;
