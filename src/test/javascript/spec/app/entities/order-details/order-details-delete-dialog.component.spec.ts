/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { OrderDetailsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/order-details/order-details-delete-dialog.component';
import { OrderDetailsService } from '../../../../../../main/webapp/app/entities/order-details/order-details.service';

describe('Component Tests', () => {

    describe('OrderDetails Management Delete Component', () => {
        let comp: OrderDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<OrderDetailsDeleteDialogComponent>;
        let service: OrderDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderDetailsDeleteDialogComponent],
                providers: [
                    OrderDetailsService
                ]
            })
            .overrideTemplate(OrderDetailsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderDetailsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
