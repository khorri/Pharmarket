import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrderHistoryComponent } from './order-history.component';
import { OrderHistoryDetailComponent } from './order-history-detail.component';
import { OrderHistoryPopupComponent } from './order-history-dialog.component';
import { OrderHistoryDeletePopupComponent } from './order-history-delete-dialog.component';

@Injectable()
export class OrderHistoryResolvePagingParams implements Resolve<any> {

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

export const orderHistoryRoute: Routes = [
    {
        path: 'order-history',
        component: OrderHistoryComponent,
        resolve: {
            'pagingParams': OrderHistoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-history/:id',
        component: OrderHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderHistoryPopupRoute: Routes = [
    {
        path: 'order-history-new',
        component: OrderHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-history/:id/edit',
        component: OrderHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-history/:id/delete',
        component: OrderHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
