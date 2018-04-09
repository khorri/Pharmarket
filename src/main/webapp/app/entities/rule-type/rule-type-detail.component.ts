import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RuleType } from './rule-type.model';
import { RuleTypeService } from './rule-type.service';

@Component({
    selector: 'jhi-rule-type-detail',
    templateUrl: './rule-type-detail.component.html'
})
export class RuleTypeDetailComponent implements OnInit, OnDestroy {

    ruleType: RuleType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ruleTypeService: RuleTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRuleTypes();
    }

    load(id) {
        this.ruleTypeService.find(id)
            .subscribe((ruleTypeResponse: HttpResponse<RuleType>) => {
                this.ruleType = ruleTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRuleTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ruleTypeListModification',
            (response) => this.load(this.ruleType.id)
        );
    }
}
