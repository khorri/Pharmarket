import { BaseEntity } from './../../shared';

export class OrderState implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public color?: string,
        public priority?: number,
        public shipped?: boolean,
    ) {
        this.shipped = false;
    }
}
