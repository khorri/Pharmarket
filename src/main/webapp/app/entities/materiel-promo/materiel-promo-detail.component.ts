import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MaterielPromo } from './materiel-promo.model';
import { MaterielPromoService } from './materiel-promo.service';

@Component({
    selector: 'jhi-materiel-promo-detail',
    templateUrl: './materiel-promo-detail.component.html'
})
export class MaterielPromoDetailComponent implements OnInit, OnDestroy {

    materielPromo: MaterielPromo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private materielPromoService: MaterielPromoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMaterielPromos();
    }

    load(id) {
        this.materielPromoService.find(id)
            .subscribe((materielPromoResponse: HttpResponse<MaterielPromo>) => {
                this.materielPromo = materielPromoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMaterielPromos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'materielPromoListModification',
            (response) => this.load(this.materielPromo.id)
        );
    }
}
