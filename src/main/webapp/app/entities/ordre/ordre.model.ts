import {BaseEntity, User} from './../../shared';
import {Offre} from "../offre/offre.model";
import {OrderState} from "../order-state/order-state.model";

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
        public currentStatus?: OrderState,
        public paymentDueDate?: Date,
        public totalDiscount?: number,
        public customer?: BaseEntity,
        public orderHistories?: BaseEntity[],
        public orderDetails?: BaseEntity[],
        public offre?: Offre,
        public payment?: BaseEntity,
        public shipping?: BaseEntity,
        public shippingMode?: BaseEntity,
        public user?: User,
        public displayPaymentDueDate?: any,
        public createdBy?: any,
        public createdDate?: Date,
        public firstGrossiste?: BaseEntity,
        public secondGrossiste?: BaseEntity,
        public thirdGrossiste?: BaseEntity,
        public comment?: string,


    ) {
    }
}
