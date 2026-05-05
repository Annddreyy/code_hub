import nodemailer from 'nodemailer';
import { settings } from '@/internal/config';

const transporter = nodemailer.createTransport({
    host: settings.email.host,
    port: settings.email.port,
    secure: false,
    auth: {
        user: settings.email.user,
        pass: settings.email.password,
    },
    tls: {
        rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000
});

type SendEmail = {
    to: string;
    code: string;
};

export const emailAdapter = {
    async sendEmailConfirmationMessage({ to, code }: SendEmail) {
        const confirmUrl =
            `http://localhost:${settings.port}/api/auth/confirm-email` +
            `?email=${encodeURIComponent(to)}&code=${code}`;

        return transporter.sendMail({
            from: `"CodeHub" <${settings.email.from}>`,
            to: 'andreymail22112006@gmail.com',
            subject: 'Подтверждение email',
            html: `
                <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto">
                    <h2>Подтвердите вашу почту</h2>
                    <p>Для завершения регистрации перейдите по ссылке:</p>
                    <a href="${confirmUrl}"
                       style="display:inline-block;padding:12px 24px;background:#4f9cff;
                              color:#fff;border-radius:6px;text-decoration:none">
                        Подтвердить email
                    </a>
                    <p style="color:#888;font-size:12px;margin-top:24px">
                        Ссылка действительна 1 час 30 минут.<br/>
                        Если вы не регистрировались — просто проигнорируйте это письмо.
                    </p>
                </div>`,
        });
    },

    async sendPasswordResetMessage({ to, code }: SendEmail) {
        const resetUrl =
            `http://localhost:${settings.port}/api/auth/reset-password` +
            `?email=${encodeURIComponent(to)}&code=${code}`;

        return transporter.sendMail({
            from: `"CodeHub" <${settings.email.from}>`,
            to,
            subject: 'Сброс пароля',
            html: `
                <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto">
                    <h2>Сброс пароля</h2>
                    <p>Для сброса пароля перейдите по ссылке:</p>
                    <a href="${resetUrl}"
                       style="display:inline-block;padding:12px 24px;background:#ff5c72;
                              color:#fff;border-radius:6px;text-decoration:none">
                        Сбросить пароль
                    </a>
                    <p style="color:#888;font-size:12px;margin-top:24px">
                        Ссылка действительна 1 час.<br/>
                        Если вы не запрашивали сброс пароля — проигнорируйте это письмо.
                    </p>
                </div>`,
        });
    },
};
