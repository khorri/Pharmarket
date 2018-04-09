/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { OrderHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/order-history/order-history-detail.component';
import { OrderHistoryService } from '../../../../../../main/webapp/app/entities/order-history/order-history.service';
import { OrderHistory } from '../../../../../../main/webapp/app/entities/order-history/order-history.model';

describe('Component Tests', () => {

    describe('OrderHistory Management Detail Component', () => {
        let comp: OrderHistoryDetailComponent;
        let fixture: ComponentFixture<OrderHistoryDetailComponent>;
        let service: OrderHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrderHistoryDetailComponent],
                providers: [
                    OrderHistoryService
                ]
            })
            .overrideTemplate(OrderHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderHistory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
