import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { OrdreService } from './ordre.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'jhi-ordre',
    templateUrl: './ordre.component.html'
})
export class OrdreComponent implements OnInit, OnDestroy {

currentAccount: any;
    ordres: Ordre[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    totalOrdred: number = 0;
    totalShipped: number = 0;
    totalShippedItems: number = 0;

    constructor(
        private ordreService: OrdreService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        config: NgbDropdownConfig,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        config.placement = 'bottom-right';
        config.autoClose = false;

    }

    loadAll() {

        this.ordreService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
                (res: HttpResponse<Ordre[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/ordre'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/ordre', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrdres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ordre) {
        return item.id;
    }
    registerChangeInOrdres() {
        this.eventSubscriber = this.eventManager.subscribe('ordreListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        if (this.predicate !== 'createdDate') {
            result.push('createdDate');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.ordres = data;

        this.ordres.forEach((order) => {
            if (order.currentStatus.id === 2) {
                this.totalOrdred++;
            }
            if (order.currentStatus.shipped) {
                this.totalShippedItems++;
                this.totalShipped += order.totalPaid;
            }

        });


    }


    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    isEditable(order) {
        if (this.currentAccount.authorities.includes('ROLE_REP')) {
            return order.currentStatus && order.currentStatus.priority === 1;
        } else {
            return order.currentStatus && order.currentStatus.priority !== 4;
        }
    }
}
