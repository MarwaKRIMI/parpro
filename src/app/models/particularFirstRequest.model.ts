import { User } from "./user.model";
import { Address } from "./address.model";
import { Image } from "./image.model";

export class ParticularFirstRequest{
    owner: User;
    activity: any;
    description: string;
    address: Address;
    images: Image[];
    lang: any;
    title: string;
    constructor() {
        this.owner = new User();
        this.address = new Address();
        this.images = [];
    }
}
