import { BaseEntity } from './../../shared';

export class Gadget implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
    ) {
    }
}
