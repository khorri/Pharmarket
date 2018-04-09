import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    GiftMatPromoService,
    GiftMatPromoPopupService,
    GiftMatPromoComponent,
    GiftMatPromoDetailComponent,
    GiftMatPromoDialogComponent,
    GiftMatPromoPopupComponent,
    GiftMatPromoDeletePopupComponent,
    GiftMatPromoDeleteDialogComponent,
    giftMatPromoRoute,
    giftMatPromoPopupRoute,
    GiftMatPromoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...giftMatPromoRoute,
    ...giftMatPromoPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GiftMatPromoComponent,
        GiftMatPromoDetailComponent,
        GiftMatPromoDialogComponent,
        GiftMatPromoDeleteDialogComponent,
        GiftMatPromoPopupComponent,
        GiftMatPromoDeletePopupComponent,
    ],
    entryComponents: [
        GiftMatPromoComponent,
        GiftMatPromoDialogComponent,
        GiftMatPromoPopupComponent,
        GiftMatPromoDeleteDialogComponent,
        GiftMatPromoDeletePopupComponent,
    ],
    providers: [
        GiftMatPromoService,
        GiftMatPromoPopupService,
        GiftMatPromoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketGiftMatPromoModule {}
