import { StarWarsDatabankEntityBase } from '../StarWarsDatabankEntityBase';
import type { StarWarsDatabankSDK } from '../StarWarsDatabankSDK';
import type { Control } from '../types';
import type { Species, SpeciesLoadMatch, SpeciesListMatch } from '../StarWarsDatabankTypes';
declare class SpeciesEntity extends StarWarsDatabankEntityBase<Species> {
    constructor(client: StarWarsDatabankSDK, entopts: any);
    make(this: SpeciesEntity): SpeciesEntity;
    load(this: any, reqmatch?: SpeciesLoadMatch, ctrl?: Control): Promise<SpeciesEntity>;
    list(this: any, reqmatch?: SpeciesListMatch, ctrl?: Control): Promise<SpeciesEntity[]>;
}
export { SpeciesEntity };
