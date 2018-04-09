import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pack } from './pack.model';
import { PackPopupService } from './pack-popup.service';
import { PackService } from './pack.service';

@Component({
    selector: 'jhi-pack-delete-dialog',
    templateUrl: './pack-delete-dialog.component.html'
})
export class PackDeleteDialogComponent {

    pack: Pack;

    constructor(
        private packService: PackService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.packService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'packListModification',
                content: 'Deleted an pack'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pack-delete-popup',
    template: ''
})
export class PackDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packPopupService: PackPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.packPopupService
                .open(PackDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
