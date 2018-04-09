import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';
import {Offre} from './offre.model';
import {OffrePopupService} from './offre-popup.service';
import {OffreService} from './offre.service';
import {Shipping, ShippingService} from '../shipping';
import {Rule, RuleService} from '../rule';
import {Pack, PackService} from '../pack';

@Component({
    selector: 'jhi-offre-dialog',
    templateUrl: './offre-dialog.component.html'
})
export class OffreDialogComponent implements OnInit {

    offre: Offre;
    isSaving: boolean;

    shippings: Shipping[];
    packRules: Rule[];
    productRules: Rule[];
    //packs: [{id: 1, name: 'ANC'}, {id: 2, name: 'ANC'}, {id: 3, name: 'ANC'}];
    packs = [{id: 1, name: 'ANC'}, {id: 2, name: 'ANC'}, {id: 3, name: 'ANC'}];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private offreService: OffreService,
                private shippingService: ShippingService,
                private ruleService: RuleService,
                private packService: PackService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;

        this.shippingService.query()
            .subscribe((res: HttpResponse<Shipping[]>) => {
                this.shippings = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.ruleService.query()
            .subscribe((res: HttpResponse<Rule[]>) => {
                const data = res.body;
                this.packRules = data.filter((rule) => {
                    return rule.isForPack;
                });
                this.productRules = data.filter((rule) => {
                    return rule.isForProduct;
                });
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.offre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offreService.update(this.offre));
        } else {
            this.subscribeToSaveResponse(
            // this.offreService.create(this.offre));
        }
    }

    private    subscribeToSaveResponse(result: Observable < HttpResponse < Offre >>) {
        result.subscribe((res: HttpResponse<Offre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private    onSaveSuccess(result: Offre) {
        this.eventManager.broadcast({name: 'offreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private    onSaveError() {
        this.isSaving = false;
    }

    private    onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackShippingById(index: number, item: Shipping) {
        return item.id;
    }

    trackPackRuleById(index: number, item: Rule) {
        return item.id;
    }

    getSelected(selectedVals: Array < any >, option: any) {
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
    selector: 'jhi-offre-popup',
    template: ''
})
export class OffrePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private offrePopupService: OffrePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.offrePopupService
                    .open(OffreDialogComponent as Component, params['id']);
            } else {
                this.offrePopupService
                    .open(OffreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
