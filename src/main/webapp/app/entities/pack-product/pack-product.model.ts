import {BaseEntity} from './../../shared';

export class PackProduct implements BaseEntity {
    constructor(public id?: number,
                public quantityMin?: number,
                public rules?: BaseEntity[],
                public product?: BaseEntity,
                public pack?: BaseEntity,) {
    }
}
