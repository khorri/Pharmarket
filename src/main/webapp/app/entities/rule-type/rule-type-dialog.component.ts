import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RuleType } from './rule-type.model';
import { RuleTypePopupService } from './rule-type-popup.service';
import { RuleTypeService } from './rule-type.service';

@Component({
    selector: 'jhi-rule-type-dialog',
    templateUrl: './rule-type-dialog.component.html'
})
export class RuleTypeDialogComponent implements OnInit {

    ruleType: RuleType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ruleTypeService: RuleTypeService,
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
        if (this.ruleType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ruleTypeService.update(this.ruleType));
        } else {
            this.subscribeToSaveResponse(
                this.ruleTypeService.create(this.ruleType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RuleType>>) {
        result.subscribe((res: HttpResponse<RuleType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RuleType) {
        this.eventManager.broadcast({ name: 'ruleTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rule-type-popup',
    template: ''
})
export class RuleTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ruleTypePopupService: RuleTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ruleTypePopupService
                    .open(RuleTypeDialogComponent as Component, params['id']);
            } else {
                this.ruleTypePopupService
                    .open(RuleTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
