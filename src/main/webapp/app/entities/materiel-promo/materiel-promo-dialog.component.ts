import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaterielPromo } from './materiel-promo.model';
import { MaterielPromoPopupService } from './materiel-promo-popup.service';
import { MaterielPromoService } from './materiel-promo.service';

@Component({
    selector: 'jhi-materiel-promo-dialog',
    templateUrl: './materiel-promo-dialog.component.html'
})
export class MaterielPromoDialogComponent implements OnInit {

    materielPromo: MaterielPromo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private materielPromoService: MaterielPromoService,
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
        if (this.materielPromo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materielPromoService.update(this.materielPromo));
        } else {
            this.subscribeToSaveResponse(
                this.materielPromoService.create(this.materielPromo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MaterielPromo>>) {
        result.subscribe((res: HttpResponse<MaterielPromo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MaterielPromo) {
        this.eventManager.broadcast({ name: 'materielPromoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-materiel-promo-popup',
    template: ''
})
export class MaterielPromoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materielPromoPopupService: MaterielPromoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materielPromoPopupService
                    .open(MaterielPromoDialogComponent as Component, params['id']);
            } else {
                this.materielPromoPopupService
                    .open(MaterielPromoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
