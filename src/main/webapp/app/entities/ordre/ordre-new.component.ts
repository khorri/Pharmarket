import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {Ordre} from './ordre.model';
import {OrdrePopupService} from './ordre-popup.service';
import {OrdreService} from './ordre.service';
import {Customer, CustomerService} from '../customer';

@Component({
    selector: 'jhi-ordre-dialog',
    templateUrl: './ordre-new.component.html'
})
export class OrdreNewComponent implements OnInit {

    ordre: Ordre;
    isSaving: boolean;

    customers: Customer[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private ordreService: OrdreService,
                private customerService: CustomerService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => {
                this.customers = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ordre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordreService.update(this.ordre));
        } else {
            this.subscribeToSaveResponse(
                this.ordreService.create(this.ordre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Ordre>>) {
        result.subscribe((res: HttpResponse<Ordre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Ordre) {
        this.eventManager.broadcast({name: 'ordreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }
}

