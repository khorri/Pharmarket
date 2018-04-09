import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PackProductComponent } from './pack-product.component';
import { PackProductDetailComponent } from './pack-product-detail.component';
import { PackProductPopupComponent } from './pack-product-dialog.component';
import { PackProductDeletePopupComponent } from './pack-product-delete-dialog.component';

@Injectable()
export class PackProductResolvePagingParams implements Resolve<any> {

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

export const packProductRoute: Routes = [
    {
        path: 'pack-product',
        component: PackProductComponent,
        resolve: {
            'pagingParams': PackProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.packProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pack-product/:id',
        component: PackProductDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.packProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const packProductPopupRoute: Routes = [
    {
        path: 'pack-product-new',
        component: PackProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.packProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pack-product/:id/edit',
        component: PackProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.packProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pack-product/:id/delete',
        component: PackProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.packProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
