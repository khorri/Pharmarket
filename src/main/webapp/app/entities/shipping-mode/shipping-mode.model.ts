import { BaseEntity } from './../../shared';

export class ShippingMode implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public ordre?: BaseEntity,
    ) {
    }
}
