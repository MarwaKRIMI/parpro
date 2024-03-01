import { Address } from "./address.model";

export class Site {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: Address;
    description: string;
    activity: string;
    constructor() {
        this.address = new Address();
        }
        
}
