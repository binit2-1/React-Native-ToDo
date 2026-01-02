export type DayDateType = {
  id: string,
  day: string;
  date: number;
  isToday: boolean;
};

export function getNextNDays(n: number = 7, start = new Date()): DayDateType[] {
const days: DayDateType[] = [];

// Find the most recent Sunday (or today if it's Sunday)
const currentDate = new Date(start);
const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const daysToSubtract = dayOfWeek; // Days to go back to reach Sunday

// Set to the start of Sunday (00:00:00)
const weekStart = new Date(currentDate);
weekStart.setDate(currentDate.getDate() - daysToSubtract);
weekStart.setHours(0, 0, 0, 0);

// Get today's date for comparison (without time)
const today = new Date();
today.setHours(0, 0, 0, 0);

// Generate 7 days starting from Sunday
for(let i = 0; i < n; i++){
  const d = new Date(weekStart);
  d.setDate(weekStart.getDate() + i);
  
  // Check if this date is today
  const isToday = d.getTime() === today.getTime();
  
  days.push({
    id: d.toISOString().split('T')[0],
    day: d.toLocaleDateString('default', { weekday: 'short' }),
    date: d.getDate(),
    isToday: isToday,
  });
}
return days;
}

export const upcomingDays: DayDateType[] = getNextNDays(7);