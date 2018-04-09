/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { OrderStateDetailComponent } from '../../../../../../main/webapp/app/entities/order-state/order-state-detail.component';
import { OrderStateService } from '../../../../../../main/webapp/app/entities/order-state/order-state.service';
import { OrderState } from '../../../../../../main/webapp/app/entities/order-state/order-state.model';

describe('Component Tests', () => {

    describe('OrderState Management Detail Component', () => {
        let comp: OrderStateDetailComponent;
        let fixture: ComponentFixture<OrderStateDetailComponent>;
        let service: OrderStateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderStateDetailComponent],
                providers: [
                    OrderStateService
                ]
            })
            .overrideTemplate(OrderStateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderStateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderStateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderState(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderState).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
