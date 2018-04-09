import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ShippingMode } from './shipping-mode.model';
import { ShippingModePopupService } from './shipping-mode-popup.service';
import { ShippingModeService } from './shipping-mode.service';
import { Ordre, OrdreService } from '../ordre';

@Component({
    selector: 'jhi-shipping-mode-dialog',
    templateUrl: './shipping-mode-dialog.component.html'
})
export class ShippingModeDialogComponent implements OnInit {

    shippingMode: ShippingMode;
    isSaving: boolean;

    ordres: Ordre[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private shippingModeService: ShippingModeService,
        private ordreService: OrdreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ordreService.query()
            .subscribe((res: HttpResponse<Ordre[]>) => { this.ordres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.shippingMode.id !== undefined) {
            this.subscribeToSaveResponse(
                this.shippingModeService.update(this.shippingMode));
        } else {
            this.subscribeToSaveResponse(
                this.shippingModeService.create(this.shippingMode));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ShippingMode>>) {
        result.subscribe((res: HttpResponse<ShippingMode>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ShippingMode) {
        this.eventManager.broadcast({ name: 'shippingModeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-shipping-mode-popup',
    template: ''
})
export class ShippingModePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shippingModePopupService: ShippingModePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.shippingModePopupService
                    .open(ShippingModeDialogComponent as Component, params['id']);
            } else {
                this.shippingModePopupService
                    .open(ShippingModeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
