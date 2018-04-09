import { BaseEntity } from './../../shared';

export class GiftProduct implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public product?: BaseEntity,
        public rule?: BaseEntity,
    ) {
    }
}
