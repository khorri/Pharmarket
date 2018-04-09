/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { GiftProductDetailComponent } from '../../../../../../main/webapp/app/entities/gift-product/gift-product-detail.component';
import { GiftProductService } from '../../../../../../main/webapp/app/entities/gift-product/gift-product.service';
import { GiftProduct } from '../../../../../../main/webapp/app/entities/gift-product/gift-product.model';

describe('Component Tests', () => {

    describe('GiftProduct Management Detail Component', () => {
        let comp: GiftProductDetailComponent;
        let fixture: ComponentFixture<GiftProductDetailComponent>;
        let service: GiftProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GiftProductDetailComponent],
                providers: [
                    GiftProductService
                ]
            })
            .overrideTemplate(GiftProductDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GiftProductDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GiftProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GiftProduct(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.giftProduct).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
