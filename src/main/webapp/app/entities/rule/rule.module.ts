import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    RuleService,
    RulePopupService,
    RuleComponent,
    RuleDetailComponent,
    RuleDialogComponent,
    RulePopupComponent,
    RuleDeletePopupComponent,
    RuleDeleteDialogComponent,
    ruleRoute,
    rulePopupRoute,
    RuleResolvePagingParams,
} from './';
import {AngularMultiSelectModule} from "../../angular2-multiselect-dropdown/multiselect.component";

const ENTITY_STATES = [
    ...ruleRoute,
    ...rulePopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AngularMultiSelectModule
    ],
    declarations: [
        RuleComponent,
        RuleDetailComponent,
        RuleDialogComponent,
        RuleDeleteDialogComponent,
        RulePopupComponent,
        RuleDeletePopupComponent,
    ],
    entryComponents: [
        RuleComponent,
        RuleDialogComponent,
        RulePopupComponent,
        RuleDeleteDialogComponent,
        RuleDeletePopupComponent,
    ],
    providers: [
        RuleService,
        RulePopupService,
        RuleResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketRuleModule {}
