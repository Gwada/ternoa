import { Capsule } from "./Capsule.model";

export class Message {
    "@id": string;
    "@type": string;
    id: 3515;
    title: string;
    html: string
    createdAt: string;
    updatedAt: string;
    capsule: string | Capsule;
    medias: string | any[];
}