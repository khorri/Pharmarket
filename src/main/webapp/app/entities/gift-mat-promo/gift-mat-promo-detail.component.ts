import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GiftMatPromo } from './gift-mat-promo.model';
import { GiftMatPromoService } from './gift-mat-promo.service';

@Component({
    selector: 'jhi-gift-mat-promo-detail',
    templateUrl: './gift-mat-promo-detail.component.html'
})
export class GiftMatPromoDetailComponent implements OnInit, OnDestroy {

    giftMatPromo: GiftMatPromo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private giftMatPromoService: GiftMatPromoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGiftMatPromos();
    }

    load(id) {
        this.giftMatPromoService.find(id)
            .subscribe((giftMatPromoResponse: HttpResponse<GiftMatPromo>) => {
                this.giftMatPromo = giftMatPromoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGiftMatPromos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'giftMatPromoListModification',
            (response) => this.load(this.giftMatPromo.id)
        );
    }
}
