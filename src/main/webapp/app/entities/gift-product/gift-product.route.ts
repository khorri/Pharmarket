import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GiftProductComponent } from './gift-product.component';
import { GiftProductDetailComponent } from './gift-product-detail.component';
import { GiftProductPopupComponent } from './gift-product-dialog.component';
import { GiftProductDeletePopupComponent } from './gift-product-delete-dialog.component';

@Injectable()
export class GiftProductResolvePagingParams implements Resolve<any> {

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

export const giftProductRoute: Routes = [
    {
        path: 'gift-product',
        component: GiftProductComponent,
        resolve: {
            'pagingParams': GiftProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gift-product/:id',
        component: GiftProductDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const giftProductPopupRoute: Routes = [
    {
        path: 'gift-product-new',
        component: GiftProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gift-product/:id/edit',
        component: GiftProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gift-product/:id/delete',
        component: GiftProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
