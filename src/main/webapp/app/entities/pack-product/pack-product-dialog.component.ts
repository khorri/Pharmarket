import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PackProduct } from './pack-product.model';
import { PackProductPopupService } from './pack-product-popup.service';
import { PackProductService } from './pack-product.service';
import { Product, ProductService } from '../product';
import { Pack, PackService } from '../pack';
import { Rule, RuleService } from '../rule';

@Component({
    selector: 'jhi-pack-product-dialog',
    templateUrl: './pack-product-dialog.component.html'
})
export class PackProductDialogComponent implements OnInit {

    packProduct: PackProduct;
    isSaving: boolean;

    products: Product[];

    packs: Pack[];

    rules: Rule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private packProductService: PackProductService,
        private productService: ProductService,
        private packService: PackService,
        private ruleService: RuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.packService.query()
            .subscribe((res: HttpResponse<Pack[]>) => { this.packs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ruleService.query()
            .subscribe((res: HttpResponse<Rule[]>) => { this.rules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.packProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.packProductService.update(this.packProduct));
        } else {
            this.subscribeToSaveResponse(
                this.packProductService.create(this.packProduct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PackProduct>>) {
        result.subscribe((res: HttpResponse<PackProduct>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PackProduct) {
        this.eventManager.broadcast({ name: 'packProductListModification', content: 'OK'});
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

    trackPackById(index: number, item: Pack) {
        return item.id;
    }

    trackRuleById(index: number, item: Rule) {
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
    selector: 'jhi-pack-product-popup',
    template: ''
})
export class PackProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packProductPopupService: PackProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.packProductPopupService
                    .open(PackProductDialogComponent as Component, params['id']);
            } else {
                this.packProductPopupService
                    .open(PackProductDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
