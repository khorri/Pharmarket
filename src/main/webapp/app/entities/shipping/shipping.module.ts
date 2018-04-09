import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    ShippingService,
    ShippingPopupService,
    ShippingComponent,
    ShippingDetailComponent,
    ShippingDialogComponent,
    ShippingPopupComponent,
    ShippingDeletePopupComponent,
    ShippingDeleteDialogComponent,
    shippingRoute,
    shippingPopupRoute,
    ShippingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...shippingRoute,
    ...shippingPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShippingComponent,
        ShippingDetailComponent,
        ShippingDialogComponent,
        ShippingDeleteDialogComponent,
        ShippingPopupComponent,
        ShippingDeletePopupComponent,
    ],
    entryComponents: [
        ShippingComponent,
        ShippingDialogComponent,
        ShippingPopupComponent,
        ShippingDeleteDialogComponent,
        ShippingDeletePopupComponent,
    ],
    providers: [
        ShippingService,
        ShippingPopupService,
        ShippingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketShippingModule {}
