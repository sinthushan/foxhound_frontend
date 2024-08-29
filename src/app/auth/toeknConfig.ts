import { User } from "./user";

export interface Token{
    access: string;
    refresh: string;
    user: User;
}