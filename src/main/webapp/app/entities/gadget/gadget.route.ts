import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GadgetComponent } from './gadget.component';
import { GadgetDetailComponent } from './gadget-detail.component';
import { GadgetPopupComponent } from './gadget-dialog.component';
import { GadgetDeletePopupComponent } from './gadget-delete-dialog.component';

@Injectable()
export class GadgetResolvePagingParams implements Resolve<any> {

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

export const gadgetRoute: Routes = [
    {
        path: 'gadget',
        component: GadgetComponent,
        resolve: {
            'pagingParams': GadgetResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.gadget.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gadget/:id',
        component: GadgetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.gadget.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gadgetPopupRoute: Routes = [
    {
        path: 'gadget-new',
        component: GadgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.gadget.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gadget/:id/edit',
        component: GadgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.gadget.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gadget/:id/delete',
        component: GadgetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.gadget.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
