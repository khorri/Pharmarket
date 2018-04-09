import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderHistory } from './order-history.model';
import { OrderHistoryPopupService } from './order-history-popup.service';
import { OrderHistoryService } from './order-history.service';

@Component({
    selector: 'jhi-order-history-delete-dialog',
    templateUrl: './order-history-delete-dialog.component.html'
})
export class OrderHistoryDeleteDialogComponent {

    orderHistory: OrderHistory;

    constructor(
        private orderHistoryService: OrderHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderHistoryListModification',
                content: 'Deleted an orderHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-history-delete-popup',
    template: ''
})
export class OrderHistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderHistoryPopupService: OrderHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderHistoryPopupService
                .open(OrderHistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
