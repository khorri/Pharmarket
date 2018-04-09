import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsDetailComponent } from './order-details-detail.component';
import { OrderDetailsPopupComponent } from './order-details-dialog.component';
import { OrderDetailsDeletePopupComponent } from './order-details-delete-dialog.component';

@Injectable()
export class OrderDetailsResolvePagingParams implements Resolve<any> {

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

export const orderDetailsRoute: Routes = [
    {
        path: 'order-details',
        component: OrderDetailsComponent,
        resolve: {
            'pagingParams': OrderDetailsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-details/:id',
        component: OrderDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderDetailsPopupRoute: Routes = [
    {
        path: 'order-details-new',
        component: OrderDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-details/:id/edit',
        component: OrderDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-details/:id/delete',
        component: OrderDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.orderDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
