import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ShippingModeComponent } from './shipping-mode.component';
import { ShippingModeDetailComponent } from './shipping-mode-detail.component';
import { ShippingModePopupComponent } from './shipping-mode-dialog.component';
import { ShippingModeDeletePopupComponent } from './shipping-mode-delete-dialog.component';

@Injectable()
export class ShippingModeResolvePagingParams implements Resolve<any> {

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

export const shippingModeRoute: Routes = [
    {
        path: 'shipping-mode',
        component: ShippingModeComponent,
        resolve: {
            'pagingParams': ShippingModeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.shippingMode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'shipping-mode/:id',
        component: ShippingModeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.shippingMode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shippingModePopupRoute: Routes = [
    {
        path: 'shipping-mode-new',
        component: ShippingModePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.shippingMode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shipping-mode/:id/edit',
        component: ShippingModePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.shippingMode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shipping-mode/:id/delete',
        component: ShippingModeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.shippingMode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
