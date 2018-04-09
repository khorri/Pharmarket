import { BaseEntity } from './../../shared';

export class GiftMatPromo implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public matpromo?: BaseEntity,
        public rule?: BaseEntity,
    ) {
    }
}
