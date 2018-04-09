import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ShippingMode } from './shipping-mode.model';
import { ShippingModePopupService } from './shipping-mode-popup.service';
import { ShippingModeService } from './shipping-mode.service';

@Component({
    selector: 'jhi-shipping-mode-delete-dialog',
    templateUrl: './shipping-mode-delete-dialog.component.html'
})
export class ShippingModeDeleteDialogComponent {

    shippingMode: ShippingMode;

    constructor(
        private shippingModeService: ShippingModeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shippingModeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'shippingModeListModification',
                content: 'Deleted an shippingMode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shipping-mode-delete-popup',
    template: ''
})
export class ShippingModeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shippingModePopupService: ShippingModePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.shippingModePopupService
                .open(ShippingModeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
