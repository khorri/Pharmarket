import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    GadgetService,
    GadgetPopupService,
    GadgetComponent,
    GadgetDetailComponent,
    GadgetDialogComponent,
    GadgetPopupComponent,
    GadgetDeletePopupComponent,
    GadgetDeleteDialogComponent,
    gadgetRoute,
    gadgetPopupRoute,
    GadgetResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...gadgetRoute,
    ...gadgetPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GadgetComponent,
        GadgetDetailComponent,
        GadgetDialogComponent,
        GadgetDeleteDialogComponent,
        GadgetPopupComponent,
        GadgetDeletePopupComponent,
    ],
    entryComponents: [
        GadgetComponent,
        GadgetDialogComponent,
        GadgetPopupComponent,
        GadgetDeleteDialogComponent,
        GadgetDeletePopupComponent,
    ],
    providers: [
        GadgetService,
        GadgetPopupService,
        GadgetResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketGadgetModule {}
