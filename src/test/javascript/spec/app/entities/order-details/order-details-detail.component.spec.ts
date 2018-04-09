/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { OrderDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/order-details/order-details-detail.component';
import { OrderDetailsService } from '../../../../../../main/webapp/app/entities/order-details/order-details.service';
import { OrderDetails } from '../../../../../../main/webapp/app/entities/order-details/order-details.model';

describe('Component Tests', () => {

    describe('OrderDetails Management Detail Component', () => {
        let comp: OrderDetailsDetailComponent;
        let fixture: ComponentFixture<OrderDetailsDetailComponent>;
        let service: OrderDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderDetailsDetailComponent],
                providers: [
                    OrderDetailsService
                ]
            })
            .overrideTemplate(OrderDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderDetails(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
