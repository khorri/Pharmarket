import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    ActionService,
    ActionPopupService,
    ActionComponent,
    ActionDetailComponent,
    ActionDialogComponent,
    ActionPopupComponent,
    ActionDeletePopupComponent,
    ActionDeleteDialogComponent,
    actionRoute,
    actionPopupRoute,
    ActionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...actionRoute,
    ...actionPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActionComponent,
        ActionDetailComponent,
        ActionDialogComponent,
        ActionDeleteDialogComponent,
        ActionPopupComponent,
        ActionDeletePopupComponent,
    ],
    entryComponents: [
        ActionComponent,
        ActionDialogComponent,
        ActionPopupComponent,
        ActionDeleteDialogComponent,
        ActionDeletePopupComponent,
    ],
    providers: [
        ActionService,
        ActionPopupService,
        ActionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketActionModule {}
