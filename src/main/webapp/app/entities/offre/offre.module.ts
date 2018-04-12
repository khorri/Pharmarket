import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularMultiSelectModule} from '../../angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {SelectDropDownModule} from 'ngx-select-dropdown'
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {PharmarketSharedModule} from '../../shared';
import {
    OffreService,
    OffrePopupService,
    OffreComponent,
    OffreDetailComponent,
    OffreDeletePopupComponent,
    OffreDeleteDialogComponent,
    offreRoute,
    offrePopupRoute,
    OffreResolvePagingParams,
    OffreNewComponent
} from './';

const ENTITY_STATES = [
    ...offreRoute,
    ...offrePopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AngularMultiSelectModule,
        SelectDropDownModule,
        NgbModule
    ],
    declarations: [
        OffreComponent,
        OffreDetailComponent,
        //OffreDialogComponent,
        OffreDeleteDialogComponent,
        //OffrePopupComponent,
        OffreDeletePopupComponent,
        OffreNewComponent
    ],
    entryComponents: [
        OffreComponent,
        //OffreDialogComponent,
        //OffrePopupComponent,
        OffreDeleteDialogComponent,
        OffreDeletePopupComponent,
    ],
    providers: [
        OffreService,
        OffrePopupService,
        OffreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketOffreModule {
}
