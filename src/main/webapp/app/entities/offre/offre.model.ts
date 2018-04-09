import {BaseEntity} from './../../shared';

export class Offre implements BaseEntity {
    constructor(public id?: number,
                public name?: string,
                public start?: any,
                public end?: any,
                public status?: string,
                public description?: string,
                public quantityMin?: number,
                public amountMin?: number,
                public offreType?: string,
                public packs?: BaseEntity[],
                public shippings?: BaseEntity[],
                public displayStart?: any,
                public displayEnd?: any,
                public statusLabel?: string,) {

    }

}

export const OffreType = ["DIRECT", "GROSSISTE"];

export const OffreStatus = [
    {id: "NEW", value: "Nouveau"},
    {id: "IN_PROGRESS", value: "En cours"},
    {id: "EXPIRED", value: "Expiré"},
    {id: "CANCELED", value: "Annulé"}];
