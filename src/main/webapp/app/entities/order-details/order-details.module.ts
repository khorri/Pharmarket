import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    OrderDetailsService,
    OrderDetailsPopupService,
    OrderDetailsComponent,
    OrderDetailsDetailComponent,
    OrderDetailsDialogComponent,
    OrderDetailsPopupComponent,
    OrderDetailsDeletePopupComponent,
    OrderDetailsDeleteDialogComponent,
    orderDetailsRoute,
    orderDetailsPopupRoute,
    OrderDetailsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderDetailsRoute,
    ...orderDetailsPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderDetailsComponent,
        OrderDetailsDetailComponent,
        OrderDetailsDialogComponent,
        OrderDetailsDeleteDialogComponent,
        OrderDetailsPopupComponent,
        OrderDetailsDeletePopupComponent,
    ],
    entryComponents: [
        OrderDetailsComponent,
        OrderDetailsDialogComponent,
        OrderDetailsPopupComponent,
        OrderDetailsDeleteDialogComponent,
        OrderDetailsDeletePopupComponent,
    ],
    providers: [
        OrderDetailsService,
        OrderDetailsPopupService,
        OrderDetailsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketOrderDetailsModule {}
