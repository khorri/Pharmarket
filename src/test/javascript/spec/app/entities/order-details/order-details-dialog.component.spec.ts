/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { OrderDetailsDialogComponent } from '../../../../../../main/webapp/app/entities/order-details/order-details-dialog.component';
import { OrderDetailsService } from '../../../../../../main/webapp/app/entities/order-details/order-details.service';
import { OrderDetails } from '../../../../../../main/webapp/app/entities/order-details/order-details.model';
import { OrdreService } from '../../../../../../main/webapp/app/entities/ordre';
import { ProductService } from '../../../../../../main/webapp/app/entities/product';

describe('Component Tests', () => {

    describe('OrderDetails Management Dialog Component', () => {
        let comp: OrderDetailsDialogComponent;
        let fixture: ComponentFixture<OrderDetailsDialogComponent>;
        let service: OrderDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderDetailsDialogComponent],
                providers: [
                    OrdreService,
                    ProductService,
                    OrderDetailsService
                ]
            })
            .overrideTemplate(OrderDetailsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderDetailsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderDetailsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderDetails(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderDetails();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
