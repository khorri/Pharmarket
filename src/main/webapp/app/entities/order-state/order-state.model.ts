import { BaseEntity } from './../../shared';

export class OrderState implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public color?: string,
    ) {
    }
}
