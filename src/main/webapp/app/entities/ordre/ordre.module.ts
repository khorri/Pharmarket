import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    OrdreService,
    OrdrePopupService,
    OrdreComponent,
    OrdreDetailComponent,
    OrdreDialogComponent,
    OrdrePopupComponent,
    OrdreDeletePopupComponent,
    OrdreDeleteDialogComponent,
    ordreRoute,
    ordrePopupRoute,
    OrdreResolvePagingParams,
    OrdreNewComponent
} from './';
import {AngularMultiSelectModule} from "../../angular2-multiselect-dropdown/multiselect.component";
import {ColorPickerModule} from "ngx-color-picker";

const ENTITY_STATES = [
    ...ordreRoute,
    ...ordrePopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AngularMultiSelectModule

    ],
    declarations: [
        OrdreComponent,
        OrdreDetailComponent,
        OrdreDialogComponent,
        OrdreDeleteDialogComponent,
        OrdrePopupComponent,
        OrdreDeletePopupComponent,
        OrdreNewComponent,
    ],
    entryComponents: [
        OrdreComponent,
        OrdreDialogComponent,
        OrdrePopupComponent,
        OrdreDeleteDialogComponent,
        OrdreDeletePopupComponent,
        OrdreNewComponent,
    ],
    providers: [
        OrdreService,
        OrdrePopupService,
        OrdreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketOrdreModule {}
