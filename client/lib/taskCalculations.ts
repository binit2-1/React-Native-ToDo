import type { Plan, Todo } from '@/constants/todo';

/**
 * Computes duration in minutes between two HH:MM time strings
 * Handles overnight scenarios (when to < from)
 */
export const computeMinutes = (from: string, to: string): number => {
  if (!from || !to) return 0;
  
  try {
    const [fh, fm] = from.split(':').map(Number);
    const [th, tm] = to.split(':').map(Number);
    
    if (isNaN(fh) || isNaN(fm) || isNaN(th) || isNaN(tm)) return 0;
    
    let minutes = (th * 60 + tm) - (fh * 60 + fm);
    if (minutes < 0) minutes += 24 * 60; // Handle overnight
    return minutes;
  } catch {
    return 0;
  }
};

/**
 * Formats duration in minutes to human-readable string
 */
export const formatDuration = (minutes: number): string => {
  if (minutes <= 0) return '0m';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${mins}m`;
  }
};

/**
 * Formats time from "HH:MM" to "H:MM AM/PM"
 */
export const formatTime = (time: string): string => {
  if (!time) return '';
  
  try {
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return time;
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch {
    return time;
  }
};

/**
 * Calculates total duration from all plans
 */
export const calculateTotalPlansDuration = (plans: Partial<Plan>[]): number => {
  return plans.reduce((total, plan) => {
    if (plan.from && plan.to) {
      return total + computeMinutes(plan.from, plan.to);
    }
    return total;
  }, 0);
};

/**
 * Calculates the earliest "from" and latest "to" from plans
 * Returns the overall time range for the task
 */
export const calculateTaskTimeRange = (plans: Partial<Plan>[]): { from: string; to: string } => {
  if (!plans.length) return { from: '', to: '' };
  
  const validPlans = plans.filter(p => p.from && p.to);
  if (!validPlans.length) return { from: '', to: '' };
  
  // Sort by from time to get earliest
  const sortedByFrom = [...validPlans].sort((a, b) => {
    const [ah, am] = (a.from || '').split(':').map(Number);
    const [bh, bm] = (b.from || '').split(':').map(Number);
    return (ah * 60 + am) - (bh * 60 + bm);
  });
  
  // Sort by to time to get latest
  const sortedByTo = [...validPlans].sort((a, b) => {
    const [ah, am] = (a.to || '').split(':').map(Number);
    const [bh, bm] = (b.to || '').split(':').map(Number);
    return (bh * 60 + bm) - (ah * 60 + am);
  });
  
  return {
    from: sortedByFrom[0]?.from || '',
    to: sortedByTo[0]?.to || '',
  };
};

/**
 * Generates a unique ID for new items
 */
export const generateId = (prefix: string = 'item'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Creates a new empty plan template
 */
export const createEmptyPlan = (): Partial<Plan> => ({
  id: generateId('plan'),
  title: '',
  from: '',
  to: '',
  notes: '',
});

/**
 * Creates a new todo from form data
 */
export const createTodoFromForm = (
  title: string,
  description: string,
  plans: Partial<Plan>[]
): Omit<Todo, 'assignees'> => {
  const validPlans = plans.filter(p => p.title && p.from && p.to);
  const timeRange = calculateTaskTimeRange(validPlans);
  const totalDuration = calculateTotalPlansDuration(validPlans);
  
  return {
    id: generateId('todo'),
    title,
    description,
    from: timeRange.from,
    to: timeRange.to,
    durationMinutes: totalDuration,
    plans: validPlans.map(p => ({
      id: p.id || generateId('plan'),
      title: p.title || '',
      from: p.from || '',
      to: p.to || '',
      durationMinutes: computeMinutes(p.from || '', p.to || ''),
      notes: p.notes,
    })),
    isFinished: false,
  };
};

/**
 * Validates plan data
 */
export const validatePlan = (plan: Partial<Plan>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!plan.title?.trim()) {
    errors.push('Plan title is required');
  }
  if (!plan.from) {
    errors.push('Start time is required');
  }
  if (!plan.to) {
    errors.push('End time is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validates todo form data
 */
export const validateTodoForm = (
  title: string,
  description: string,
  plans: Partial<Plan>[]
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!title?.trim()) {
    errors.push('Task title is required');
  }
  if (!description?.trim()) {
    errors.push('Task description is required');
  }
  if (plans.length === 0) {
    errors.push('At least one plan is required');
  }
  
  // Check if at least one plan is valid
  const validPlans = plans.filter(p => p.title && p.from && p.to);
  if (plans.length > 0 && validPlans.length === 0) {
    errors.push('At least one complete plan is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
