import { User } from './user.model';
import { Address } from "./address.model";
import { Image } from "./image.model";

export class Demand {
    id: string;
    activity: any;
    title:string;
    createdAt:Date;
    description: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: Address;
    lang: any;
    images: Image[];
    isAffected: boolean;
    owner:User;
    status: number;
    participantList: any[];
    constructor() {
        this.address = new Address();
        this.images = [];
    }
}
