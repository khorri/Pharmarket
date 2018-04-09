import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    MaterielPromoService,
    MaterielPromoPopupService,
    MaterielPromoComponent,
    MaterielPromoDetailComponent,
    MaterielPromoDialogComponent,
    MaterielPromoPopupComponent,
    MaterielPromoDeletePopupComponent,
    MaterielPromoDeleteDialogComponent,
    materielPromoRoute,
    materielPromoPopupRoute,
    MaterielPromoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...materielPromoRoute,
    ...materielPromoPopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MaterielPromoComponent,
        MaterielPromoDetailComponent,
        MaterielPromoDialogComponent,
        MaterielPromoDeleteDialogComponent,
        MaterielPromoPopupComponent,
        MaterielPromoDeletePopupComponent,
    ],
    entryComponents: [
        MaterielPromoComponent,
        MaterielPromoDialogComponent,
        MaterielPromoPopupComponent,
        MaterielPromoDeleteDialogComponent,
        MaterielPromoDeletePopupComponent,
    ],
    providers: [
        MaterielPromoService,
        MaterielPromoPopupService,
        MaterielPromoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketMaterielPromoModule {}
