import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public ppv?: number,
        public pph?: number,
        public code?: string,
        public isNew?: boolean,
        public refrence?: string,
        public commercialName?: string,
        public marque?: string,
        public tva?: number,
        public fabricationPrice?: number,
        public actif?: boolean,
    ) {
        this.isNew = false;
        this.actif = false;
    }
}
