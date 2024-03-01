import { User } from './user.model';
import { Image } from "./image.model";

export class Professional {
  user: User;
  companyName: string;
  activity: string;
  services : string[] = [];
  // documents : string[] = [];
  weekEnds: boolean;
  shiftSchedule: boolean;
  slug: string;
  status: string;
  experiences : string;
  realizations : Image[];
  kbisDoc: any;
  insuranceDoc: any;
  guaranteeDoc: any;
  denomination: string;
  legalForm: string;
  leader: string;
  effective: number;
  insurance: boolean;
  since: string;
  siret: string;
  startedSince: string;
  constructor() {
    this.user = new User();
  }
}
