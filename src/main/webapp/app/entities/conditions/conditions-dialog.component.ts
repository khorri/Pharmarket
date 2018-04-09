import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Conditions } from './conditions.model';
import { ConditionsPopupService } from './conditions-popup.service';
import { ConditionsService } from './conditions.service';
import { Rule, RuleService } from '../rule';

@Component({
    selector: 'jhi-conditions-dialog',
    templateUrl: './conditions-dialog.component.html'
})
export class ConditionsDialogComponent implements OnInit {

    conditions: Conditions;
    isSaving: boolean;

    rules: Rule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private conditionsService: ConditionsService,
        private ruleService: RuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ruleService.query()
            .subscribe((res: HttpResponse<Rule[]>) => { this.rules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conditions.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conditionsService.update(this.conditions));
        } else {
            this.subscribeToSaveResponse(
                this.conditionsService.create(this.conditions));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Conditions>>) {
        result.subscribe((res: HttpResponse<Conditions>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Conditions) {
        this.eventManager.broadcast({ name: 'conditionsListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-conditions-popup',
    template: ''
})
export class ConditionsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conditionsPopupService: ConditionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.conditionsPopupService
                    .open(ConditionsDialogComponent as Component, params['id']);
            } else {
                this.conditionsPopupService
                    .open(ConditionsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
