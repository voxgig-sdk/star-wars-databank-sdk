import { CharacterEntity } from './entity/CharacterEntity';
import { CreatureEntity } from './entity/CreatureEntity';
import { DroidEntity } from './entity/DroidEntity';
import { LocationEntity } from './entity/LocationEntity';
import { OrganizationEntity } from './entity/OrganizationEntity';
import { SpeciesEntity } from './entity/SpeciesEntity';
import { VehicleEntity } from './entity/VehicleEntity';
export type * from './StarWarsDatabankTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { StarWarsDatabankEntityBase } from './StarWarsDatabankEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class StarWarsDatabankSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Character(entopts?: Record<string, any>): CharacterEntity;
    Creature(entopts?: Record<string, any>): CreatureEntity;
    Droid(entopts?: Record<string, any>): DroidEntity;
    Location(entopts?: Record<string, any>): LocationEntity;
    Organization(entopts?: Record<string, any>): OrganizationEntity;
    Species(entopts?: Record<string, any>): SpeciesEntity;
    Vehicle(entopts?: Record<string, any>): VehicleEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): StarWarsDatabankSDK;
    tester(testopts?: any, sdkopts?: any): StarWarsDatabankSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof StarWarsDatabankSDK;
export { stdutil, config, BaseFeature, StarWarsDatabankEntityBase, StarWarsDatabankSDK, SDK, };
