import { BaseEntity } from './../../shared';

export class OrderHistory implements BaseEntity {
    constructor(
        public id?: number,
        public addDate?: any,
        public ordre?: BaseEntity,
        public orderState?: BaseEntity,
    ) {
    }
}
