import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderState } from './order-state.model';
import { OrderStateService } from './order-state.service';

@Component({
    selector: 'jhi-order-state-detail',
    templateUrl: './order-state-detail.component.html'
})
export class OrderStateDetailComponent implements OnInit, OnDestroy {

    orderState: OrderState;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderStateService: OrderStateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderStates();
    }

    load(id) {
        this.orderStateService.find(id)
            .subscribe((orderStateResponse: HttpResponse<OrderState>) => {
                this.orderState = orderStateResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderStates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderStateListModification',
            (response) => this.load(this.orderState.id)
        );
    }
}
