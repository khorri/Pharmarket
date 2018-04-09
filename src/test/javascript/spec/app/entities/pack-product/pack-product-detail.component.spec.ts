/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { PackProductDetailComponent } from '../../../../../../main/webapp/app/entities/pack-product/pack-product-detail.component';
import { PackProductService } from '../../../../../../main/webapp/app/entities/pack-product/pack-product.service';
import { PackProduct } from '../../../../../../main/webapp/app/entities/pack-product/pack-product.model';

describe('Component Tests', () => {

    describe('PackProduct Management Detail Component', () => {
        let comp: PackProductDetailComponent;
        let fixture: ComponentFixture<PackProductDetailComponent>;
        let service: PackProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [PackProductDetailComponent],
                providers: [
                    PackProductService
                ]
            })
            .overrideTemplate(PackProductDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PackProductDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PackProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PackProduct(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.packProduct).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
