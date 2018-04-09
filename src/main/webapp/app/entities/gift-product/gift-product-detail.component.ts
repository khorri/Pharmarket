import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GiftProduct } from './gift-product.model';
import { GiftProductService } from './gift-product.service';

@Component({
    selector: 'jhi-gift-product-detail',
    templateUrl: './gift-product-detail.component.html'
})
export class GiftProductDetailComponent implements OnInit, OnDestroy {

    giftProduct: GiftProduct;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private giftProductService: GiftProductService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGiftProducts();
    }

    load(id) {
        this.giftProductService.find(id)
            .subscribe((giftProductResponse: HttpResponse<GiftProduct>) => {
                this.giftProduct = giftProductResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGiftProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'giftProductListModification',
            (response) => this.load(this.giftProduct.id)
        );
    }
}
