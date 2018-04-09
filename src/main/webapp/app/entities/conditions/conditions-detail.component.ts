import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Conditions } from './conditions.model';
import { ConditionsService } from './conditions.service';

@Component({
    selector: 'jhi-conditions-detail',
    templateUrl: './conditions-detail.component.html'
})
export class ConditionsDetailComponent implements OnInit, OnDestroy {

    conditions: Conditions;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private conditionsService: ConditionsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConditions();
    }

    load(id) {
        this.conditionsService.find(id)
            .subscribe((conditionsResponse: HttpResponse<Conditions>) => {
                this.conditions = conditionsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConditions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'conditionsListModification',
            (response) => this.load(this.conditions.id)
        );
    }
}
