/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { OffreDetailComponent } from '../../../../../../main/webapp/app/entities/offre/offre-detail.component';
import { OffreService } from '../../../../../../main/webapp/app/entities/offre/offre.service';
import { Offre } from '../../../../../../main/webapp/app/entities/offre/offre.model';

describe('Component Tests', () => {

    describe('Offre Management Detail Component', () => {
        let comp: OffreDetailComponent;
        let fixture: ComponentFixture<OffreDetailComponent>;
        let service: OffreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OffreDetailComponent],
                providers: [
                    OffreService
                ]
            })
            .overrideTemplate(OffreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OffreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OffreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Offre(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.offre).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
