import {BaseEntity} from './../../shared';

export class Pack implements BaseEntity {
    constructor(public id?: number,
                public name?: string,
                public rules?: BaseEntity[],
                public packProducts?: BaseEntity[],
                public offre?: BaseEntity,
                public description?: string,
                public selected?: boolean,
                public operator?: string,) {
    }
}
