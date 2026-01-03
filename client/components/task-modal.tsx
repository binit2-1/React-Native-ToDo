import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { useColorScheme } from "nativewind";
import { THEME } from "@/lib/theme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TODOS } from "@/constants/todo";
import { cn } from "@/lib/utils";
import { Portal } from '@rn-primitives/portal';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const COLLAPSED_HEIGHT = SCREEN_HEIGHT * 0.55;
const EXPANDED_HEIGHT = SCREEN_HEIGHT * 0.92;
const DRAG_THRESHOLD = 80;

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  // track completed plans per todo: '{todoId}:{planId}' -> boolean
  const [completedPlans, setCompletedPlans] = useState<Record<string, boolean>>({});
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeSetSelectedPlan = (p: any) => {
    if (isMountedRef.current) setSelectedPlan(p);
  };

  const markPlanCompleted = (planId: string) => {
    if (!isMountedRef.current) return;
    const key = `${todoId}:${planId}`;
    setCompletedPlans((prev) => ({ ...prev, [key]: true }));
  };

  const markPlanUncompleted = (planId: string) => {
    if (!isMountedRef.current) return;
    const key = `${todoId}:${planId}`;
    setCompletedPlans((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // realtime clock to allow live overdue tracking
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30 * 1000); // update every 30s
    return () => clearInterval(id);
  }, []);

  const isPlanOverdue = (plan: any, nowTs: number) => {
    try {
      const nowDate = new Date(nowTs);
      const [fh, fm] = plan.from.split(":").map(Number);
      const [th, tm] = plan.to.split(":").map(Number);

      const fromDate = new Date(nowDate);
      fromDate.setHours(fh, fm, 0, 0);

      const toDate = new Date(nowDate);
      toDate.setHours(th, tm, 0, 0);

      // if to is earlier or equal to from, it means it rolls over to next day
      if (toDate.getTime() <= fromDate.getTime()) {
        toDate.setDate(toDate.getDate() + 1);
      }

      return nowDate.getTime() > toDate.getTime();
    } catch (e) {
      return false;
    }
  };

  const modalHeight = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const isExpandedRef = useRef(false);
  const startHeight = useRef(COLLAPSED_HEIGHT);

  // Keep the ref in sync with state
  useEffect(() => {
    isExpandedRef.current = isExpanded;
    startHeight.current = isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT;
  }, [isExpanded]);

  const handleClose = () => {
    Animated.spring(modalHeight, {
      toValue: 0,
      useNativeDriver: false,
      damping: 20,
      stiffness: 90,
    }).start(() => {
      setIsVisible(false);
      setIsExpanded(false);
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond if there's significant vertical movement
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderGrant: () => {
        // Capture the current height at the start of the gesture
        startHeight.current = isExpandedRef.current
          ? EXPANDED_HEIGHT
          : COLLAPSED_HEIGHT;
        lastGestureDy.current = 0;
      },
      onPanResponderMove: (_, gestureState) => {
        const newHeight = startHeight.current - gestureState.dy;

        // Allow dragging below collapsed height for close gesture
        const clampedHeight = Math.max(0, Math.min(EXPANDED_HEIGHT, newHeight));
        modalHeight.setValue(clampedHeight);
        lastGestureDy.current = gestureState.dy;
      },
      onPanResponderRelease: () => {
        const dy = lastGestureDy.current;
        const expanded = isExpandedRef.current;

        // Only act if there was significant movement
        if (Math.abs(dy) < 10) {
          // It was just a tap, snap back
          Animated.spring(modalHeight, {
            toValue: expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
            useNativeDriver: false,
            damping: 20,
            stiffness: 90,
          }).start();
        } else if (dy < -DRAG_THRESHOLD && !expanded) {
          // Dragged up past threshold - expand
          setIsExpanded(true);
          Animated.spring(modalHeight, {
            toValue: EXPANDED_HEIGHT,
            useNativeDriver: false,
            damping: 20,
            stiffness: 90,
          }).start();
        } else if (dy > DRAG_THRESHOLD) {
          // Dragged down past threshold - close
          Animated.spring(modalHeight, {
            toValue: 0,
            useNativeDriver: false,
            damping: 20,
            stiffness: 90,
          }).start(() => {
            setIsVisible(false);
            setIsExpanded(false);
            onClose();
          });
        } else {
          // Snap back to current state
          Animated.spring(modalHeight, {
            toValue: expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
            useNativeDriver: false,
            damping: 20,
            stiffness: 90,
          }).start();
        }
        lastGestureDy.current = 0;
      },
    })
  ).current;

  useEffect(() => {
    if (todoId) {
      setIsVisible(true);
      setIsExpanded(false);
      // Animate modal in
      Animated.spring(modalHeight, {
        toValue: COLLAPSED_HEIGHT,
        useNativeDriver: false,
        damping: 20,
        stiffness: 90,
      }).start();
    }
  }, [todoId]);

  // Find the specific todo that matches todoId
  const todo = TODOS.find((t) => t.id === todoId);

  if (!todo) return null;

  // Interpolate backdrop opacity based on modal height
  const backdropOpacity = modalHeight.interpolate({
    inputRange: [0, COLLAPSED_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <>
      {todoId && isVisible && (
        <Portal name="task-modal-portal">
          <View style={{ zIndex: 100 }} className="absolute inset-0" pointerEvents="box-none">
          {/* Dark backdrop overlay - synced with modal height */}
          <Animated.View
            style={[StyleSheet.absoluteFill, { opacity: backdropOpacity }]}
            pointerEvents={isVisible ? "auto" : "none"}
          >
            <Pressable style={styles.backdrop} onPress={handleClose} />
          </Animated.View>

          {/* Modal content */}
          <Animated.View
            style={[styles.modalContainer, { height: modalHeight }]}
          >
            {/* Drag handle */}
            <View {...panResponder.panHandlers} style={styles.dragHandleArea}>
              <View style={styles.dragHandle} />
            </View>

            {/* Fixed header buttons */}
            <View className="flex flex-row justify-between w-full px-4 pt-2 pb-4 bg-foreground">
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

            {/* Scrollable content */}
            <ScrollView
              className="flex-1 bg-foreground"
              showsVerticalScrollIndicator={false}
              scrollEnabled={isExpanded}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
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
                      <Avatar
                        className="h-16 w-16"
                        alt={`Assignee ${index + 1}`}
                      >
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
                  {todo.plans.map((plan, index) => {
                    const planKey = `${todo.id}:${plan.id}`;
                    const completed = !!completedPlans[planKey];
                    const overdue = !completed && isPlanOverdue(plan, now);
                    return (
                      <Pressable
                        key={`${todo.id}-plan-${index}`}
                        onPress={() => safeSetSelectedPlan(plan)}
                        className={cn(
                          "flex flex-col justify-center items-center px-4 pt-4",
                          completed && "opacity-40"
                        )}
                      >
                        <View
                          className={cn(
                            "flex flex-row justify-between items-center w-full px-6 py-8 rounded-[40px]",
                            overdue ? "bg-red-200" : "bg-neutral-200"
                          )}
                        >
                          <Text
                            className={cn(
                              "text-xl font-google-sans-flex-24pt-semibold text-center",
                              overdue ? "text-red-800" : "text-background",
                              completed && "line-through"
                            )}
                          >
                            {plan.title}
                          </Text>
                          <Text className={cn(
                            "text-xl font-google-sans-flex-24pt-semibold text-center",
                            overdue ? "text-red-800" : "text-background"
                          )}>
                            {plan.from} - {plan.to}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </Animated.View>
          {/*
            Plan details modal - customize this block to change the popup's
            appearance and behavior (notes layout, buttons, animations, etc.).
            The backdrop darkens the background; floating circular buttons on
            either side let you accept (green) or reject (red) the plan.
          */}
          {selectedPlan && (
            <View className="absolute inset-0 z-50">
              <Pressable
                className="absolute inset-0 bg-black/60"
                onPress={() => safeSetSelectedPlan(null)}
              />

              <View className="absolute left-6 right-6 top-1/3 bg-white rounded-[44px] p-5 items-center shadow-lg">
                {/* Title (fixed) */}
                <Text className="text-xl font-google-sans-flex-24pt-bold mb-3">
                  {selectedPlan.title}
                </Text>

                {/* Notes area: scrollable when content overflows. The maxHeight
                    uses SCREEN_HEIGHT so the notes won't grow under the buttons.
                 */}
                <ScrollView
                  className="w-full"
                  style={{ maxHeight: SCREEN_HEIGHT * 0.35 }}
                  contentContainerStyle={{ paddingBottom: 8 }}
                  showsVerticalScrollIndicator
                >
                  <Text className="text-sm text-center text-neutral-800">
                    {selectedPlan.notes ?? "No notes available for this plan."}
                  </Text>
                </ScrollView>

                {/* Buttons (fixed inside the modal) */}
                <View className="w-full flex-row items-center justify-between mt-4">
                  <Pressable onPress={() => safeSetSelectedPlan(null)}>
                    <View className="h-16 w-16 rounded-full items-center justify-center bg-red-500">
                      <Feather name="x" size={24} color="#fff" />
                    </View>
                  </Pressable>

                  {(() => {
                    const selKey = selectedPlan ? `${todoId}:${selectedPlan.id}` : null;
                    const selCompleted = selKey ? !!completedPlans[selKey] : false;
                    if (selCompleted) {
                      return (
                        <Pressable
                          onPress={() => {
                            if (selectedPlan && selectedPlan.id) {
                              markPlanUncompleted(selectedPlan.id);
                            }
                            safeSetSelectedPlan(null);
                          }}
                        >
                          <View className="h-16 w-16 rounded-full items-center justify-center bg-black">
                            <Feather name="rotate-ccw" size={24} color="#fff" />
                          </View>
                        </Pressable>
                      );
                    }

                    return (
                      <Pressable
                        onPress={() => {
                          // mark only the selected plan completed for this todo
                          if (selectedPlan && selectedPlan.id) {
                            markPlanCompleted(selectedPlan.id);
                          }
                          safeSetSelectedPlan(null);
                        }}
                      >
                        <View className="h-16 w-16 rounded-full items-center justify-center bg-green-500">
                          <Feather name="check" size={24} color="#fff" />
                        </View>
                      </Pressable>
                    );
                  })()}
                </View>
              </View>

              {/* Floating action buttons: left = reject, right = accept */}
            </View>
          )}
          </View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fafafa",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    zIndex: 50,
  },
  dragHandleArea: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#fafafa",
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
});

export default TaskModal;
