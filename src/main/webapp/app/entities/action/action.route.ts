import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ActionComponent } from './action.component';
import { ActionDetailComponent } from './action-detail.component';
import { ActionPopupComponent } from './action-dialog.component';
import { ActionDeletePopupComponent } from './action-delete-dialog.component';

@Injectable()
export class ActionResolvePagingParams implements Resolve<any> {

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

export const actionRoute: Routes = [
    {
        path: 'action',
        component: ActionComponent,
        resolve: {
            'pagingParams': ActionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.action.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'action/:id',
        component: ActionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.action.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const actionPopupRoute: Routes = [
    {
        path: 'action-new',
        component: ActionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.action.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'action/:id/edit',
        component: ActionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.action.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'action/:id/delete',
        component: ActionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.action.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
