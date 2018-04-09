import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gadget } from './gadget.model';
import { GadgetPopupService } from './gadget-popup.service';
import { GadgetService } from './gadget.service';

@Component({
    selector: 'jhi-gadget-dialog',
    templateUrl: './gadget-dialog.component.html'
})
export class GadgetDialogComponent implements OnInit {

    gadget: Gadget;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private gadgetService: GadgetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gadget.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gadgetService.update(this.gadget));
        } else {
            this.subscribeToSaveResponse(
                this.gadgetService.create(this.gadget));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Gadget>>) {
        result.subscribe((res: HttpResponse<Gadget>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Gadget) {
        this.eventManager.broadcast({ name: 'gadgetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-gadget-popup',
    template: ''
})
export class GadgetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gadgetPopupService: GadgetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gadgetPopupService
                    .open(GadgetDialogComponent as Component, params['id']);
            } else {
                this.gadgetPopupService
                    .open(GadgetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
