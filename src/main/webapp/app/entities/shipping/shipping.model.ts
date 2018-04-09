import { BaseEntity } from './../../shared';

export class Shipping implements BaseEntity {
    constructor(
        public id?: number,
        public reference?: string,
        public name?: string,
        public address?: string,
        public phone?: string,
        public contact?: string,
        public isGrossiste?: boolean,
        public ordre?: BaseEntity,
        public offres?: BaseEntity[],
    ) {
        this.isGrossiste = false;
    }
}
