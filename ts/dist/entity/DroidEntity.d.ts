import { StarWarsDatabankEntityBase } from '../StarWarsDatabankEntityBase';
import type { StarWarsDatabankSDK } from '../StarWarsDatabankSDK';
import type { Control } from '../types';
import type { Droid, DroidLoadMatch, DroidListMatch } from '../StarWarsDatabankTypes';
declare class DroidEntity extends StarWarsDatabankEntityBase<Droid> {
    constructor(client: StarWarsDatabankSDK, entopts: any);
    make(this: DroidEntity): DroidEntity;
    load(this: any, reqmatch?: DroidLoadMatch, ctrl?: Control): Promise<DroidEntity>;
    list(this: any, reqmatch?: DroidListMatch, ctrl?: Control): Promise<DroidEntity[]>;
}
export { DroidEntity };
