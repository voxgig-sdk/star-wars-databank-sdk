import { StarWarsDatabankEntityBase } from '../StarWarsDatabankEntityBase';
import type { StarWarsDatabankSDK } from '../StarWarsDatabankSDK';
import type { Control } from '../types';
import type { Location, LocationLoadMatch, LocationListMatch } from '../StarWarsDatabankTypes';
declare class LocationEntity extends StarWarsDatabankEntityBase<Location> {
    constructor(client: StarWarsDatabankSDK, entopts: any);
    make(this: LocationEntity): LocationEntity;
    load(this: any, reqmatch?: LocationLoadMatch, ctrl?: Control): Promise<LocationEntity>;
    list(this: any, reqmatch?: LocationListMatch, ctrl?: Control): Promise<LocationEntity[]>;
}
export { LocationEntity };
