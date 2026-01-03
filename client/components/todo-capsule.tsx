import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { cn } from "@/lib/utils";
import TODOS, { formatTime, formatDuration } from "@/constants/todo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Button,
  buttonTextVariants,
  buttonVariants,
} from "@/components/ui/button";
import { useTodoContext } from "@/context/TodoContext";

const TodoCapsule = ({ onPress }: { onPress: (todoId: string) => void }) => {
  const { isTodoAutoCompleted, getCompletionProgress } = useTodoContext();

  return (
    <>
      {TODOS.map((todo) => {
        // A todo is finished if marked as finished OR all plans are completed
        const autoCompleted = isTodoAutoCompleted(todo.id);
        const isFinished = todo.isFinished || autoCompleted;
        const progress = getCompletionProgress(todo.id);

        return (
          <View
            key={todo.id}
            className={cn(
              "flex rounded-[44px] pl-4 pr-4 mb-4",
              isFinished ? "h-28 bg-[#FDD36B]" : "bg-white py-4"
            )}
          >
            {isFinished ? (
              // Finished task - simple layout (still clickable to edit/undo)
              <View 
                className="flex flex-row justify-between items-center h-full px-2"
                onTouchEnd={() => onPress(todo.id)}
              >
                <View className="flex flex-col flex-1">
                  <Text className="font-google-sans-flex-24pt-semibold text-lg text-black">
                    {todo.title}
                  </Text>
                  <Text className="font-google-sans-flex-9pt-medium text-black mt-0.5">
                    {todo.description}
                  </Text>
                  {autoCompleted && (
                    <Text className="font-google-sans-flex-9pt-regular text-xs text-gray-700 mt-1">
                      {progress.completed}/{progress.total} plans completed • Tap to edit
                    </Text>
                  )}
                </View>
                <View className="flex h-16 w-16 bg-black rounded-full items-center justify-center ml-4">
                  <MaterialIcons name="check" size={24} color="white" />
                </View>
              </View>
            ) : (
              // Unfinished task - detailed layout
              <View className="flex flex-col px-2 pt-4">
                {/* Time at top */}
                <Text className="font-google-sans-flex-9pt-regular text-sm text-gray-600 mb-2">
                  {formatTime(todo.from)}–{formatTime(todo.to)}
                </Text>

                {/* Main content row */}
                <View className="flex flex-row justify-between items-start mb-3">
                  <View className="flex flex-col flex-1 pr-4">
                    <Text className="font-google-sans-flex-24pt-semibold text-lg text-black">
                      {todo.title}
                    </Text>
                    <Text className="font-google-sans-flex-9pt-regular text-sm text-gray-600 mt-1">
                      {todo.description}
                    </Text>
                  </View>

                  {/* Assignees avatars */}
                  {todo.assignees && todo.assignees.length > 0 && (
                    <View className="flex flex-row items-center">
                      {todo.assignees.slice(0, 3).map((assignee, index) => (
                        <View
                          key={index}
                          className={cn(
                            "rounded-full border-2 border-white",
                            index > 0 && "-ml-2"
                          )}
                          style={{ zIndex: todo.assignees!.length - index }}
                        >
                          <Avatar
                            className="h-8 w-8"
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
                          className={cn(
                            "rounded-full border-2 border-white bg-customPurple items-center justify-center -ml-2",
                            "h-8 w-8"
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
                </View>

                {/* Bottom row with tags and arrow button */}
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row gap-2">
                    <View className="bg-gray-100 p-4 rounded-3xl ">
                      <Text className="font-google-sans-flex-9pt-regular text-md text-center text-gray-600">
                        Today
                      </Text>
                    </View>
                    <View className="bg-gray-100 p-4 rounded-3xl ">
                      <Text className="font-google-sans-flex-9pt-regular text-md text-center text-gray-600">
                        {formatDuration(todo.durationMinutes)}
                      </Text>
                    </View>
                    {/* Show progress if any plans are completed */}
                    {progress.total > 0 && progress.completed > 0 && (
                      <View className="bg-customPurple p-4 rounded-3xl">
                        <Text className="font-google-sans-flex-9pt-regular text-md text-center text-white">
                          {progress.completed}/{progress.total}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Button onPress={() => onPress(todo.id)} className="flex h-16 w-16 bg-black rounded-full items-center justify-center">
                    <Feather  name="arrow-up-right" size={24} color="white" />
                  </Button>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </>
  );
};

export default TodoCapsule;
