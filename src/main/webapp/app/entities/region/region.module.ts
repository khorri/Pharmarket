import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    RegionService,
    RegionPopupService,
    RegionComponent,
    RegionDetailComponent,
    RegionDialogComponent,
    RegionPopupComponent,
    RegionDeletePopupComponent,
    RegionDeleteDialogComponent,
    regionRoute,
    regionPopupRoute,
    RegionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...regionRoute,
    ...regionPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegionComponent,
        RegionDetailComponent,
        RegionDialogComponent,
        RegionDeleteDialogComponent,
        RegionPopupComponent,
        RegionDeletePopupComponent,
    ],
    entryComponents: [
        RegionComponent,
        RegionDialogComponent,
        RegionPopupComponent,
        RegionDeleteDialogComponent,
        RegionDeletePopupComponent,
    ],
    providers: [
        RegionService,
        RegionPopupService,
        RegionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketRegionModule {}
