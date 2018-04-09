import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Region } from './region.model';
import { RegionPopupService } from './region-popup.service';
import { RegionService } from './region.service';
import { City, CityService } from '../city';

@Component({
    selector: 'jhi-region-dialog',
    templateUrl: './region-dialog.component.html'
})
export class RegionDialogComponent implements OnInit {

    region: Region;
    isSaving: boolean;

    cities: City[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private regionService: RegionService,
        private cityService: CityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cityService.query()
            .subscribe((res: HttpResponse<City[]>) => { this.cities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(
                this.regionService.create(this.region));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Region>>) {
        result.subscribe((res: HttpResponse<Region>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Region) {
        this.eventManager.broadcast({ name: 'regionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-region-popup',
    template: ''
})
export class RegionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionPopupService: RegionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.regionPopupService
                    .open(RegionDialogComponent as Component, params['id']);
            } else {
                this.regionPopupService
                    .open(RegionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
