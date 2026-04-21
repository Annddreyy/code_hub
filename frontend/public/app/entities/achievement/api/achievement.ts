import type { Achievement } from '../model/achievement';

const ACHIEVEMENTS_TEST: Achievement[] = [
    {
        id: 'first_step',
        title: 'Первый шаг',
        description: 'Зарегистрироваться и войти в приложение',
        icon: '👣',
        xpReward: 10,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'profile_complete',
        title: 'Знакомство с собой',
        description: 'Заполнить все поля в профиле пользователя',
        icon: '📝',
        xpReward: 25,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'quick_learner',
        title: 'Быстрый ученик',
        description: 'Завершить первые 5 уроков',
        icon: '⚡',
        xpReward: 50,
        userMeta: {},
    },
    {
        id: 'social_butterfly',
        title: 'Социальная бабочка',
        description: 'Добавить 10 друзей',
        icon: '🦋',
        xpReward: 60,
        userMeta: {},
    },
    {
        id: 'first_xp_100',
        title: 'Начинающий герой',
        description: 'Накопить 100 очков опыта',
        icon: '🪙',
        xpReward: 20,
        userMeta: {},
    },
    {
        id: 'streak_7',
        title: 'Семь дней подряд',
        description: 'Заходить в приложение 7 дней подряд',
        icon: '📅',
        xpReward: 80,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'master_of_modules',
        title: 'Мастер модулей',
        description: 'Завершить любой полный модуль обучения',
        icon: '🏆',
        xpReward: 100,
        userMeta: {},
    },
    {
        id: 'helpful_neighbor',
        title: 'Помощник',
        description: 'Ответить на 5 вопросов в сообществе',
        icon: '🤝',
        xpReward: 75,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'achievement_hunter',
        title: 'Охотник за достижениями',
        description: 'Получить 5 любых достижений',
        icon: '🎯',
        xpReward: 50,
        userMeta: {},
    },
    {
        id: 'share_first',
        title: 'Делюсь успехом',
        description: 'Поделиться прогрессом в соцсетях',
        icon: '📢',
        xpReward: 15,
        userMeta: {},
    },
    {
        id: 'night_owl',
        title: 'Ночная сова',
        description: 'Выполнить задание после полуночи',
        icon: '🦉',
        xpReward: 30,
        userMeta: {},
    },
    {
        id: 'early_bird',
        title: 'Ранняя пташка',
        description: 'Выполнить задание до 8 утра',
        icon: '🐦',
        xpReward: 35,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'top_10_percent',
        title: 'В элите',
        description: 'Войти в топ-10% рейтинга за месяц',
        icon: '👑',
        xpReward: 150,
        userMeta: {},
    },
    {
        id: 'feedback_master',
        title: 'Голос улучшений',
        description: 'Оставить 3 отзыва о функциях приложения',
        icon: '💬',
        xpReward: 40,
        userMeta: {},
    },
    {
        id: 'xp_500_club',
        title: 'Серебряный коллекционер',
        description: 'Накопить 500 очков опыта',
        icon: '🥈',
        xpReward: 50,
        userMeta: {},
    },
    {
        id: 'perfect_lesson',
        title: 'Идеальное выполнение',
        description: 'Пройти урок без единой ошибки',
        icon: '💯',
        xpReward: 70,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'group_leader',
        title: 'Лидер группы',
        description: 'Занять первое место в группе за неделю',
        icon: '🚩',
        xpReward: 120,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'challenge_accepted',
        title: 'Боец',
        description: 'Принять участие в еженедельном челлендже',
        icon: '⚔️',
        xpReward: 45,
        userMeta: {
            earnedDate: new Date(),
        },
    },
    {
        id: 'all_icons_collected',
        title: 'Коллекционер иконок',
        description: 'Разблокировать 5 разных иконок достижений',
        icon: '🖼️',
        xpReward: 60,
        userMeta: {},
    },
    {
        id: 'community_hero',
        title: 'Герой сообщества',
        description: 'Получить 50 лайков под своими комментариями',
        icon: '🌟',
        xpReward: 200,
        userMeta: {
            earnedDate: new Date(),
        },
    },
];

export const achievementApi = {
    getAchievements: async () => {
        return Promise.resolve(ACHIEVEMENTS_TEST);
    },
};
