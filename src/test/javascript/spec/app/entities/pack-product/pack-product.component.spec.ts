/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { PackProductComponent } from '../../../../../../main/webapp/app/entities/pack-product/pack-product.component';
import { PackProductService } from '../../../../../../main/webapp/app/entities/pack-product/pack-product.service';
import { PackProduct } from '../../../../../../main/webapp/app/entities/pack-product/pack-product.model';

describe('Component Tests', () => {

    describe('PackProduct Management Component', () => {
        let comp: PackProductComponent;
        let fixture: ComponentFixture<PackProductComponent>;
        let service: PackProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [PackProductComponent],
                providers: [
                    PackProductService
                ]
            })
            .overrideTemplate(PackProductComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PackProductComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PackProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PackProduct(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.packProducts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
