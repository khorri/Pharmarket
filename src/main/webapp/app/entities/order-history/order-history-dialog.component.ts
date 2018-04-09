import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderHistory } from './order-history.model';
import { OrderHistoryPopupService } from './order-history-popup.service';
import { OrderHistoryService } from './order-history.service';
import { Ordre, OrdreService } from '../ordre';
import { OrderState, OrderStateService } from '../order-state';

@Component({
    selector: 'jhi-order-history-dialog',
    templateUrl: './order-history-dialog.component.html'
})
export class OrderHistoryDialogComponent implements OnInit {

    orderHistory: OrderHistory;
    isSaving: boolean;

    ordres: Ordre[];

    orderstates: OrderState[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderHistoryService: OrderHistoryService,
        private ordreService: OrdreService,
        private orderStateService: OrderStateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ordreService.query()
            .subscribe((res: HttpResponse<Ordre[]>) => { this.ordres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.orderStateService
            .query({filter: 'orderhistory-is-null'})
            .subscribe((res: HttpResponse<OrderState[]>) => {
                if (!this.orderHistory.orderState || !this.orderHistory.orderState.id) {
                    this.orderstates = res.body;
                } else {
                    this.orderStateService
                        .find(this.orderHistory.orderState.id)
                        .subscribe((subRes: HttpResponse<OrderState>) => {
                            this.orderstates = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderHistoryService.update(this.orderHistory));
        } else {
            this.subscribeToSaveResponse(
                this.orderHistoryService.create(this.orderHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderHistory>>) {
        result.subscribe((res: HttpResponse<OrderHistory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderHistory) {
        this.eventManager.broadcast({ name: 'orderHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrdreById(index: number, item: Ordre) {
        return item.id;
    }

    trackOrderStateById(index: number, item: OrderState) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-history-popup',
    template: ''
})
export class OrderHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderHistoryPopupService: OrderHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderHistoryPopupService
                    .open(OrderHistoryDialogComponent as Component, params['id']);
            } else {
                this.orderHistoryPopupService
                    .open(OrderHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
