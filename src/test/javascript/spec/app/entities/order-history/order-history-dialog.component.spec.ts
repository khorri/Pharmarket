/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { OrderHistoryDialogComponent } from '../../../../../../main/webapp/app/entities/order-history/order-history-dialog.component';
import { OrderHistoryService } from '../../../../../../main/webapp/app/entities/order-history/order-history.service';
import { OrderHistory } from '../../../../../../main/webapp/app/entities/order-history/order-history.model';
import { OrdreService } from '../../../../../../main/webapp/app/entities/ordre';
import { OrderStateService } from '../../../../../../main/webapp/app/entities/order-state';

describe('Component Tests', () => {

    describe('OrderHistory Management Dialog Component', () => {
        let comp: OrderHistoryDialogComponent;
        let fixture: ComponentFixture<OrderHistoryDialogComponent>;
        let service: OrderHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderHistoryDialogComponent],
                providers: [
                    OrdreService,
                    OrderStateService,
                    OrderHistoryService
                ]
            })
            .overrideTemplate(OrderHistoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderHistoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderHistory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderHistory();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
