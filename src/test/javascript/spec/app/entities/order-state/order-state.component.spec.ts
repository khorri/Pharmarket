/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { OrderStateComponent } from '../../../../../../main/webapp/app/entities/order-state/order-state.component';
import { OrderStateService } from '../../../../../../main/webapp/app/entities/order-state/order-state.service';
import { OrderState } from '../../../../../../main/webapp/app/entities/order-state/order-state.model';

describe('Component Tests', () => {

    describe('OrderState Management Component', () => {
        let comp: OrderStateComponent;
        let fixture: ComponentFixture<OrderStateComponent>;
        let service: OrderStateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderStateComponent],
                providers: [
                    OrderStateService
                ]
            })
            .overrideTemplate(OrderStateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderStateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderStateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderState(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderStates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
