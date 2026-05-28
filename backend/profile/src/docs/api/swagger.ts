export const onboardingSwaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Сервис онбординга API",
        version: "1.0.0",
        description: "Микросервис для управления онбордингом пользователей и генерации Roadmap",
    },
    servers: [{ url: "/api" }],
    components: {
        securitySchemes: {
            bearerAuth: { 
                type: "http", 
                scheme: "bearer", 
                bearerFormat: "JWT" 
            },
        },
        schemas: {
            GoalDto: {
                type: "object",
                required: ["id", "title", "icon", "description"],
                properties: {
                    id: { type: "string", example: "goal-1" },
                    title: { 
                        type: "string", 
                        minLength: 1, 
                        maxLength: 100,
                        example: "Карьерный рост" 
                    },
                    icon: { type: "string", example: "🚀" },
                    description: { 
                        type: "string", 
                        minLength: 1, 
                        maxLength: 500,
                        example: "Повысить квалификацию для получения более высокой должности" 
                    },
                    tag: { type: "string", example: "career" },
                },
            },
            LanguageDto: {
                type: "object",
                required: ["id", "title", "icon", "usageAreas"],
                properties: {
                    id: { type: "string", example: "lang-1" },
                    title: { 
                        type: "string", 
                        minLength: 1, 
                        maxLength: 100,
                        example: "JavaScript" 
                    },
                    icon: { type: "string", example: "JS" },
                    usageAreas: {
                        type: "array",
                        items: { type: "string" },
                        example: ["Frontend", "Backend", "Mobile"]
                    },
                },
            },
            ExperienceLevelDto: {
                type: "object",
                required: ["id", "title", "icon", "description", "difficulty"],
                properties: {
                    id: { type: "string", example: "exp-1" },
                    title: { 
                        type: "string", 
                        minLength: 1, 
                        maxLength: 100,
                        example: "Начинающий" 
                    },
                    icon: { type: "string", example: "🌱" },
                    description: { 
                        type: "string", 
                        minLength: 1, 
                        maxLength: 500,
                        example: "Только начинаю свой путь в программировании" 
                    },
                    difficulty: { 
                        type: "number", 
                        minimum: 1, 
                        maximum: 10,
                        example: 3 
                    },
                },
            },
            OnboardingDataDto: {
                type: "object",
                required: ["userId", "goals", "languages", "experienceLevels"],
                properties: {
                    userId: { 
                        type: "string", 
                        example: "123e4567-e89b-12d3-a456-426614174000",
                        description: "ID пользователя (берется из JWT токена)"
                    },
                    goals: {
                        type: "array",
                        minItems: 1,
                        maxItems: 50,
                        items: { $ref: "#/components/schemas/GoalDto" }
                    },
                    languages: {
                        type: "array",
                        minItems: 1,
                        maxItems: 50,
                        items: { $ref: "#/components/schemas/LanguageDto" }
                    },
                    experienceLevels: {
                        type: "array",
                        minItems: 1,
                        maxItems: 20,
                        items: { $ref: "#/components/schemas/ExperienceLevelDto" }
                    },
                },
            },
            RoadmapDto: {
                type: "object",
                required: ["id", "title", "icon", "xp"],
                properties: {
                    id: { type: "string", example: "roadmap-1" },
                    title: { type: "string", example: "Карьерный рост в JavaScript" },
                    icon: { type: "string", example: "🚀" },
                    xp: { type: "number", minimum: 1, maximum: 10000, example: 750 },
                },
            },
            SubmitOnboardingResponseDto: {
                type: "object",
                properties: {
                    message: { type: "string", example: "Данные онбординга успешно сохранены" },
                    roadmaps: {
                        type: "array",
                        items: { $ref: "#/components/schemas/RoadmapDto" }
                    }
                }
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    message: { type: "string", example: "Произошла ошибка" },
                },
            },
        },
    },
    paths: {
        "/onboarding/goals": {
            get: {
                tags: ["Onboarding"],
                summary: "Получить список доступных целей",
                description: "Возвращает список всех доступных целей для онбординга. Не требует авторизации.",
                responses: {
                    200: {
                        description: "Список целей успешно получен",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/GoalDto" }
                                },
                                example: [
                                    {
                                        id: "goal-1",
                                        title: "Карьерный рост",
                                        icon: "🚀",
                                        description: "Повысить квалификацию для получения более высокой должности",
                                        tag: "career"
                                    },
                                    {
                                        id: "goal-2",
                                        title: "Смена профессии",
                                        icon: "🔄",
                                        description: "Изучить новую область и сменить сферу деятельности",
                                        tag: "career"
                                    },
                                    {
                                        id: "goal-3",
                                        title: "Фриланс",
                                        icon: "💼",
                                        description: "Научиться зарабатывать на программировании удаленно",
                                        tag: "freelance"
                                    }
                                ]
                            }
                        },
                    },
                    500: {
                        description: "Внутренняя ошибка сервера",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ErrorResponse" }
                            }
                        }
                    },
                },
            },
        },
        
        "/onboarding/languages": {
            get: {
                tags: ["Onboarding"],
                summary: "Получить список доступных языков программирования",
                description: "Возвращает список всех доступных языков для онбординга. Не требует авторизации.",
                responses: {
                    200: {
                        description: "Список языков успешно получен",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/LanguageDto" }
                                },
                                example: [
                                    {
                                        id: "lang-1",
                                        title: "JavaScript",
                                        icon: "JS",
                                        usageAreas: ["Frontend", "Backend", "Mobile"]
                                    },
                                    {
                                        id: "lang-2",
                                        title: "Python",
                                        icon: "🐍",
                                        usageAreas: ["Data Science", "Backend", "AI/ML"]
                                    },
                                    {
                                        id: "lang-3",
                                        title: "Java",
                                        icon: "☕",
                                        usageAreas: ["Backend", "Android", "Enterprise"]
                                    }
                                ]
                            }
                        },
                    },
                    500: {
                        description: "Внутренняя ошибка сервера",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ErrorResponse" }
                            }
                        }
                    },
                },
            },
        },
        
        "/onboarding/experience-levels": {
            get: {
                tags: ["Onboarding"],
                summary: "Получить список доступных уровней опыта",
                description: "Возвращает список всех доступных уровней опыта для онбординга. Не требует авторизации.",
                responses: {
                    200: {
                        description: "Список уровней опыта успешно получен",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/ExperienceLevelDto" }
                                },
                                example: [
                                    {
                                        id: "exp-1",
                                        title: "Начинающий",
                                        icon: "🌱",
                                        description: "Только начинаю свой путь в программировании",
                                        difficulty: 3
                                    },
                                    {
                                        id: "exp-2",
                                        title: "Средний",
                                        icon: "⚡",
                                        description: "Уже имею опыт работы с технологиями",
                                        difficulty: 6
                                    },
                                    {
                                        id: "exp-3",
                                        title: "Продвинутый",
                                        icon: "🔥",
                                        description: "Имею значительный опыт и готов к сложным задачам",
                                        difficulty: 9
                                    }
                                ]
                            }
                        },
                    },
                    500: {
                        description: "Внутренняя ошибка сервера",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ErrorResponse" }
                            }
                        }
                    },
                },
            },
        },
        
        "/onboarding/submit": {
            post: {
                tags: ["Onboarding"],
                summary: "Отправить данные онбординга",
                description: "Сохраняет данные онбординга пользователя и генерирует персонализированные Roadmap. Требует авторизации. userId автоматически берется из JWT токена.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/OnboardingDataDto" },
                            example: {
                                goals: [
                                    {
                                        id: "goal-1",
                                        title: "Карьерный рост",
                                        icon: "🚀",
                                        description: "Повысить квалификацию для получения более высокой должности",
                                        tag: "career"
                                    },
                                    {
                                        id: "goal-2",
                                        title: "Смена профессии",
                                        icon: "🔄",
                                        description: "Изучить новую область и сменить сферу деятельности",
                                        tag: "career"
                                    }
                                ],
                                languages: [
                                    {
                                        id: "lang-1",
                                        title: "JavaScript",
                                        icon: "JS",
                                        usageAreas: ["Frontend", "Backend"]
                                    },
                                    {
                                        id: "lang-2",
                                        title: "TypeScript",
                                        icon: "TS",
                                        usageAreas: ["Frontend", "Backend"]
                                    }
                                ],
                                experienceLevels: [
                                    {
                                        id: "exp-2",
                                        title: "Средний",
                                        icon: "⚡",
                                        description: "Уже имею опыт работы с технологиями",
                                        difficulty: 6
                                    }
                                ]
                            }
                        }
                    },
                },
                responses: {
                    200: {
                        description: "Данные успешно сохранены, Roadmap сгенерированы",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/SubmitOnboardingResponseDto" },
                                example: {
                                    message: "Данные онбординга успешно сохранены",
                                    roadmaps: [
                                        {
                                            id: "roadmap-1",
                                            title: "Карьерный рост в JavaScript",
                                            icon: "🚀",
                                            xp: 750
                                        },
                                        {
                                            id: "roadmap-2",
                                            title: "Освоение TypeScript для профессионалов",
                                            icon: "TS",
                                            xp: 450
                                        },
                                        {
                                            id: "roadmap-3",
                                            title: "Путь к Senior разработчику",
                                            icon: "👨‍💻",
                                            xp: 1200
                                        }
                                    ]
                                }
                            }
                        },
                    },
                    400: {
                        description: "Ошибка валидации данных",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ErrorResponse" },
                                example: {
                                    message: "Необходимо выбрать хотя бы одну цель"
                                }
                            }
                        }
                    },
                    401: {
                        description: "Не авторизован",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ErrorResponse" },
                                example: {
                                    message: "Требуется авторизация"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Внутренняя ошибка сервера",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ErrorResponse" },
                                example: {
                                    message: "Не удалось загрузить roadmaps"
                                }
                            }
                        }
                    },
                },
            },
        },
    },
};
