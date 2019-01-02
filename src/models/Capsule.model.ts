import { User } from "./User";

export class Capsule {
    "@id"?: "/capsules/1111";
    "@type"?: "Capsule";
    id: number;
    title: string;
    type: any;
    date: string;
    status: any;
    protocol: any;
    createdAt: any;
    updatedAt: any;
    messages: string[];
    owner: string | User;
    recipients: string[] | User[];
}