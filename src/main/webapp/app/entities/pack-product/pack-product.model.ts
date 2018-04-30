import {BaseEntity} from './../../shared';
import {Product} from "../product/product.model";

export class PackProduct implements BaseEntity {
    constructor(public id?: number,
                public quantityMin?: number,
                public rules?: BaseEntity[],
                public product?: Product,
                public pack?: BaseEntity,
                public quantity?: number,
                public totalTtc?: number,
                public totalDiscounted?: number,
                public ugQuantity?: number,) {
    }
}
