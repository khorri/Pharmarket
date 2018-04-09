/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { ShippingModeComponent } from '../../../../../../main/webapp/app/entities/shipping-mode/shipping-mode.component';
import { ShippingModeService } from '../../../../../../main/webapp/app/entities/shipping-mode/shipping-mode.service';
import { ShippingMode } from '../../../../../../main/webapp/app/entities/shipping-mode/shipping-mode.model';

describe('Component Tests', () => {

    describe('ShippingMode Management Component', () => {
        let comp: ShippingModeComponent;
        let fixture: ComponentFixture<ShippingModeComponent>;
        let service: ShippingModeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [ShippingModeComponent],
                providers: [
                    ShippingModeService
                ]
            })
            .overrideTemplate(ShippingModeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShippingModeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShippingModeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ShippingMode(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.shippingModes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
