import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RuleTypeComponent } from './rule-type.component';
import { RuleTypeDetailComponent } from './rule-type-detail.component';
import { RuleTypePopupComponent } from './rule-type-dialog.component';
import { RuleTypeDeletePopupComponent } from './rule-type-delete-dialog.component';

@Injectable()
export class RuleTypeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const ruleTypeRoute: Routes = [
    {
        path: 'rule-type',
        component: RuleTypeComponent,
        resolve: {
            'pagingParams': RuleTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.ruleType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rule-type/:id',
        component: RuleTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.ruleType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ruleTypePopupRoute: Routes = [
    {
        path: 'rule-type-new',
        component: RuleTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.ruleType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-type/:id/edit',
        component: RuleTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.ruleType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-type/:id/delete',
        component: RuleTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.ruleType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
