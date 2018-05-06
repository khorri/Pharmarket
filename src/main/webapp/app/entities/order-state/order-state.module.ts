import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    OrderStateService,
    OrderStatePopupService,
    OrderStateComponent,
    OrderStateDetailComponent,
    OrderStateDialogComponent,
    OrderStatePopupComponent,
    OrderStateDeletePopupComponent,
    OrderStateDeleteDialogComponent,
    orderStateRoute,
    orderStatePopupRoute,
    OrderStateResolvePagingParams,
} from './';
import {ColorPickerModule} from "ngx-color-picker";

const ENTITY_STATES = [
    ...orderStateRoute,
    ...orderStatePopupRoute,

];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        ColorPickerModule
    ],
    declarations: [
        OrderStateComponent,
        OrderStateDetailComponent,
        OrderStateDialogComponent,
        OrderStateDeleteDialogComponent,
        OrderStatePopupComponent,
        OrderStateDeletePopupComponent,
    ],
    entryComponents: [
        OrderStateComponent,
        OrderStateDialogComponent,
        OrderStatePopupComponent,
        OrderStateDeleteDialogComponent,
        OrderStateDeletePopupComponent,
    ],
    providers: [
        OrderStateService,
        OrderStatePopupService,
        OrderStateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketOrderStateModule {}
