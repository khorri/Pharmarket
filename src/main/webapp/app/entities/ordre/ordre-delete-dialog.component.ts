import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { OrdrePopupService } from './ordre-popup.service';
import { OrdreService } from './ordre.service';

@Component({
    selector: 'jhi-ordre-delete-dialog',
    templateUrl: './ordre-delete-dialog.component.html'
})
export class OrdreDeleteDialogComponent {

    ordre: Ordre;

    constructor(
        private ordreService: OrdreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ordreListModification',
                content: 'Deleted an ordre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ordre-delete-popup',
    template: ''
})
export class OrdreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordrePopupService: OrdrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ordrePopupService
                .open(OrdreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
