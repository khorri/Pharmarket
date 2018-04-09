import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gadget } from './gadget.model';
import { GadgetPopupService } from './gadget-popup.service';
import { GadgetService } from './gadget.service';

@Component({
    selector: 'jhi-gadget-delete-dialog',
    templateUrl: './gadget-delete-dialog.component.html'
})
export class GadgetDeleteDialogComponent {

    gadget: Gadget;

    constructor(
        private gadgetService: GadgetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gadgetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gadgetListModification',
                content: 'Deleted an gadget'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gadget-delete-popup',
    template: ''
})
export class GadgetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gadgetPopupService: GadgetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gadgetPopupService
                .open(GadgetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
