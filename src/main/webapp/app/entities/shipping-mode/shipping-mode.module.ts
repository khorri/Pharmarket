import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    ShippingModeService,
    ShippingModePopupService,
    ShippingModeComponent,
    ShippingModeDetailComponent,
    ShippingModeDialogComponent,
    ShippingModePopupComponent,
    ShippingModeDeletePopupComponent,
    ShippingModeDeleteDialogComponent,
    shippingModeRoute,
    shippingModePopupRoute,
    ShippingModeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...shippingModeRoute,
    ...shippingModePopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShippingModeComponent,
        ShippingModeDetailComponent,
        ShippingModeDialogComponent,
        ShippingModeDeleteDialogComponent,
        ShippingModePopupComponent,
        ShippingModeDeletePopupComponent,
    ],
    entryComponents: [
        ShippingModeComponent,
        ShippingModeDialogComponent,
        ShippingModePopupComponent,
        ShippingModeDeleteDialogComponent,
        ShippingModeDeletePopupComponent,
    ],
    providers: [
        ShippingModeService,
        ShippingModePopupService,
        ShippingModeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketShippingModeModule {}
