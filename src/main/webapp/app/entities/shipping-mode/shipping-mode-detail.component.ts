import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ShippingMode } from './shipping-mode.model';
import { ShippingModeService } from './shipping-mode.service';

@Component({
    selector: 'jhi-shipping-mode-detail',
    templateUrl: './shipping-mode-detail.component.html'
})
export class ShippingModeDetailComponent implements OnInit, OnDestroy {

    shippingMode: ShippingMode;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private shippingModeService: ShippingModeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInShippingModes();
    }

    load(id) {
        this.shippingModeService.find(id)
            .subscribe((shippingModeResponse: HttpResponse<ShippingMode>) => {
                this.shippingMode = shippingModeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInShippingModes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'shippingModeListModification',
            (response) => this.load(this.shippingMode.id)
        );
    }
}
