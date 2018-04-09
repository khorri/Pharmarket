import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GiftProduct } from './gift-product.model';
import { GiftProductPopupService } from './gift-product-popup.service';
import { GiftProductService } from './gift-product.service';

@Component({
    selector: 'jhi-gift-product-delete-dialog',
    templateUrl: './gift-product-delete-dialog.component.html'
})
export class GiftProductDeleteDialogComponent {

    giftProduct: GiftProduct;

    constructor(
        private giftProductService: GiftProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.giftProductService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'giftProductListModification',
                content: 'Deleted an giftProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gift-product-delete-popup',
    template: ''
})
export class GiftProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private giftProductPopupService: GiftProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.giftProductPopupService
                .open(GiftProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
