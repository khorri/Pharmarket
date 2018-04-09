import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GiftProduct } from './gift-product.model';
import { GiftProductPopupService } from './gift-product-popup.service';
import { GiftProductService } from './gift-product.service';
import { Product, ProductService } from '../product';
import { Rule, RuleService } from '../rule';

@Component({
    selector: 'jhi-gift-product-dialog',
    templateUrl: './gift-product-dialog.component.html'
})
export class GiftProductDialogComponent implements OnInit {

    giftProduct: GiftProduct;
    isSaving: boolean;

    products: Product[];

    rules: Rule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private giftProductService: GiftProductService,
        private productService: ProductService,
        private ruleService: RuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService
            .query({filter: 'giftproduct-is-null'})
            .subscribe((res: HttpResponse<Product[]>) => {
                if (!this.giftProduct.product || !this.giftProduct.product.id) {
                    this.products = res.body;
                } else {
                    this.productService
                        .find(this.giftProduct.product.id)
                        .subscribe((subRes: HttpResponse<Product>) => {
                            this.products = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ruleService
            .query({filter: 'giftproduct-is-null'})
            .subscribe((res: HttpResponse<Rule[]>) => {
                if (!this.giftProduct.rule || !this.giftProduct.rule.id) {
                    this.rules = res.body;
                } else {
                    this.ruleService
                        .find(this.giftProduct.rule.id)
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
        if (this.giftProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.giftProductService.update(this.giftProduct));
        } else {
            this.subscribeToSaveResponse(
                this.giftProductService.create(this.giftProduct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GiftProduct>>) {
        result.subscribe((res: HttpResponse<GiftProduct>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GiftProduct) {
        this.eventManager.broadcast({ name: 'giftProductListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackRuleById(index: number, item: Rule) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-gift-product-popup',
    template: ''
})
export class GiftProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private giftProductPopupService: GiftProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.giftProductPopupService
                    .open(GiftProductDialogComponent as Component, params['id']);
            } else {
                this.giftProductPopupService
                    .open(GiftProductDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
