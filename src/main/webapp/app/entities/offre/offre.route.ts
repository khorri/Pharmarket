import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
import {UserRouteAccessService} from '../../shared';
import {OffreComponent} from './offre.component';
import {OffreDetailComponent} from './offre-detail.component';
//import {OffrePopupComponent} from './offre-dialog.component';
import {OffreDeletePopupComponent} from './offre-delete-dialog.component';
import {OffreNewComponent} from "./offre-new.component";

@Injectable()
export class OffreResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

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

export const offreRoute: Routes = [
    {
        path: 'offre',
        component: OffreComponent,
        resolve: {
            'pagingParams': OffreResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'pharmarketApp.offre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offre/:id',
        component: OffreDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'pharmarketApp.offre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offre-new',
        component: OffreNewComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'pharmarketApp.offre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offre/:id/edit',
        component: OffreNewComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'pharmarketApp.offre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offrePopupRoute: Routes = [

    {
        path: 'offre/:id/delete',
        component: OffreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'pharmarketApp.offre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
