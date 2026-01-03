import { View, Text, Pressable } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiPressable } from "moti/interactions";
import { AnimatePresence, MotiView } from "moti";
import { Portal } from '@rn-primitives/portal';
import AddTaskForm from "./add-task-form";
import type { Todo } from "@/constants/todo";

interface AddTaskProps {
  isTaskModalOpen?: boolean;
  onTaskCreated?: (todo: Omit<Todo, 'assignees'>) => void;
}

const AddTask = ({ isTaskModalOpen = false, onTaskCreated }: AddTaskProps) => {
  const [rotate, setRotate] = useState<boolean>(false);

  // Close add-task modal when task modal opens
  useEffect(() => {
    if (isTaskModalOpen && rotate) {
      setRotate(false);
    }
  }, [isTaskModalOpen]);

  const handleSubmit = (todo: Omit<Todo, 'assignees'>) => {
    console.log("New task created:", todo);
    onTaskCreated?.(todo);
    setRotate(false);
  };

  const handleCancel = () => {
    setRotate(false);
  };

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
                <Pressable className="absolute inset-0" onPress={handleCancel} />
              </MotiView>

              {/* Modal (animated) - z-45 so it's below task-modal (z-50) */}
              <MotiView
                key="add-task-modal"
                from={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "timing", duration: 200 }}
                exitTransition={{ type: "timing", duration: 150 }}
                className="absolute bottom-[120px] left-4 right-4 bg-white rounded-[44px] p-6"
                style={{ zIndex: 45, maxHeight: "75%" }}
              >
                <AddTaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
              </MotiView>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default AddTask;
