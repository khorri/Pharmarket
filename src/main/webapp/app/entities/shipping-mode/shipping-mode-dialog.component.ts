import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ShippingMode } from './shipping-mode.model';
import { ShippingModePopupService } from './shipping-mode-popup.service';
import { ShippingModeService } from './shipping-mode.service';

@Component({
    selector: 'jhi-shipping-mode-dialog',
    templateUrl: './shipping-mode-dialog.component.html'
})
export class ShippingModeDialogComponent implements OnInit {

    shippingMode: ShippingMode;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private shippingModeService: ShippingModeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
