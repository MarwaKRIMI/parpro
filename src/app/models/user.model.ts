import { Address } from "./address.model";
import { Professional } from "./professional.model";

export class User {
    id: number;
    email: string;
    plainPassword: Password;
    firstName: string;
    lastName: string;
    address: Address
    avatar: any
    phone: string
    username: string
    civility: number
    birthday:string
    professional? : Professional
    particular?:any
    languages : string[]
    constructor() {
        this.address = new Address();
        this.plainPassword = new Password();
        this.languages =[]
    }
}

export class Password{
    first : string;
    second : string;
}