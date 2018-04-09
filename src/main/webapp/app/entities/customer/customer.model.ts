import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public firstname?: string,
        public lastname?: string,
        public address?: string,
        public email?: string,
        public phone?: string,
        public isVip?: boolean,
        public actif?: boolean,
        public orders?: BaseEntity[],
        public region?: BaseEntity,
        public city?: BaseEntity,
    ) {
        this.isVip = false;
        this.actif = false;
    }
}
