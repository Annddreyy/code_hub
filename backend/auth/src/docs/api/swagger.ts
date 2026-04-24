export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Сервис авторизации API",
        version: "1.0.0",
        description: "Микросервис авторизации",
    },
    servers: [{ url: "/api" }],
    components: {
        securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
        schemas: {
            RegisterDto: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                    name: {
                        type: "string",
                        minLength: 1,
                        example: "john_doe",
                    },
                    email: { type: "string", format: "email" },
                    password: { type: "string", minLength: 6 },
                },
            },
            LoginDto: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                },
            },
            ConfirmEmailDto: {
                type: "object",
                required: ["email", "code"],
                properties: {
                    email: { type: "string", format: "email" },
                    code: { type: "string", format: "uuid" },
                },
            },
            RequestPasswordResetDto: {
                type: "object",
                required: ["email"],
                properties: { email: { type: "string", format: "email" } },
            },
            ResetPasswordDto: {
                type: "object",
                required: ["email", "code", "newPassword"],
                properties: {
                    email: { type: "string", format: "email" },
                    code: { type: "string", format: "uuid" },
                    newPassword: { type: "string", minLength: 6 },
                },
            },
            UserMe: {
                type: "object",
                properties: {
                    id: { type: "string", format: "uuid" },
                    name: { type: "string" },
                    email: { type: "string" },
                    role: { type: "string", enum: ["USER", "ADMIN"] },
                    createdAt: { type: "number" },
                    isConfirmed: { type: "boolean" },
                },
            },
            AccessToken: {
                type: "object",
                properties: { accessToken: { type: "string" } },
            },
        },
    },
    paths: {
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Register new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/RegisterDto",
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Registered" },
                    400: { description: "Validation error / duplicate" },
                },
            },
        },
        "/auth/confirm-email": {
            post: {
                tags: ["Auth"],
                summary: "Confirm email (body)",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ConfirmEmailDto",
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Confirmed" },
                    400: { description: "Invalid code" },
                },
            },
            get: {
                tags: ["Auth"],
                summary: "Confirm email (link)",
                parameters: [
                    {
                        in: "query",
                        name: "email",
                        required: true,
                        schema: { type: "string" },
                    },
                    {
                        in: "query",
                        name: "code",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: { description: "Confirmed" },
                    400: { description: "Invalid link" },
                },
            },
        },
        "/auth/name": {
            post: {
                tags: ["Auth"],
                summary: "name",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/LoginDto" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "accessToken + refreshToken cookie",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AccessToken",
                                },
                            },
                        },
                    },
                    401: { description: "Invalid credentials" },
                },
            },
        },
        "/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Refresh tokens (refreshToken cookie)",
                responses: {
                    200: {
                        description: "New tokens",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AccessToken",
                                },
                            },
                        },
                    },
                    401: { description: "No / invalid refresh token" },
                },
            },
        },
        "/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Logout",
                security: [{ bearerAuth: [] }],
                responses: {
                    204: { description: "Logged out" },
                    401: { description: "Unauthorized" },
                },
            },
        },
        "/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Get current user",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "User",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/UserMe" },
                            },
                        },
                    },
                    401: { description: "Unauthorized" },
                },
            },
        },
        "/auth/request-password-reset": {
            post: {
                tags: ["Auth"],
                summary: "Request password reset email",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/RequestPasswordResetDto",
                            },
                        },
                    },
                },
                responses: { 200: { description: "Email sent if exists" } },
            },
        },
        "/auth/reset-password": {
            post: {
                tags: ["Auth"],
                summary: "Reset password by code",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ResetPasswordDto",
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Password updated" },
                    400: { description: "Invalid code" },
                },
            },
        },
    },
};
