import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Gadget } from './gadget.model';
import { GadgetService } from './gadget.service';

@Component({
    selector: 'jhi-gadget-detail',
    templateUrl: './gadget-detail.component.html'
})
export class GadgetDetailComponent implements OnInit, OnDestroy {

    gadget: Gadget;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gadgetService: GadgetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGadgets();
    }

    load(id) {
        this.gadgetService.find(id)
            .subscribe((gadgetResponse: HttpResponse<Gadget>) => {
                this.gadget = gadgetResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGadgets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gadgetListModification',
            (response) => this.load(this.gadget.id)
        );
    }
}
