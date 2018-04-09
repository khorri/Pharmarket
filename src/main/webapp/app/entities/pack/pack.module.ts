import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    PackService,
    PackPopupService,
    PackComponent,
    PackDetailComponent,
    PackDialogComponent,
    PackPopupComponent,
    PackDeletePopupComponent,
    PackDeleteDialogComponent,
    packRoute,
    packPopupRoute,
    PackResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...packRoute,
    ...packPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PackComponent,
        PackDetailComponent,
        PackDialogComponent,
        PackDeleteDialogComponent,
        PackPopupComponent,
        PackDeletePopupComponent,
    ],
    entryComponents: [
        PackComponent,
        PackDialogComponent,
        PackPopupComponent,
        PackDeleteDialogComponent,
        PackDeletePopupComponent,
    ],
    providers: [
        PackService,
        PackPopupService,
        PackResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketPackModule {}
