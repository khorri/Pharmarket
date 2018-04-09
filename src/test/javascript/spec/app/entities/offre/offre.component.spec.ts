/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { OffreComponent } from '../../../../../../main/webapp/app/entities/offre/offre.component';
import { OffreService } from '../../../../../../main/webapp/app/entities/offre/offre.service';
import { Offre } from '../../../../../../main/webapp/app/entities/offre/offre.model';

describe('Component Tests', () => {

    describe('Offre Management Component', () => {
        let comp: OffreComponent;
        let fixture: ComponentFixture<OffreComponent>;
        let service: OffreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OffreComponent],
                providers: [
                    OffreService
                ]
            })
            .overrideTemplate(OffreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OffreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OffreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Offre(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.offres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
