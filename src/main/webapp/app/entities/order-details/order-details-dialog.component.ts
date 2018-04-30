import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderDetails } from './order-details.model';
import { OrderDetailsPopupService } from './order-details-popup.service';
import { OrderDetailsService } from './order-details.service';
import { Ordre, OrdreService } from '../ordre';
import { PackProduct, PackProductService } from '../pack-product';

@Component({
    selector: 'jhi-order-details-dialog',
    templateUrl: './order-details-dialog.component.html'
})
export class OrderDetailsDialogComponent implements OnInit {

    orderDetails: OrderDetails;
    isSaving: boolean;

    ordres: Ordre[];

    packproducts: PackProduct[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderDetailsService: OrderDetailsService,
        private ordreService: OrdreService,
        private packProductService: PackProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ordreService.query()
            .subscribe((res: HttpResponse<Ordre[]>) => { this.ordres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.packProductService.query()
            .subscribe((res: HttpResponse<PackProduct[]>) => { this.packproducts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderDetailsService.update(this.orderDetails));
        } else {
            this.subscribeToSaveResponse(
                this.orderDetailsService.create(this.orderDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderDetails>>) {
        result.subscribe((res: HttpResponse<OrderDetails>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderDetails) {
        this.eventManager.broadcast({ name: 'orderDetailsListModification', content: 'OK'});
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

    trackPackProductById(index: number, item: PackProduct) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-details-popup',
    template: ''
})
export class OrderDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderDetailsPopupService: OrderDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderDetailsPopupService
                    .open(OrderDetailsDialogComponent as Component, params['id']);
            } else {
                this.orderDetailsPopupService
                    .open(OrderDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
