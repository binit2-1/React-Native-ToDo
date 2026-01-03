export type Plan = {
    id: string;
    title: string;
    from: string; // ISO time or "HH:MM"
    to: string;
    durationMinutes: number;
    notes?: string;
};

export type Todo = {
    id: string;
    title: string;
    description: string;
    from: string;
    to: string;
    durationMinutes: number;
    assignees?: string[]; // profile photo urls
    plans: Plan[];
    isFinished: boolean;
};

const computeMinutes = (from: string, to: string) => {
    // expects "HH:MM" 24h
    const [fh, fm] = from.split(':').map(Number);
    const [th, tm] = to.split(':').map(Number);
    let minutes = (th * 60 + tm) - (fh * 60 + fm);
    if (minutes < 0) minutes += 24 * 60;
    return minutes;
};

// Helper function to format time from "09:00" to "9:00 AM"
export const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Helper function to format duration
export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
        return `${hours} h ${mins}m`;
    } else if (hours > 0) {
        return `${hours} h`;
    } else {
        return `${mins}m`;
    }
};

export const TODOS: Todo[] = [
    {
        id: 'todo-1',
        title: 'Launch Design Review',
        description: 'Walk through final designs, gather feedback and action items for the launch.',
        from: '09:00',
        to: '11:00',
        durationMinutes: computeMinutes('09:00', '11:00'),
        isFinished: true,
        assignees: [
            'https://i.pravatar.cc/150?img=12',
            'https://i.pravatar.cc/150?img=5',
            'https://i.pravatar.cc/150?img=33',
        ],
        plans: [
            {
                id: 'p1',
                title: 'Introduction & Goals',
                from: '09:00',
                to: '09:15',
                durationMinutes: computeMinutes('09:00', '09:15'),
                notes: 'Set meeting goals and success criteria.',
            },
            {
                id: 'p2',
                title: 'Design Walkthrough',
                from: '09:15',
                to: '10:00',
                durationMinutes: computeMinutes('09:15', '10:00'),
                notes: 'Cover screens, flows, and edge cases.',
            },
            {
                id: 'p3',
                title: 'Feedback & Actions',
                from: '10:00',
                to: '11:00',
                durationMinutes: computeMinutes('10:00', '11:00'),
                notes: 'Document action items and owners.',
            },
        ],
    },
    {
        id: 'todo-2',
        title: 'Sprint Planning',
        description: 'Plan the upcoming sprint, estimate stories, and assign owners.',
        from: '13:00',
        to: '15:30',
        durationMinutes: computeMinutes('13:00', '15:30'),
        isFinished: false,
        assignees: [
            'https://i.pravatar.cc/150?img=32',
            'https://i.pravatar.cc/150?img=47',
        ],
        plans: [
            {
                id: 'p1',
                title: 'Backlog Review',
                from: '13:00',
                to: '13:45',
                durationMinutes: computeMinutes('13:00', '13:45'),
                notes: ' Ensure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksdEnsure backlog is groomed.kjasdnakdjaskdjsakldjasl;dsdankjdnaskskjadnsjdhaksd',
            },
            {
                id: 'p2',
                title: 'Estimation',
                from: '13:45',
                to: '14:30',
                durationMinutes: computeMinutes('13:45', '14:30'),
                notes: 'T-shirt sizing & story points.',
            },
            {
                id: 'p3',
                title: 'Assignment & Risks',
                from: '14:30',
                to: '15:30',
                durationMinutes: computeMinutes('14:30', '15:30'),
                notes: 'Assign owners, identify blockers.',
            },
        ],
    },
    {
        id: 'todo-3',
        title: 'User Testing Session',
        description: 'Moderate sessions with users for new onboarding flow.',
        from: '10:00',
        to: '12:00',
        durationMinutes: computeMinutes('10:00', '12:00'),
        isFinished: false,
        assignees: [
            'https://i.pravatar.cc/150?img=7',
            'https://i.pravatar.cc/150?img=8',
            'https://i.pravatar.cc/150?img=15',
            'https://i.pravatar.cc/150?img=25',
        ],
        plans: [
            {
                id: 'p1',
                title: 'Setup & Consent',
                from: '10:00',
                to: '10:15',
                durationMinutes: computeMinutes('10:00', '10:15'),
                notes: 'Get consent forms signed.',
            },
            {
                id: 'p2',
                title: 'Session 1',
                from: '10:15',
                to: '11:00',
                durationMinutes: computeMinutes('10:15', '11:00'),
                notes: 'Observe first participant.',
            },
            {
                id: 'p3',
                title: 'Session 2',
                from: '11:00',
                to: '11:45',
                durationMinutes: computeMinutes('11:00', '11:45'),
                notes: 'Observe second participant.',
            },
            {
                id: 'p4',
                title: 'Debrief',
                from: '11:45',
                to: '12:00',
                durationMinutes: computeMinutes('11:45', '12:00'),
                notes: 'Collect quick observations.',
            },
        ],
    },
    {
        id: 'todo-4',
        title: 'Marketing Sync',
        description: 'Align on messaging, channels, and content calendar for release week.',
        from: '16:00',
        to: '17:30',
        durationMinutes: computeMinutes('16:00', '17:30'),
        isFinished: false,
        assignees: [
            'https://i.pravatar.cc/150?img=18',
            'https://i.pravatar.cc/150?img=22',
        ],
        plans: [
            {
                id: 'p1',
                title: 'Messaging Review',
                from: '16:00',
                to: '16:30',
                durationMinutes: computeMinutes('16:00', '16:30'),
                notes: 'Finalize key messages.',
            },
            {
                id: 'p2',
                title: 'Channel Plan',
                from: '16:30',
                to: '17:00',
                durationMinutes: computeMinutes('16:30', '17:00'),
                notes: 'Decide channels & cadence.',
            },
            {
                id: 'p3',
                title: 'Content Calendar',
                from: '17:00',
                to: '17:30',
                durationMinutes: computeMinutes('17:00', '17:30'),
                notes: 'Assign content owners.',
            },
        ],
    },
];

export default TODOS;