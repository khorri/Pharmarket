import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    GiftProductService,
    GiftProductPopupService,
    GiftProductComponent,
    GiftProductDetailComponent,
    GiftProductDialogComponent,
    GiftProductPopupComponent,
    GiftProductDeletePopupComponent,
    GiftProductDeleteDialogComponent,
    giftProductRoute,
    giftProductPopupRoute,
    GiftProductResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...giftProductRoute,
    ...giftProductPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GiftProductComponent,
        GiftProductDetailComponent,
        GiftProductDialogComponent,
        GiftProductDeleteDialogComponent,
        GiftProductPopupComponent,
        GiftProductDeletePopupComponent,
    ],
    entryComponents: [
        GiftProductComponent,
        GiftProductDialogComponent,
        GiftProductPopupComponent,
        GiftProductDeleteDialogComponent,
        GiftProductDeletePopupComponent,
    ],
    providers: [
        GiftProductService,
        GiftProductPopupService,
        GiftProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketGiftProductModule {}
