import { CompanyType } from '../enums';
import { CompanyRequirment } from './CompanyRequirment';

export class CompanyRequirmentSetting {
    static readonly BUSINESS_NAME = new CompanyRequirmentSetting(CompanyType.BUSINESS_NAME, new CompanyRequirment(1, 0));
    static readonly LIMITED_BY_GURANTEE = new CompanyRequirmentSetting(CompanyType.LIMITED_BY_GURANTEE, new CompanyRequirment(1, 1));
    static readonly LIMITED_BY_SHARES = new CompanyRequirmentSetting(CompanyType.LIMITED_BY_SHARES, new CompanyRequirment(2, 1));
    static readonly UNLIMITED = new CompanyRequirmentSetting(CompanyType.UNLIMITED, new CompanyRequirment(2, 2));
    // private to disallow creating other instances of this type
    private constructor(private type: CompanyType, private readonly value: CompanyRequirment) {
    }
    get directorsCount(): number {
        return this.value.noOfDirector;
    }
    get secretariesCount(): number {
        return this.value.noOfSecretarties ? this.value.noOfSecretarties : 0;
    }
}
