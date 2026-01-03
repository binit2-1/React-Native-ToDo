import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { TODOS } from "@/constants/todo";

interface TodoContextType {
  // Map of "{todoId}:{planId}" -> true for completed plans
  completedPlans: Record<string, boolean>;
  markPlanCompleted: (todoId: string, planId: string) => void;
  markPlanUncompleted: (todoId: string, planId: string) => void;
  isPlanCompleted: (todoId: string, planId: string) => boolean;
  // Check if all plans for a todo are completed
  isTodoAutoCompleted: (todoId: string) => boolean;
  // Get completion progress for a todo
  getCompletionProgress: (todoId: string) => { completed: number; total: number };
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedPlans, setCompletedPlans] = useState<Record<string, boolean>>({});

  const markPlanCompleted = useCallback((todoId: string, planId: string) => {
    const key = `${todoId}:${planId}`;
    setCompletedPlans((prev) => ({ ...prev, [key]: true }));
  }, []);

  const markPlanUncompleted = useCallback((todoId: string, planId: string) => {
    const key = `${todoId}:${planId}`;
    setCompletedPlans((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const isPlanCompleted = useCallback(
    (todoId: string, planId: string) => {
      const key = `${todoId}:${planId}`;
      return !!completedPlans[key];
    },
    [completedPlans]
  );

  const isTodoAutoCompleted = useCallback(
    (todoId: string) => {
      const todo = TODOS.find((t) => t.id === todoId);
      if (!todo || !todo.plans || todo.plans.length === 0) return false;
      
      // Check if ALL plans for this todo are completed
      return todo.plans.every((plan) => {
        const key = `${todoId}:${plan.id}`;
        return !!completedPlans[key];
      });
    },
    [completedPlans]
  );

  const getCompletionProgress = useCallback(
    (todoId: string) => {
      const todo = TODOS.find((t) => t.id === todoId);
      if (!todo || !todo.plans || todo.plans.length === 0) {
        return { completed: 0, total: 0 };
      }
      
      const completed = todo.plans.filter((plan) => {
        const key = `${todoId}:${plan.id}`;
        return !!completedPlans[key];
      }).length;
      
      return { completed, total: todo.plans.length };
    },
    [completedPlans]
  );

  const value = useMemo(
    () => ({
      completedPlans,
      markPlanCompleted,
      markPlanUncompleted,
      isPlanCompleted,
      isTodoAutoCompleted,
      getCompletionProgress,
    }),
    [completedPlans, markPlanCompleted, markPlanUncompleted, isPlanCompleted, isTodoAutoCompleted, getCompletionProgress]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
