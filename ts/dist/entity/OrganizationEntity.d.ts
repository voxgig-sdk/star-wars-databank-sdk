import { StarWarsDatabankEntityBase } from '../StarWarsDatabankEntityBase';
import type { StarWarsDatabankSDK } from '../StarWarsDatabankSDK';
import type { Control } from '../types';
import type { Organization, OrganizationLoadMatch, OrganizationListMatch } from '../StarWarsDatabankTypes';
declare class OrganizationEntity extends StarWarsDatabankEntityBase<Organization> {
    constructor(client: StarWarsDatabankSDK, entopts: any);
    make(this: OrganizationEntity): OrganizationEntity;
    load(this: any, reqmatch?: OrganizationLoadMatch, ctrl?: Control): Promise<OrganizationEntity>;
    list(this: any, reqmatch?: OrganizationListMatch, ctrl?: Control): Promise<OrganizationEntity[]>;
}
export { OrganizationEntity };
