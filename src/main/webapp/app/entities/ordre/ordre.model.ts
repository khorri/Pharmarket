import { BaseEntity } from './../../shared';

export const enum OrderType {
    'DIRECT',
    'GROSSISTE'
}

export class Ordre implements BaseEntity {
    constructor(
        public id?: number,
        public totalPaid?: number,
        public totalOrdred?: number,
        public type?: OrderType,
        public status?: string,
        public paymentDueDate?: string,
        public customer?: BaseEntity,
        public orderHistories?: BaseEntity[],
        public orderDetails?: BaseEntity[],
        public payments?: BaseEntity[],
        public shippingModes?: BaseEntity[],
        public shippings?: BaseEntity[],
    ) {
    }
}
