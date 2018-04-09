import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Offre } from './offre.model';
import { OffreService } from './offre.service';

@Component({
    selector: 'jhi-offre-detail',
    templateUrl: './offre-detail.component.html'
})
export class OffreDetailComponent implements OnInit, OnDestroy {

    offre: Offre;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private offreService: OffreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOffres();
    }

    load(id) {
        this.offreService.find(id)
            .subscribe((offreResponse: HttpResponse<Offre>) => {
                this.offre = offreResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOffres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'offreListModification',
            (response) => this.load(this.offre.id)
        );
    }
}
