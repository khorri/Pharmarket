import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GiftMatPromo } from './gift-mat-promo.model';
import { GiftMatPromoPopupService } from './gift-mat-promo-popup.service';
import { GiftMatPromoService } from './gift-mat-promo.service';

@Component({
    selector: 'jhi-gift-mat-promo-delete-dialog',
    templateUrl: './gift-mat-promo-delete-dialog.component.html'
})
export class GiftMatPromoDeleteDialogComponent {

    giftMatPromo: GiftMatPromo;

    constructor(
        private giftMatPromoService: GiftMatPromoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.giftMatPromoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'giftMatPromoListModification',
                content: 'Deleted an giftMatPromo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gift-mat-promo-delete-popup',
    template: ''
})
export class GiftMatPromoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private giftMatPromoPopupService: GiftMatPromoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.giftMatPromoPopupService
                .open(GiftMatPromoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
