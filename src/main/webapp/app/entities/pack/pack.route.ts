import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PackComponent } from './pack.component';
import { PackDetailComponent } from './pack-detail.component';
import { PackPopupComponent } from './pack-dialog.component';
import { PackDeletePopupComponent } from './pack-delete-dialog.component';

@Injectable()
export class PackResolvePagingParams implements Resolve<any> {

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

export const packRoute: Routes = [
    {
        path: 'pack',
        component: PackComponent,
        resolve: {
            'pagingParams': PackResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.pack.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pack/:id',
        component: PackDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.pack.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const packPopupRoute: Routes = [
    {
        path: 'pack-new',
        component: PackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.pack.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pack/:id/edit',
        component: PackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.pack.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pack/:id/delete',
        component: PackDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.pack.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
