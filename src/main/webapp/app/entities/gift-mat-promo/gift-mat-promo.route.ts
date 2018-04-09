import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GiftMatPromoComponent } from './gift-mat-promo.component';
import { GiftMatPromoDetailComponent } from './gift-mat-promo-detail.component';
import { GiftMatPromoPopupComponent } from './gift-mat-promo-dialog.component';
import { GiftMatPromoDeletePopupComponent } from './gift-mat-promo-delete-dialog.component';

@Injectable()
export class GiftMatPromoResolvePagingParams implements Resolve<any> {

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

export const giftMatPromoRoute: Routes = [
    {
        path: 'gift-mat-promo',
        component: GiftMatPromoComponent,
        resolve: {
            'pagingParams': GiftMatPromoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftMatPromo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gift-mat-promo/:id',
        component: GiftMatPromoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftMatPromo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const giftMatPromoPopupRoute: Routes = [
    {
        path: 'gift-mat-promo-new',
        component: GiftMatPromoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftMatPromo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gift-mat-promo/:id/edit',
        component: GiftMatPromoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftMatPromo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gift-mat-promo/:id/delete',
        component: GiftMatPromoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pharmarketApp.giftMatPromo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
