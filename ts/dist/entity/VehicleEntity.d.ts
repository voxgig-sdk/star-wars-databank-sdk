import { StarWarsDatabankEntityBase } from '../StarWarsDatabankEntityBase';
import type { StarWarsDatabankSDK } from '../StarWarsDatabankSDK';
import type { Control } from '../types';
import type { Vehicle, VehicleLoadMatch, VehicleListMatch } from '../StarWarsDatabankTypes';
declare class VehicleEntity extends StarWarsDatabankEntityBase<Vehicle> {
    constructor(client: StarWarsDatabankSDK, entopts: any);
    make(this: VehicleEntity): VehicleEntity;
    load(this: any, reqmatch?: VehicleLoadMatch, ctrl?: Control): Promise<VehicleEntity>;
    list(this: any, reqmatch?: VehicleListMatch, ctrl?: Control): Promise<VehicleEntity[]>;
}
export { VehicleEntity };
