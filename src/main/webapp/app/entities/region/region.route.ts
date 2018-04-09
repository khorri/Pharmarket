import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RegionComponent } from './region.component';
import { RegionDetailComponent } from './region-detail.component';
import { RegionPopupComponent } from './region-dialog.component';
import { RegionDeletePopupComponent } from './region-delete-dialog.component';

@Injectable()
export class RegionResolvePagingParams implements Resolve<any> {

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

export const regionRoute: Routes = [
    {
        path: 'region',
        component: RegionComponent,
        resolve: {
            'pagingParams': RegionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'region/:id',
        component: RegionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regionPopupRoute: Routes = [
    {
        path: 'region-new',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region/:id/edit',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region/:id/delete',
        component: RegionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
