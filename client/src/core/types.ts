export interface User {
    _id: string;
    name: string;
    email: string;
    title: string;
    birthdate: Date;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}