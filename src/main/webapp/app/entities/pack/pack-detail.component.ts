import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Pack } from './pack.model';
import { PackService } from './pack.service';

@Component({
    selector: 'jhi-pack-detail',
    templateUrl: './pack-detail.component.html'
})
export class PackDetailComponent implements OnInit, OnDestroy {

    pack: Pack;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private packService: PackService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPacks();
    }

    load(id) {
        this.packService.find(id)
            .subscribe((packResponse: HttpResponse<Pack>) => {
                this.pack = packResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPacks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'packListModification',
            (response) => this.load(this.pack.id)
        );
    }
}
