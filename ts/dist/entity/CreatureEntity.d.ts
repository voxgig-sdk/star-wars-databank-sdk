import { StarWarsDatabankEntityBase } from '../StarWarsDatabankEntityBase';
import type { StarWarsDatabankSDK } from '../StarWarsDatabankSDK';
import type { Control } from '../types';
import type { Creature, CreatureLoadMatch, CreatureListMatch } from '../StarWarsDatabankTypes';
declare class CreatureEntity extends StarWarsDatabankEntityBase<Creature> {
    constructor(client: StarWarsDatabankSDK, entopts: any);
    make(this: CreatureEntity): CreatureEntity;
    load(this: any, reqmatch?: CreatureLoadMatch, ctrl?: Control): Promise<CreatureEntity>;
    list(this: any, reqmatch?: CreatureListMatch, ctrl?: Control): Promise<CreatureEntity[]>;
}
export { CreatureEntity };
