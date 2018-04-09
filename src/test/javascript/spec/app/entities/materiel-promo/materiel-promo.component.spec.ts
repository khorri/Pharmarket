/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { MaterielPromoComponent } from '../../../../../../main/webapp/app/entities/materiel-promo/materiel-promo.component';
import { MaterielPromoService } from '../../../../../../main/webapp/app/entities/materiel-promo/materiel-promo.service';
import { MaterielPromo } from '../../../../../../main/webapp/app/entities/materiel-promo/materiel-promo.model';

describe('Component Tests', () => {

    describe('MaterielPromo Management Component', () => {
        let comp: MaterielPromoComponent;
        let fixture: ComponentFixture<MaterielPromoComponent>;
        let service: MaterielPromoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [MaterielPromoComponent],
                providers: [
                    MaterielPromoService
                ]
            })
            .overrideTemplate(MaterielPromoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterielPromoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterielPromoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MaterielPromo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.materielPromos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
