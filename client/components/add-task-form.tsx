import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import React, { useState, useCallback } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import type { Plan } from "@/constants/todo";
import {
  createEmptyPlan,
  calculateTotalPlansDuration,
  formatDuration,
  validateTodoForm,
  createTodoFromForm,
} from "@/lib/taskCalculations";

interface PlanInputProps {
  plan: Partial<Plan>;
  index: number;
  onUpdate: (index: number, field: keyof Plan, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const PlanInput = ({ plan, index, onUpdate, onRemove, canRemove }: PlanInputProps) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -10 }}
      transition={{ type: "timing", duration: 200 }}
      className="mb-4"
    >
      <View className="flex-row items-center px-1 mb-4 justify-between ">
        <Text className="text-neutral-500 font-google-sans-flex-9pt-medium text-sm">
          Plan {index + 1}
        </Text>
        {canRemove && (
          <Pressable onPress={() => onRemove(index)} hitSlop={8}>
            <Feather name="trash-2" size={18} color="#ef4444" />
          </Pressable>
        )}
      </View>

      {/* Plan Title */}
      <TextInput
        value={plan.title}
        onChangeText={(text) => onUpdate(index, "title", text)}
        placeholder="Plan title"
        placeholderTextColor="#9ca3af"
        className="bg-neutral-100 rounded-2xl px-4 py-3 text-base font-google-sans-flex-9pt-regular text-black mb-2"
      />

      {/* Time Selection Row */}
      <View className="flex-row gap-2 mb-2">
        <View className="flex-1">
          <Text className="text-neutral-400 text-xs mb-1 ml-1">From</Text>
          <TextInput
            value={plan.from}
            onChangeText={(text) => onUpdate(index, "from", text)}
            placeholder="09:00"
            placeholderTextColor="#9ca3af"
            keyboardType="numbers-and-punctuation"
            className="bg-neutral-100 rounded-xl px-4 py-2 text-base font-google-sans-flex-9pt-regular text-black text-center"
          />
        </View>
        <View className="flex-1">
          <Text className="text-neutral-400 text-xs mb-1 ml-1">To</Text>
          <TextInput
            value={plan.to}
            onChangeText={(text) => onUpdate(index, "to", text)}
            placeholder="10:00"
            placeholderTextColor="#9ca3af"
            keyboardType="numbers-and-punctuation"
            className="bg-neutral-100 rounded-xl px-4 py-2 text-base font-google-sans-flex-9pt-regular text-black text-center"
          />
        </View>
      </View>

      {/* Notes */}
      <TextInput
        value={plan.notes}
        onChangeText={(text) => onUpdate(index, "notes", text)}
        placeholder="Notes (optional)"
        placeholderTextColor="#9ca3af"
        multiline
        numberOfLines={2}
        className="bg-neutral-100 rounded-2xl px-4 py-3 text-sm font-google-sans-flex-9pt-regular text-black"
        style={{ minHeight: 60, textAlignVertical: "top" }}
      />
    </MotiView>
  );
};

interface AddTaskFormProps {
  onSubmit: (todo: ReturnType<typeof createTodoFromForm>) => void;
  onCancel: () => void;
}

const AddTaskForm = ({ onSubmit, onCancel }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plans, setPlans] = useState<Partial<Plan>[]>([createEmptyPlan()]);

  const totalDuration = calculateTotalPlansDuration(plans);

  const handleUpdatePlan = useCallback(
    (index: number, field: keyof Plan, value: string) => {
      setPlans((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    []
  );

  const handleRemovePlan = useCallback((index: number) => {
    setPlans((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddPlan = useCallback(() => {
    setPlans((prev) => [...prev, createEmptyPlan()]);
  }, []);

  const handleSubmit = () => {
    const validation = validateTodoForm(title, description, plans);
    if (!validation.valid) {
      // For now just log errors, could show toast/alert
      console.log("Validation errors:", validation.errors);
      return;
    }

    const newTodo = createTodoFromForm(title, description, plans);
    onSubmit(newTodo);
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-center mb-6">
        
        <Text className="text-xl font-google-sans-flex-24pt-bold text-black">
          New Task
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Scrollable Form Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Task Title */}
        <View className="mb-4">
          <Text className="text-neutral-500 font-google-sans-flex-9pt-medium text-sm mb-2 ml-1">
            Title
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="What needs to be done?"
            placeholderTextColor="#9ca3af"
            className="bg-neutral-100 rounded-2xl px-4 py-4 text-lg font-google-sans-flex-9pt-semibold text-black"
          />
        </View>

        {/* Task Description */}
        <View className="mb-6">
          <Text className="text-neutral-500 font-google-sans-flex-9pt-medium text-sm mb-2 ml-1">
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Add more details about this task..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={3}
            className="bg-neutral-100 rounded-2xl px-4 py-4 text-base font-google-sans-flex-9pt-regular text-black"
            style={{ minHeight: 80, textAlignVertical: "top" }}
          />
        </View>

        {/* Plans Section */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-neutral-500 font-google-sans-flex-9pt-medium text-sm ml-1">
              Plans
            </Text>
            {/* Add Plan Button */}
            <Pressable
              onPress={handleAddPlan}
              className="flex-row items-center"
              hitSlop={8}
            >
              <View className="bg-customPurple rounded-full p-1">
                <MaterialIcons name="add" size={18} color="white" />
              </View>
              <Text className="text-customPurple font-google-sans-flex-9pt-medium text-sm ml-1">
                Add Plan
              </Text>
            </Pressable>
          </View>

          {/* Plan Inputs */}
          <AnimatePresence>
            {plans.map((plan, index) => (
              <PlanInput
                key={plan.id}
                plan={plan}
                index={index}
                onUpdate={handleUpdatePlan}
                onRemove={handleRemovePlan}
                canRemove={plans.length > 1}
              />
            ))}
          </AnimatePresence>
        </View>

        {/* Total Duration Display */}
        {totalDuration > 0 && (
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-customPurple/10 rounded-2xl px-4 py-3 mb-6"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-customPurple font-google-sans-flex-9pt-medium text-sm">
                Total Duration
              </Text>
              <Text className="text-customPurple font-google-sans-flex-24pt-bold text-lg">
                {formatDuration(totalDuration)}
              </Text>
            </View>
          </MotiView>
        )}

        {/* Spacer for bottom button */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Submit Button - Fixed at bottom */}
      <View className="absolute left-0 right-0 items-end bottom-1">
        <Pressable onPress={handleSubmit}>
          <View className="bg-green-500 h-12 w-12 rounded-full items-center justify-center shadow-lg">
            <Feather name="check" size={16} color="white" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AddTaskForm;
