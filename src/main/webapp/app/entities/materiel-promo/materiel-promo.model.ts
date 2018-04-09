import { BaseEntity } from './../../shared';

export class MaterielPromo implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
    ) {
    }
}
