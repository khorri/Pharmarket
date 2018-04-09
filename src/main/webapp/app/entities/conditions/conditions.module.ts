import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    ConditionsService,
    ConditionsPopupService,
    ConditionsComponent,
    ConditionsDetailComponent,
    ConditionsDialogComponent,
    ConditionsPopupComponent,
    ConditionsDeletePopupComponent,
    ConditionsDeleteDialogComponent,
    conditionsRoute,
    conditionsPopupRoute,
    ConditionsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...conditionsRoute,
    ...conditionsPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConditionsComponent,
        ConditionsDetailComponent,
        ConditionsDialogComponent,
        ConditionsDeleteDialogComponent,
        ConditionsPopupComponent,
        ConditionsDeletePopupComponent,
    ],
    entryComponents: [
        ConditionsComponent,
        ConditionsDialogComponent,
        ConditionsPopupComponent,
        ConditionsDeleteDialogComponent,
        ConditionsDeletePopupComponent,
    ],
    providers: [
        ConditionsService,
        ConditionsPopupService,
        ConditionsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketConditionsModule {}
