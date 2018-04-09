/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { GiftProductComponent } from '../../../../../../main/webapp/app/entities/gift-product/gift-product.component';
import { GiftProductService } from '../../../../../../main/webapp/app/entities/gift-product/gift-product.service';
import { GiftProduct } from '../../../../../../main/webapp/app/entities/gift-product/gift-product.model';

describe('Component Tests', () => {

    describe('GiftProduct Management Component', () => {
        let comp: GiftProductComponent;
        let fixture: ComponentFixture<GiftProductComponent>;
        let service: GiftProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GiftProductComponent],
                providers: [
                    GiftProductService
                ]
            })
            .overrideTemplate(GiftProductComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GiftProductComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GiftProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GiftProduct(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.giftProducts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
