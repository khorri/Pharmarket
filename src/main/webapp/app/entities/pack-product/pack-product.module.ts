import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    PackProductService,
    PackProductPopupService,
    PackProductComponent,
    PackProductDetailComponent,
    PackProductDialogComponent,
    PackProductPopupComponent,
    PackProductDeletePopupComponent,
    PackProductDeleteDialogComponent,
    packProductRoute,
    packProductPopupRoute,
    PackProductResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...packProductRoute,
    ...packProductPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PackProductComponent,
        PackProductDetailComponent,
        PackProductDialogComponent,
        PackProductDeleteDialogComponent,
        PackProductPopupComponent,
        PackProductDeletePopupComponent,
    ],
    entryComponents: [
        PackProductComponent,
        PackProductDialogComponent,
        PackProductPopupComponent,
        PackProductDeleteDialogComponent,
        PackProductDeletePopupComponent,
    ],
    providers: [
        PackProductService,
        PackProductPopupService,
        PackProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketPackProductModule {}
