import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Offre } from './offre.model';
import { OffrePopupService } from './offre-popup.service';
import { OffreService } from './offre.service';

@Component({
    selector: 'jhi-offre-delete-dialog',
    templateUrl: './offre-delete-dialog.component.html'
})
export class OffreDeleteDialogComponent {

    offre: Offre;

    constructor(
        private offreService: OffreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.offreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'offreListModification',
                content: 'Deleted an offre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-offre-delete-popup',
    template: ''
})
export class OffreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offrePopupService: OffrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.offrePopupService
                .open(OffreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
