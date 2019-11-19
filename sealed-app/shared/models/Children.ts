import { Gift } from './Gift';
import { Person } from "./Person";
export class Children extends Person {
    dateOfBirth: Date;
    isExcluded: boolean = false;
    benefits: Gift[];
    description: "";
}
