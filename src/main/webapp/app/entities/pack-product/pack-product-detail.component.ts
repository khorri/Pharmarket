import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PackProduct } from './pack-product.model';
import { PackProductService } from './pack-product.service';

@Component({
    selector: 'jhi-pack-product-detail',
    templateUrl: './pack-product-detail.component.html'
})
export class PackProductDetailComponent implements OnInit, OnDestroy {

    packProduct: PackProduct;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private packProductService: PackProductService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPackProducts();
    }

    load(id) {
        this.packProductService.find(id)
            .subscribe((packProductResponse: HttpResponse<PackProduct>) => {
                this.packProduct = packProductResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPackProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'packProductListModification',
            (response) => this.load(this.packProduct.id)
        );
    }
}
