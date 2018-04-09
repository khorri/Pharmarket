import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaterielPromo } from './materiel-promo.model';
import { MaterielPromoPopupService } from './materiel-promo-popup.service';
import { MaterielPromoService } from './materiel-promo.service';

@Component({
    selector: 'jhi-materiel-promo-delete-dialog',
    templateUrl: './materiel-promo-delete-dialog.component.html'
})
export class MaterielPromoDeleteDialogComponent {

    materielPromo: MaterielPromo;

    constructor(
        private materielPromoService: MaterielPromoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.materielPromoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'materielPromoListModification',
                content: 'Deleted an materielPromo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-materiel-promo-delete-popup',
    template: ''
})
export class MaterielPromoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materielPromoPopupService: MaterielPromoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.materielPromoPopupService
                .open(MaterielPromoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
