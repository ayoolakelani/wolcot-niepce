import { Gender, MARITAL_STATUS } from 'src/app/shared/enums';
import { Personal } from './Personal';
export class WillPersonal extends Personal {
    city?: string = '';
    state?: string = '';
    gender: Gender = undefined;
    Marital_Status: MARITAL_STATUS;
    IsHaveChildren?: boolean;
    IsHaveFutureChildren?: boolean;
    IsHaveMinorChildren?: boolean;
}
