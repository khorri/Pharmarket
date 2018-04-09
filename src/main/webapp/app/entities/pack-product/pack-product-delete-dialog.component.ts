import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PackProduct } from './pack-product.model';
import { PackProductPopupService } from './pack-product-popup.service';
import { PackProductService } from './pack-product.service';

@Component({
    selector: 'jhi-pack-product-delete-dialog',
    templateUrl: './pack-product-delete-dialog.component.html'
})
export class PackProductDeleteDialogComponent {

    packProduct: PackProduct;

    constructor(
        private packProductService: PackProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.packProductService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'packProductListModification',
                content: 'Deleted an packProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pack-product-delete-popup',
    template: ''
})
export class PackProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packProductPopupService: PackProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.packProductPopupService
                .open(PackProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
