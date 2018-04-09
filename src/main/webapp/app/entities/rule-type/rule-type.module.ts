import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PharmarketSharedModule } from '../../shared';
import {
    RuleTypeService,
    RuleTypePopupService,
    RuleTypeComponent,
    RuleTypeDetailComponent,
    RuleTypeDialogComponent,
    RuleTypePopupComponent,
    RuleTypeDeletePopupComponent,
    RuleTypeDeleteDialogComponent,
    ruleTypeRoute,
    ruleTypePopupRoute,
    RuleTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ruleTypeRoute,
    ...ruleTypePopupRoute,
];

@NgModule({
    imports: [
        PharmarketSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RuleTypeComponent,
        RuleTypeDetailComponent,
        RuleTypeDialogComponent,
        RuleTypeDeleteDialogComponent,
        RuleTypePopupComponent,
        RuleTypeDeletePopupComponent,
    ],
    entryComponents: [
        RuleTypeComponent,
        RuleTypeDialogComponent,
        RuleTypePopupComponent,
        RuleTypeDeleteDialogComponent,
        RuleTypeDeletePopupComponent,
    ],
    providers: [
        RuleTypeService,
        RuleTypePopupService,
        RuleTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketRuleTypeModule {}
