export type DayDateType = {
    id: string,
    day: string;
    date: number;
    isToday: boolean;
};

export function getNextNDays(n: number = 7, start = new Date()): DayDateType[] {
  const days: DayDateType[] = [];
  for(let i = 0; i < n; i++){
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({
      id: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('default', { weekday: 'short' }),
      date: d.getDate(),
      isToday: i === 0,
    });
  }
  return days;
}

export const upcomingDays: DayDateType[] = getNextNDays(7);