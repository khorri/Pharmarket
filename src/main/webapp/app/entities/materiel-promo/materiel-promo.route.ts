import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MaterielPromoComponent } from './materiel-promo.component';
import { MaterielPromoDetailComponent } from './materiel-promo-detail.component';
import { MaterielPromoPopupComponent } from './materiel-promo-dialog.component';
import { MaterielPromoDeletePopupComponent } from './materiel-promo-delete-dialog.component';

@Injectable()
export class MaterielPromoResolvePagingParams implements Resolve<any> {

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

export const materielPromoRoute: Routes = [
    {
        path: 'materiel-promo',
        component: MaterielPromoComponent,
        resolve: {
            'pagingParams': MaterielPromoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.materielPromo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'materiel-promo/:id',
        component: MaterielPromoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.materielPromo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materielPromoPopupRoute: Routes = [
    {
        path: 'materiel-promo-new',
        component: MaterielPromoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.materielPromo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materiel-promo/:id/edit',
        component: MaterielPromoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.materielPromo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materiel-promo/:id/delete',
        component: MaterielPromoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.materielPromo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
