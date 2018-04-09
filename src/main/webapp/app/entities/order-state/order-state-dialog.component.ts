import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderState } from './order-state.model';
import { OrderStatePopupService } from './order-state-popup.service';
import { OrderStateService } from './order-state.service';

@Component({
    selector: 'jhi-order-state-dialog',
    templateUrl: './order-state-dialog.component.html'
})
export class OrderStateDialogComponent implements OnInit {

    orderState: OrderState;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private orderStateService: OrderStateService,
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
        if (this.orderState.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderStateService.update(this.orderState));
        } else {
            this.subscribeToSaveResponse(
                this.orderStateService.create(this.orderState));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderState>>) {
        result.subscribe((res: HttpResponse<OrderState>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderState) {
        this.eventManager.broadcast({ name: 'orderStateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-order-state-popup',
    template: ''
})
export class OrderStatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderStatePopupService: OrderStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderStatePopupService
                    .open(OrderStateDialogComponent as Component, params['id']);
            } else {
                this.orderStatePopupService
                    .open(OrderStateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
