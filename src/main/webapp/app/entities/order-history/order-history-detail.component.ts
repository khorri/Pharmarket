import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderHistory } from './order-history.model';
import { OrderHistoryService } from './order-history.service';

@Component({
    selector: 'jhi-order-history-detail',
    templateUrl: './order-history-detail.component.html'
})
export class OrderHistoryDetailComponent implements OnInit, OnDestroy {

    orderHistory: OrderHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderHistoryService: OrderHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderHistories();
    }

    load(id) {
        this.orderHistoryService.find(id)
            .subscribe((orderHistoryResponse: HttpResponse<OrderHistory>) => {
                this.orderHistory = orderHistoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderHistoryListModification',
            (response) => this.load(this.orderHistory.id)
        );
    }
}
