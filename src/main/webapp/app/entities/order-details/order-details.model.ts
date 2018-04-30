import { BaseEntity } from './../../shared';

export class OrderDetails implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public quantityShipped?: number,
        public ugQuantity?: number,
        public ordre?: BaseEntity,
        public packProduct?: BaseEntity,
    ) {
    }
}
