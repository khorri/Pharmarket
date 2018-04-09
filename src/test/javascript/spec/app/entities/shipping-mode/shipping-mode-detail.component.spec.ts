/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { ShippingModeDetailComponent } from '../../../../../../main/webapp/app/entities/shipping-mode/shipping-mode-detail.component';
import { ShippingModeService } from '../../../../../../main/webapp/app/entities/shipping-mode/shipping-mode.service';
import { ShippingMode } from '../../../../../../main/webapp/app/entities/shipping-mode/shipping-mode.model';

describe('Component Tests', () => {

    describe('ShippingMode Management Detail Component', () => {
        let comp: ShippingModeDetailComponent;
        let fixture: ComponentFixture<ShippingModeDetailComponent>;
        let service: ShippingModeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [ShippingModeDetailComponent],
                providers: [
                    ShippingModeService
                ]
            })
            .overrideTemplate(ShippingModeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShippingModeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShippingModeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ShippingMode(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.shippingMode).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
