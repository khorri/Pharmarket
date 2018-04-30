import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { OrdrePopupService } from './ordre-popup.service';
import { OrdreService } from './ordre.service';
import { Customer, CustomerService } from '../customer';
import { Offre, OffreService } from '../offre';
import { Payment, PaymentService } from '../payment';
import { Shipping, ShippingService } from '../shipping';
import { ShippingMode, ShippingModeService } from '../shipping-mode';

@Component({
    selector: 'jhi-ordre-dialog',
    templateUrl: './ordre-dialog.component.html'
})
export class OrdreDialogComponent implements OnInit {

    ordre: Ordre;
    isSaving: boolean;

    customers: Customer[];

    offres: Offre[];

    payments: Payment[];

    shippings: Shipping[];

    shippingmodes: ShippingMode[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ordreService: OrdreService,
        private customerService: CustomerService,
        private offreService: OffreService,
        private paymentService: PaymentService,
        private shippingService: ShippingService,
        private shippingModeService: ShippingModeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offreService.query()
            .subscribe((res: HttpResponse<Offre[]>) => { this.offres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.paymentService.query()
            .subscribe((res: HttpResponse<Payment[]>) => { this.payments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.shippingService.query()
            .subscribe((res: HttpResponse<Shipping[]>) => { this.shippings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.shippingModeService.query()
            .subscribe((res: HttpResponse<ShippingMode[]>) => { this.shippingmodes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ordre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordreService.update(this.ordre));
        } else {
            this.subscribeToSaveResponse(
                this.ordreService.create(this.ordre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Ordre>>) {
        result.subscribe((res: HttpResponse<Ordre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Ordre) {
        this.eventManager.broadcast({ name: 'ordreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackOffreById(index: number, item: Offre) {
        return item.id;
    }

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }

    trackShippingById(index: number, item: Shipping) {
        return item.id;
    }

    trackShippingModeById(index: number, item: ShippingMode) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ordre-popup',
    template: ''
})
export class OrdrePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordrePopupService: OrdrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ordrePopupService
                    .open(OrdreDialogComponent as Component, params['id']);
            } else {
                this.ordrePopupService
                    .open(OrdreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
