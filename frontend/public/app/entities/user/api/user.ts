import type { User } from '../model/user';

export type HeatmapCell = {
    level: 0 | 1 | 2 | 3 | 4;
    date: string;
    contributions: number;
};

export type LeaderboardUser = {
    id: string;
    name: string;
    xpCount: number;
    solvedChallenges: number;
    streak: number;
    positionDelta: number;
};

export type ChallengesStatistic = {
    solvedCount: number;
    attemptedCount: number;
    completionPercent: number;
    acceptancePercent: number;
    globalRank: number;
};

const PODIUM_USERS: [LeaderboardUser, LeaderboardUser, LeaderboardUser] = [
    { id: '9', name: 'Иван', xpCount: 8900, solvedChallenges: 192, streak: 145, positionDelta: -5 },
    { id: '10', name: 'Ольга', xpCount: 8600, solvedChallenges: 185, streak: 67, positionDelta: 1 },
    {
        id: '11',
        name: 'Михаил',
        xpCount: 8400,
        solvedChallenges: 178,
        streak: 34,
        positionDelta: -2,
    },
];

const LEADERBOARD_USERS: LeaderboardUser[] = [
    {
        id: '1',
        name: 'Алексей',
        xpCount: 12500,
        solvedChallenges: 245,
        streak: 67,
        positionDelta: 3,
    },
    {
        id: '2',
        name: 'Мария',
        xpCount: 11800,
        solvedChallenges: 238,
        streak: 89,
        positionDelta: -2,
    },
    {
        id: '3',
        name: 'Дмитрий',
        xpCount: 11200,
        solvedChallenges: 230,
        streak: 45,
        positionDelta: 5,
    },
    {
        id: '4',
        name: 'Анна',
        xpCount: 10800,
        solvedChallenges: 225,
        streak: 123,
        positionDelta: -1,
    },
    {
        id: '5',
        name: 'Сергей',
        xpCount: 10500,
        solvedChallenges: 218,
        streak: 34,
        positionDelta: 0,
    },
    { id: '6', name: 'Елена', xpCount: 9900, solvedChallenges: 210, streak: 56, positionDelta: 2 },
    {
        id: '7',
        name: 'Андрей',
        xpCount: 9500,
        solvedChallenges: 205,
        streak: 78,
        positionDelta: -3,
    },
    {
        id: '8',
        name: 'Татьяна',
        xpCount: 9200,
        solvedChallenges: 198,
        streak: 23,
        positionDelta: 4,
    },
    { id: '9', name: 'Иван', xpCount: 8900, solvedChallenges: 192, streak: 145, positionDelta: -5 },
    { id: '10', name: 'Ольга', xpCount: 8600, solvedChallenges: 185, streak: 67, positionDelta: 1 },
    {
        id: '11',
        name: 'Михаил',
        xpCount: 8400,
        solvedChallenges: 178,
        streak: 34,
        positionDelta: -2,
    },
    {
        id: '12',
        name: 'Наталья',
        xpCount: 8100,
        solvedChallenges: 172,
        streak: 89,
        positionDelta: 3,
    },
    {
        id: '13',
        name: 'Николай',
        xpCount: 7900,
        solvedChallenges: 168,
        streak: 45,
        positionDelta: 0,
    },
    {
        id: '14',
        name: 'Ирина',
        xpCount: 7600,
        solvedChallenges: 162,
        streak: 12,
        positionDelta: -4,
    },
    {
        id: '15',
        name: 'Владимир',
        xpCount: 7400,
        solvedChallenges: 158,
        streak: 78,
        positionDelta: 2,
    },
    {
        id: '16',
        name: 'Светлана',
        xpCount: 7200,
        solvedChallenges: 152,
        streak: 234,
        positionDelta: -1,
    },
    { id: '17', name: 'Павел', xpCount: 7000, solvedChallenges: 148, streak: 56, positionDelta: 5 },
    {
        id: '18',
        name: 'Ксения',
        xpCount: 6800,
        solvedChallenges: 142,
        streak: 34,
        positionDelta: -3,
    },
    { id: '19', name: 'Артем', xpCount: 6600, solvedChallenges: 138, streak: 90, positionDelta: 1 },
    { id: '20', name: 'Юлия', xpCount: 6400, solvedChallenges: 132, streak: 67, positionDelta: -2 },
    { id: '21', name: 'Денис', xpCount: 6200, solvedChallenges: 128, streak: 45, positionDelta: 4 },
    {
        id: '22',
        name: 'Екатерина',
        xpCount: 6000,
        solvedChallenges: 124,
        streak: 23,
        positionDelta: -5,
    },
    {
        id: '23',
        name: 'Максим',
        xpCount: 5800,
        solvedChallenges: 120,
        streak: 178,
        positionDelta: 0,
    },
    { id: '24', name: 'Алиса', xpCount: 5600, solvedChallenges: 116, streak: 56, positionDelta: 3 },
    {
        id: '25',
        name: 'Евгений',
        xpCount: 5400,
        solvedChallenges: 112,
        streak: 89,
        positionDelta: -1,
    },
    {
        id: '26',
        name: 'Полина',
        xpCount: 5200,
        solvedChallenges: 108,
        streak: 34,
        positionDelta: 2,
    },
    {
        id: '27',
        name: 'Александр',
        xpCount: 5000,
        solvedChallenges: 104,
        streak: 67,
        positionDelta: -4,
    },
    {
        id: '28',
        name: 'Виктория',
        xpCount: 4800,
        solvedChallenges: 100,
        streak: 12,
        positionDelta: 1,
    },
    { id: '29', name: 'Роман', xpCount: 4600, solvedChallenges: 96, streak: 45, positionDelta: -2 },
    {
        id: '30',
        name: 'Анастасия',
        xpCount: 4400,
        solvedChallenges: 92,
        streak: 123,
        positionDelta: 5,
    },
    { id: '31', name: 'Вадим', xpCount: 4200, solvedChallenges: 88, streak: 34, positionDelta: -3 },
    { id: '32', name: 'Дарья', xpCount: 4000, solvedChallenges: 84, streak: 56, positionDelta: 0 },
    { id: '33', name: 'Кирилл', xpCount: 3800, solvedChallenges: 80, streak: 78, positionDelta: 4 },
    {
        id: '34',
        name: 'Евгения',
        xpCount: 3600,
        solvedChallenges: 76,
        streak: 23,
        positionDelta: -1,
    },
    {
        id: '35',
        name: 'Станислав',
        xpCount: 3400,
        solvedChallenges: 72,
        streak: 45,
        positionDelta: 2,
    },
    {
        id: '36',
        name: 'Людмила',
        xpCount: 3200,
        solvedChallenges: 68,
        streak: 167,
        positionDelta: -5,
    },
    { id: '37', name: 'Глеб', xpCount: 3000, solvedChallenges: 64, streak: 34, positionDelta: 1 },
    {
        id: '38',
        name: 'Вероника',
        xpCount: 2800,
        solvedChallenges: 60,
        streak: 89,
        positionDelta: -2,
    },
    { id: '39', name: 'Даниил', xpCount: 2600, solvedChallenges: 56, streak: 56, positionDelta: 3 },
    {
        id: '40',
        name: 'Кристина',
        xpCount: 2400,
        solvedChallenges: 52,
        streak: 12,
        positionDelta: 0,
    },
    { id: '41', name: 'Илья', xpCount: 2200, solvedChallenges: 48, streak: 45, positionDelta: -4 },
    {
        id: '42',
        name: 'Валерия',
        xpCount: 2000,
        solvedChallenges: 44,
        streak: 78,
        positionDelta: 2,
    },
    { id: '43', name: 'Олег', xpCount: 1900, solvedChallenges: 42, streak: 34, positionDelta: -1 },
    { id: '44', name: 'Алина', xpCount: 1800, solvedChallenges: 40, streak: 23, positionDelta: 5 },
    {
        id: '45',
        name: 'Виталий',
        xpCount: 1700,
        solvedChallenges: 38,
        streak: 56,
        positionDelta: -3,
    },
    {
        id: '46',
        name: 'Маргарита',
        xpCount: 1600,
        solvedChallenges: 36,
        streak: 234,
        positionDelta: 1,
    },
    {
        id: '47',
        name: 'Никита',
        xpCount: 1500,
        solvedChallenges: 34,
        streak: 45,
        positionDelta: -2,
    },
    { id: '48', name: 'Лариса', xpCount: 1400, solvedChallenges: 32, streak: 12, positionDelta: 4 },
    { id: '49', name: 'Тимур', xpCount: 1300, solvedChallenges: 30, streak: 89, positionDelta: -5 },
    {
        id: '50',
        name: 'Ангелина',
        xpCount: 1200,
        solvedChallenges: 28,
        streak: 34,
        positionDelta: 0,
    },
    {
        id: '51',
        name: 'Арсений',
        xpCount: 1100,
        solvedChallenges: 26,
        streak: 67,
        positionDelta: 3,
    },
    { id: '52', name: 'Инна', xpCount: 1000, solvedChallenges: 24, streak: 23, positionDelta: -1 },
    {
        id: '53',
        name: 'Григорий',
        xpCount: 950,
        solvedChallenges: 22,
        streak: 45,
        positionDelta: 2,
    },
    { id: '54', name: 'Алла', xpCount: 900, solvedChallenges: 20, streak: 156, positionDelta: -4 },
    { id: '55', name: 'Руслан', xpCount: 850, solvedChallenges: 19, streak: 34, positionDelta: 1 },
    { id: '56', name: 'Жанна', xpCount: 800, solvedChallenges: 18, streak: 78, positionDelta: -2 },
    { id: '57', name: 'Эдуард', xpCount: 750, solvedChallenges: 17, streak: 12, positionDelta: 5 },
    { id: '58', name: 'Нина', xpCount: 700, solvedChallenges: 16, streak: 45, positionDelta: -3 },
    { id: '59', name: 'Борис', xpCount: 650, solvedChallenges: 15, streak: 89, positionDelta: 0 },
    { id: '60', name: 'Майя', xpCount: 600, solvedChallenges: 14, streak: 23, positionDelta: 4 },
    { id: '61', name: 'Захар', xpCount: 580, solvedChallenges: 13, streak: 67, positionDelta: -1 },
    { id: '62', name: 'Лилия', xpCount: 560, solvedChallenges: 12, streak: 34, positionDelta: 2 },
    {
        id: '63',
        name: 'Анатолий',
        xpCount: 540,
        solvedChallenges: 11,
        streak: 178,
        positionDelta: -5,
    },
    { id: '64', name: 'Эльвира', xpCount: 520, solvedChallenges: 10, streak: 56, positionDelta: 3 },
    { id: '65', name: 'Василий', xpCount: 500, solvedChallenges: 9, streak: 12, positionDelta: -2 },
    { id: '66', name: 'Римма', xpCount: 480, solvedChallenges: 8, streak: 45, positionDelta: 1 },
    { id: '67', name: 'Давид', xpCount: 460, solvedChallenges: 7, streak: 23, positionDelta: -4 },
    { id: '68', name: 'Зоя', xpCount: 440, solvedChallenges: 6, streak: 89, positionDelta: 0 },
    {
        id: '69',
        name: 'Константин',
        xpCount: 420,
        solvedChallenges: 5,
        streak: 34,
        positionDelta: 5,
    },
    { id: '70', name: 'Фаина', xpCount: 400, solvedChallenges: 4, streak: 67, positionDelta: -3 },
    { id: '71', name: 'Лев', xpCount: 380, solvedChallenges: 3, streak: 12, positionDelta: 2 },
    { id: '72', name: 'Нонна', xpCount: 360, solvedChallenges: 2, streak: 45, positionDelta: -1 },
    { id: '73', name: 'Матвей', xpCount: 340, solvedChallenges: 1, streak: 234, positionDelta: 4 },
    { id: '74', name: 'Оксана', xpCount: 320, solvedChallenges: 0, streak: 23, positionDelta: -5 },
    { id: '75', name: 'Ярослав', xpCount: 300, solvedChallenges: 0, streak: 56, positionDelta: 0 },
    { id: '76', name: 'Эмилия', xpCount: 280, solvedChallenges: 0, streak: 12, positionDelta: 3 },
    { id: '77', name: 'Петр', xpCount: 260, solvedChallenges: 0, streak: 34, positionDelta: -2 },
    { id: '78', name: 'Таисия', xpCount: 240, solvedChallenges: 0, streak: 78, positionDelta: 1 },
    { id: '79', name: 'Семен', xpCount: 220, solvedChallenges: 0, streak: 45, positionDelta: -4 },
    { id: '80', name: 'Ульяна', xpCount: 200, solvedChallenges: 0, streak: 23, positionDelta: 2 },
    { id: '81', name: 'Федор', xpCount: 180, solvedChallenges: 0, streak: 67, positionDelta: -1 },
    { id: '82', name: 'Христина', xpCount: 160, solvedChallenges: 0, streak: 12, positionDelta: 5 },
    { id: '83', name: 'Цезарь', xpCount: 140, solvedChallenges: 0, streak: 34, positionDelta: -3 },
    { id: '84', name: 'Чулпан', xpCount: 120, solvedChallenges: 0, streak: 89, positionDelta: 0 },
    { id: '85', name: 'Шамиль', xpCount: 100, solvedChallenges: 0, streak: 23, positionDelta: 4 },
    { id: '86', name: 'Щербан', xpCount: 80, solvedChallenges: 0, streak: 45, positionDelta: -2 },
    { id: '87', name: 'Ырыстан', xpCount: 60, solvedChallenges: 0, streak: 12, positionDelta: 1 },
    { id: '88', name: 'Эрик', xpCount: 40, solvedChallenges: 0, streak: 34, positionDelta: -5 },
    { id: '89', name: 'Ювеналий', xpCount: 20, solvedChallenges: 0, streak: 56, positionDelta: 3 },
    { id: '90', name: 'Яна', xpCount: 10, solvedChallenges: 0, streak: 23, positionDelta: -1 },
    { id: '91', name: 'Азамат', xpCount: 5, solvedChallenges: 0, streak: 12, positionDelta: 2 },
    { id: '92', name: 'Белла', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: -4 },
    { id: '93', name: 'Влад', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: 1 },
    { id: '94', name: 'Галина', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: -2 },
    { id: '95', name: 'Дамир', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: 5 },
    { id: '96', name: 'Ева', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: -3 },
    { id: '97', name: 'Женя', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: 0 },
    { id: '98', name: 'Злата', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: 4 },
    { id: '99', name: 'Игнат', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: -1 },
    { id: '100', name: 'Клара', xpCount: 0, solvedChallenges: 0, streak: 0, positionDelta: 2 },
];

const HEATMAP_DATA: HeatmapCell[] = [
    // Неделя 1 (самая старая)
    { level: 0, date: '2025-10-01', contributions: 0 },
    { level: 0, date: '2025-10-02', contributions: 0 },
    { level: 1, date: '2025-10-03', contributions: 1 },
    { level: 1, date: '2025-10-04', contributions: 2 },
    { level: 2, date: '2025-10-05', contributions: 4 },
    { level: 1, date: '2025-10-06', contributions: 2 },
    { level: 0, date: '2025-10-07', contributions: 0 },

    // Неделя 2
    { level: 0, date: '2025-10-08', contributions: 0 },
    { level: 2, date: '2025-10-09', contributions: 5 },
    { level: 3, date: '2025-10-10', contributions: 8 },
    { level: 2, date: '2025-10-11', contributions: 4 },
    { level: 2, date: '2025-10-12', contributions: 3 },
    { level: 1, date: '2025-10-13', contributions: 1 },
    { level: 0, date: '2025-10-14', contributions: 0 },

    // Неделя 3
    { level: 1, date: '2025-10-15', contributions: 1 },
    { level: 2, date: '2025-10-16', contributions: 3 },
    { level: 4, date: '2025-10-17', contributions: 15 },
    { level: 3, date: '2025-10-18', contributions: 9 },
    { level: 2, date: '2025-10-19', contributions: 5 },
    { level: 1, date: '2025-10-20', contributions: 2 },
    { level: 0, date: '2025-10-21', contributions: 0 },

    // Неделя 4
    { level: 0, date: '2025-10-22', contributions: 0 },
    { level: 1, date: '2025-10-23', contributions: 2 },
    { level: 2, date: '2025-10-24', contributions: 4 },
    { level: 2, date: '2025-10-25', contributions: 3 },
    { level: 1, date: '2025-10-26', contributions: 1 },
    { level: 0, date: '2025-10-27', contributions: 0 },
    { level: 0, date: '2025-10-28', contributions: 0 },

    // Неделя 5
    { level: 1, date: '2025-10-29', contributions: 2 },
    { level: 3, date: '2025-10-30', contributions: 7 },
    { level: 4, date: '2025-10-31', contributions: 12 },
    { level: 4, date: '2025-11-01', contributions: 14 },
    { level: 3, date: '2025-11-02', contributions: 8 },
    { level: 2, date: '2025-11-03', contributions: 4 },
    { level: 1, date: '2025-11-04', contributions: 1 },

    // Неделя 6
    { level: 0, date: '2025-11-05', contributions: 0 },
    { level: 1, date: '2025-11-06', contributions: 2 },
    { level: 2, date: '2025-11-07', contributions: 5 },
    { level: 3, date: '2025-11-08', contributions: 6 },
    { level: 2, date: '2025-11-09', contributions: 4 },
    { level: 1, date: '2025-11-10', contributions: 1 },
    { level: 0, date: '2025-11-11', contributions: 0 },

    // Неделя 7
    { level: 0, date: '2025-11-12', contributions: 0 },
    { level: 0, date: '2025-11-13', contributions: 0 },
    { level: 1, date: '2025-11-14', contributions: 2 },
    { level: 2, date: '2025-11-15', contributions: 3 },
    { level: 1, date: '2025-11-16', contributions: 2 },
    { level: 0, date: '2025-11-17', contributions: 0 },
    { level: 0, date: '2025-11-18', contributions: 0 },

    // Неделя 8
    { level: 2, date: '2025-11-19', contributions: 3 },
    { level: 3, date: '2025-11-20', contributions: 8 },
    { level: 4, date: '2025-11-21', contributions: 11 },
    { level: 4, date: '2025-11-22', contributions: 13 },
    { level: 3, date: '2025-11-23', contributions: 7 },
    { level: 2, date: '2025-11-24', contributions: 4 },
    { level: 1, date: '2025-11-25', contributions: 1 },

    // Неделя 9
    { level: 0, date: '2025-11-26', contributions: 0 },
    { level: 2, date: '2025-11-27', contributions: 3 },
    { level: 3, date: '2025-11-28', contributions: 6 },
    { level: 2, date: '2025-11-29', contributions: 5 },
    { level: 2, date: '2025-11-30', contributions: 4 },
    { level: 1, date: '2025-12-01', contributions: 2 },
    { level: 0, date: '2025-12-02', contributions: 0 },

    // Неделя 10
    { level: 1, date: '2025-12-03', contributions: 1 },
    { level: 2, date: '2025-12-04', contributions: 4 },
    { level: 4, date: '2025-12-05', contributions: 10 },
    { level: 3, date: '2025-12-06', contributions: 8 },
    { level: 2, date: '2025-12-07', contributions: 5 },
    { level: 1, date: '2025-12-08', contributions: 2 },
    { level: 0, date: '2025-12-09', contributions: 0 },

    // Неделя 11
    { level: 0, date: '2025-12-10', contributions: 0 },
    { level: 1, date: '2025-12-11', contributions: 1 },
    { level: 2, date: '2025-12-12', contributions: 3 },
    { level: 2, date: '2025-12-13', contributions: 4 },
    { level: 1, date: '2025-12-14', contributions: 2 },
    { level: 0, date: '2025-12-15', contributions: 0 },
    { level: 0, date: '2025-12-16', contributions: 0 },

    // Неделя 12
    { level: 2, date: '2025-12-17', contributions: 5 },
    { level: 3, date: '2025-12-18', contributions: 9 },
    { level: 4, date: '2025-12-19', contributions: 18 },
    { level: 4, date: '2025-12-20', contributions: 20 },
    { level: 3, date: '2025-12-21', contributions: 11 },
    { level: 2, date: '2025-12-22', contributions: 6 },
    { level: 1, date: '2025-12-23', contributions: 2 },

    // Неделя 13
    { level: 0, date: '2025-12-24', contributions: 0 },
    { level: 0, date: '2025-12-25', contributions: 0 },
    { level: 1, date: '2025-12-26', contributions: 1 },
    { level: 2, date: '2025-12-27', contributions: 3 },
    { level: 1, date: '2025-12-28', contributions: 2 },
    { level: 0, date: '2025-12-29', contributions: 0 },
    { level: 0, date: '2025-12-30', contributions: 0 },

    // Неделя 14
    { level: 1, date: '2025-12-31', contributions: 1 },
    { level: 2, date: '2026-01-01', contributions: 4 },
    { level: 3, date: '2026-01-02', contributions: 7 },
    { level: 3, date: '2026-01-03', contributions: 8 },
    { level: 2, date: '2026-01-04', contributions: 5 },
    { level: 1, date: '2026-01-05', contributions: 2 },
    { level: 0, date: '2026-01-06', contributions: 0 },

    // Неделя 15
    { level: 0, date: '2026-01-07', contributions: 0 },
    { level: 1, date: '2026-01-08', contributions: 2 },
    { level: 4, date: '2026-01-09', contributions: 12 },
    { level: 3, date: '2026-01-10', contributions: 9 },
    { level: 2, date: '2026-01-11', contributions: 4 },
    { level: 1, date: '2026-01-12', contributions: 1 },
    { level: 0, date: '2026-01-13', contributions: 0 },

    // Неделя 16
    { level: 0, date: '2026-01-14', contributions: 0 },
    { level: 2, date: '2026-01-15', contributions: 3 },
    { level: 3, date: '2026-01-16', contributions: 6 },
    { level: 2, date: '2026-01-17', contributions: 5 },
    { level: 1, date: '2026-01-18', contributions: 2 },
    { level: 0, date: '2026-01-19', contributions: 0 },
    { level: 0, date: '2026-01-20', contributions: 0 },

    // Неделя 17
    { level: 1, date: '2026-01-21', contributions: 2 },
    { level: 3, date: '2026-01-22', contributions: 8 },
    { level: 4, date: '2026-01-23', contributions: 14 },
    { level: 4, date: '2026-01-24', contributions: 16 },
    { level: 3, date: '2026-01-25', contributions: 10 },
    { level: 2, date: '2026-01-26', contributions: 5 },
    { level: 1, date: '2026-01-27', contributions: 2 },

    // Неделя 18
    { level: 0, date: '2026-01-28', contributions: 0 },
    { level: 1, date: '2026-01-29', contributions: 1 },
    { level: 2, date: '2026-01-30', contributions: 4 },
    { level: 2, date: '2026-01-31', contributions: 3 },
    { level: 1, date: '2026-02-01', contributions: 2 },
    { level: 0, date: '2026-02-02', contributions: 0 },
    { level: 0, date: '2026-02-03', contributions: 0 },

    // Неделя 19
    { level: 2, date: '2026-02-04', contributions: 3 },
    { level: 3, date: '2026-02-05', contributions: 7 },
    { level: 4, date: '2026-02-06', contributions: 11 },
    { level: 3, date: '2026-02-07', contributions: 8 },
    { level: 2, date: '2026-02-08', contributions: 5 },
    { level: 1, date: '2026-02-09', contributions: 1 },
    { level: 0, date: '2026-02-10', contributions: 0 },

    // Неделя 20
    { level: 0, date: '2026-02-11', contributions: 0 },
    { level: 1, date: '2026-02-12', contributions: 2 },
    { level: 2, date: '2026-02-13', contributions: 4 },
    { level: 2, date: '2026-02-14', contributions: 3 },
    { level: 1, date: '2026-02-15', contributions: 1 },
    { level: 0, date: '2026-02-16', contributions: 0 },
    { level: 0, date: '2026-02-17', contributions: 0 },

    // Неделя 21
    { level: 1, date: '2026-02-18', contributions: 2 },
    { level: 2, date: '2026-02-19', contributions: 5 },
    { level: 4, date: '2026-02-20', contributions: 13 },
    { level: 3, date: '2026-02-21', contributions: 9 },
    { level: 2, date: '2026-02-22', contributions: 6 },
    { level: 1, date: '2026-02-23', contributions: 2 },
    { level: 0, date: '2026-02-24', contributions: 0 },

    // Неделя 22
    { level: 0, date: '2026-02-25', contributions: 0 },
    { level: 3, date: '2026-02-26', contributions: 7 },
    { level: 4, date: '2026-02-27', contributions: 15 },
    { level: 4, date: '2026-02-28', contributions: 17 },
    { level: 3, date: '2026-03-01', contributions: 9 },
    { level: 2, date: '2026-03-02', contributions: 4 },
    { level: 1, date: '2026-03-03', contributions: 1 },

    // Неделя 23
    { level: 1, date: '2026-03-04', contributions: 2 },
    { level: 2, date: '2026-03-05', contributions: 4 },
    { level: 3, date: '2026-03-06', contributions: 8 },
    { level: 2, date: '2026-03-07', contributions: 5 },
    { level: 2, date: '2026-03-08', contributions: 3 },
    { level: 1, date: '2026-03-09', contributions: 1 },
    { level: 0, date: '2026-03-10', contributions: 0 },

    // Неделя 24
    { level: 0, date: '2026-03-11', contributions: 0 },
    { level: 1, date: '2026-03-12', contributions: 2 },
    { level: 4, date: '2026-03-13', contributions: 12 },
    { level: 3, date: '2026-03-14', contributions: 8 },
    { level: 2, date: '2026-03-15', contributions: 4 },
    { level: 1, date: '2026-03-16', contributions: 1 },
    { level: 0, date: '2026-03-17', contributions: 0 },

    // Неделя 25
    { level: 2, date: '2026-03-18', contributions: 5 },
    { level: 3, date: '2026-03-19', contributions: 9 },
    { level: 4, date: '2026-03-20', contributions: 19 },
    { level: 4, date: '2026-03-21', contributions: 21 },
    { level: 3, date: '2026-03-22', contributions: 10 },
    { level: 2, date: '2026-03-23', contributions: 6 },
    { level: 1, date: '2026-03-24', contributions: 2 },

    // Неделя 26 (самая свежая)
    { level: 1, date: '2026-03-25', contributions: 2 },
    { level: 2, date: '2026-03-26', contributions: 4 },
    { level: 3, date: '2026-03-27', contributions: 7 },
    { level: 4, date: '2026-03-28', contributions: 11 },
    { level: 3, date: '2026-03-29', contributions: 8 },
    { level: 2, date: '2026-03-30', contributions: 5 },
    { level: 1, date: '2026-03-31', contributions: 2 },
];

const TEST_USER: User = {
    id: '1',
    name: 'My Test',
    position: {
        currentPositon: 10,
        prevPosition: 8,
    },
    xp: 1200,
    challengesSolved: 12,
    streak: 10,
};

const USER_CHALLENGES_DATA: ChallengesStatistic = {
    solvedCount: 12,
    attemptedCount: 24,
    completionPercent: 5.6,
    acceptancePercent: 56.8,
    globalRank: 320,
};

export const userApi = {
    getCurrentUser: async () => {
        return Promise.resolve(TEST_USER);
    },

    getHeatmap: async () => {
        return Promise.resolve(HEATMAP_DATA);
    },

    getChallengesStatistics: async () => {
        return Promise.resolve(USER_CHALLENGES_DATA);
    },

    getPodiumUsers: async () => {
        return Promise.resolve(PODIUM_USERS);
    },

    getLeaderboardStatistics: async (_page: number) => {
        return Promise.resolve({
            users: LEADERBOARD_USERS,
            pageSize: 100,
            totalUsers: 1640,
        });
    },
};
