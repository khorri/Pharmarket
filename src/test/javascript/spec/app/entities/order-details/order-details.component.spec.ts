/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { OrderDetailsComponent } from '../../../../../../main/webapp/app/entities/order-details/order-details.component';
import { OrderDetailsService } from '../../../../../../main/webapp/app/entities/order-details/order-details.service';
import { OrderDetails } from '../../../../../../main/webapp/app/entities/order-details/order-details.model';

describe('Component Tests', () => {

    describe('OrderDetails Management Component', () => {
        let comp: OrderDetailsComponent;
        let fixture: ComponentFixture<OrderDetailsComponent>;
        let service: OrderDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderDetailsComponent],
                providers: [
                    OrderDetailsService
                ]
            })
            .overrideTemplate(OrderDetailsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderDetails(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
