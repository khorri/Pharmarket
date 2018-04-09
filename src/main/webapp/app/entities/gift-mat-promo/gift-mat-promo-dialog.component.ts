import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GiftMatPromo } from './gift-mat-promo.model';
import { GiftMatPromoPopupService } from './gift-mat-promo-popup.service';
import { GiftMatPromoService } from './gift-mat-promo.service';
import { MaterielPromo, MaterielPromoService } from '../materiel-promo';
import { Rule, RuleService } from '../rule';

@Component({
    selector: 'jhi-gift-mat-promo-dialog',
    templateUrl: './gift-mat-promo-dialog.component.html'
})
export class GiftMatPromoDialogComponent implements OnInit {

    giftMatPromo: GiftMatPromo;
    isSaving: boolean;

    matpromos: MaterielPromo[];

    rules: Rule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private giftMatPromoService: GiftMatPromoService,
        private materielPromoService: MaterielPromoService,
        private ruleService: RuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.materielPromoService
            .query({filter: 'giftmatpromo-is-null'})
            .subscribe((res: HttpResponse<MaterielPromo[]>) => {
                if (!this.giftMatPromo.matpromo || !this.giftMatPromo.matpromo.id) {
                    this.matpromos = res.body;
                } else {
                    this.materielPromoService
                        .find(this.giftMatPromo.matpromo.id)
                        .subscribe((subRes: HttpResponse<MaterielPromo>) => {
                            this.matpromos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ruleService
            .query({filter: 'giftmatpromo-is-null'})
            .subscribe((res: HttpResponse<Rule[]>) => {
                if (!this.giftMatPromo.rule || !this.giftMatPromo.rule.id) {
                    this.rules = res.body;
                } else {
                    this.ruleService
                        .find(this.giftMatPromo.rule.id)
                        .subscribe((subRes: HttpResponse<Rule>) => {
                            this.rules = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.giftMatPromo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.giftMatPromoService.update(this.giftMatPromo));
        } else {
            this.subscribeToSaveResponse(
                this.giftMatPromoService.create(this.giftMatPromo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GiftMatPromo>>) {
        result.subscribe((res: HttpResponse<GiftMatPromo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GiftMatPromo) {
        this.eventManager.broadcast({ name: 'giftMatPromoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaterielPromoById(index: number, item: MaterielPromo) {
        return item.id;
    }

    trackRuleById(index: number, item: Rule) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-gift-mat-promo-popup',
    template: ''
})
export class GiftMatPromoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private giftMatPromoPopupService: GiftMatPromoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.giftMatPromoPopupService
                    .open(GiftMatPromoDialogComponent as Component, params['id']);
            } else {
                this.giftMatPromoPopupService
                    .open(GiftMatPromoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
