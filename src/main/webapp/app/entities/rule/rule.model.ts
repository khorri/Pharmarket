import { BaseEntity } from './../../shared';

export class Rule implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public isActive?: boolean,
        public priority?: number,
        public quantityMin?: number,
        public amountMin?: number,
        public reduction?: number,
        public giftQuantity?: number,
        public gadgetQuantity?: number,
        public isForPack?: boolean,
        public isForProduct?: boolean,
        public conditions?: BaseEntity[],
        public actions?: BaseEntity[],
        public type?: BaseEntity,
        public product?: BaseEntity,
        public gadget?: BaseEntity,
        public packProducts?: BaseEntity[],
    ) {
        this.isActive = false;
        this.isForPack = false;
        this.isForProduct = false;
    }
}
