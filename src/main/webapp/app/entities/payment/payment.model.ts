import { BaseEntity } from './../../shared';

export class Payment implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public ordre?: BaseEntity,
    ) {
    }
}