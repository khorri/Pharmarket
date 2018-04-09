import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pack } from './pack.model';
import { PackPopupService } from './pack-popup.service';
import { PackService } from './pack.service';
import { Rule, RuleService } from '../rule';
import { Offre, OffreService } from '../offre';

@Component({
    selector: 'jhi-pack-dialog',
    templateUrl: './pack-dialog.component.html'
})
export class PackDialogComponent implements OnInit {

    pack: Pack;
    isSaving: boolean;

    rules: Rule[];

    offres: Offre[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private packService: PackService,
        private ruleService: RuleService,
        private offreService: OffreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ruleService.query()
            .subscribe((res: HttpResponse<Rule[]>) => { this.rules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offreService.query()
            .subscribe((res: HttpResponse<Offre[]>) => { this.offres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pack.id !== undefined) {
            this.subscribeToSaveResponse(
                this.packService.update(this.pack));
        } else {
            this.subscribeToSaveResponse(
                this.packService.create(this.pack));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pack>>) {
        result.subscribe((res: HttpResponse<Pack>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pack) {
        this.eventManager.broadcast({ name: 'packListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRuleById(index: number, item: Rule) {
        return item.id;
    }

    trackOffreById(index: number, item: Offre) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-pack-popup',
    template: ''
})
export class PackPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packPopupService: PackPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.packPopupService
                    .open(PackDialogComponent as Component, params['id']);
            } else {
                this.packPopupService
                    .open(PackDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
