export interface User {
    id: string;
    name: string;
    bio: string;
    email: string;
    password: string;
    socialLinks: SocialLink[];
    createdAt: Date;
}

type SocialLink = {
    title: string;
    link: string;
};
