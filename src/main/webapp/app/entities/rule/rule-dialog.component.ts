import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Rule } from './rule.model';
import { RulePopupService } from './rule-popup.service';
import { RuleService } from './rule.service';
import { PackProduct, PackProductService } from '../pack-product';
import { RuleType, RuleTypeService } from '../rule-type';
import { Product, ProductService } from '../product';
import { Gadget, GadgetService } from '../gadget';

@Component({
    selector: 'jhi-rule-dialog',
    templateUrl: './rule-dialog.component.html'
})
export class RuleDialogComponent implements OnInit {

    rule: Rule;
    isSaving: boolean;

    packproducts: PackProduct[];

    ruletypes: RuleType[];

    products: Product[];

    gadgets: Gadget[];

    dropdownProductSettings;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ruleService: RuleService,
        private packProductService: PackProductService,
        private ruleTypeService: RuleTypeService,
        private productService: ProductService,
        private gadgetService: GadgetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.packProductService.query()
            .subscribe((res: HttpResponse<PackProduct[]>) => { this.packproducts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ruleTypeService.query().subscribe((res: HttpResponse<RuleType[]>) => {
            this.ruletypes = res.body;
            this.rule.type = this.ruletypes[0];
        }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query({size: 9999})
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.gadgetService.query()
            .subscribe((res: HttpResponse<Gadget[]>) => { this.gadgets = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

        this.dropdownProductSettings = {
            singleSelection: true,
            text: 'Produit',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ruleService.update(this.rule));
        } else {
            this.subscribeToSaveResponse(
                this.ruleService.create(this.rule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Rule>>) {
        result.subscribe((res: HttpResponse<Rule>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Rule) {
        this.eventManager.broadcast({ name: 'ruleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPackProductById(index: number, item: PackProduct) {
        return item.id;
    }

    trackRuleTypeById(index: number, item: RuleType) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackGadgetById(index: number, item: Gadget) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rule-popup',
    template: ''
})
export class RulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rulePopupService: RulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rulePopupService
                    .open(RuleDialogComponent as Component, params['id']);
            } else {
                this.rulePopupService
                    .open(RuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
