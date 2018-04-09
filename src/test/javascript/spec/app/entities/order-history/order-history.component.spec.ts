/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { OrderHistoryComponent } from '../../../../../../main/webapp/app/entities/order-history/order-history.component';
import { OrderHistoryService } from '../../../../../../main/webapp/app/entities/order-history/order-history.service';
import { OrderHistory } from '../../../../../../main/webapp/app/entities/order-history/order-history.model';

describe('Component Tests', () => {

    describe('OrderHistory Management Component', () => {
        let comp: OrderHistoryComponent;
        let fixture: ComponentFixture<OrderHistoryComponent>;
        let service: OrderHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderHistoryComponent],
                providers: [
                    OrderHistoryService
                ]
            })
            .overrideTemplate(OrderHistoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderHistory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
