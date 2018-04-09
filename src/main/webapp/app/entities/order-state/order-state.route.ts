import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrderStateComponent } from './order-state.component';
import { OrderStateDetailComponent } from './order-state-detail.component';
import { OrderStatePopupComponent } from './order-state-dialog.component';
import { OrderStateDeletePopupComponent } from './order-state-delete-dialog.component';

@Injectable()
export class OrderStateResolvePagingParams implements Resolve<any> {

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

export const orderStateRoute: Routes = [
    {
        path: 'order-state',
        component: OrderStateComponent,
        resolve: {
            'pagingParams': OrderStateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-state/:id',
        component: OrderStateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderStatePopupRoute: Routes = [
    {
        path: 'order-state-new',
        component: OrderStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-state/:id/edit',
        component: OrderStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-state/:id/delete',
        component: OrderStateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
