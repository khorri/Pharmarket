import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderState } from './order-state.model';
import { OrderStatePopupService } from './order-state-popup.service';
import { OrderStateService } from './order-state.service';

@Component({
    selector: 'jhi-order-state-delete-dialog',
    templateUrl: './order-state-delete-dialog.component.html'
})
export class OrderStateDeleteDialogComponent {

    orderState: OrderState;

    constructor(
        private orderStateService: OrderStateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderStateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderStateListModification',
                content: 'Deleted an orderState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-state-delete-popup',
    template: ''
})
export class OrderStateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderStatePopupService: OrderStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderStatePopupService
                .open(OrderStateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
