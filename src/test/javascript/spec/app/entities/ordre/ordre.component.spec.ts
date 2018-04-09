/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { OrdreComponent } from '../../../../../../main/webapp/app/entities/ordre/ordre.component';
import { OrdreService } from '../../../../../../main/webapp/app/entities/ordre/ordre.service';
import { Ordre } from '../../../../../../main/webapp/app/entities/ordre/ordre.model';

describe('Component Tests', () => {

    describe('Ordre Management Component', () => {
        let comp: OrdreComponent;
        let fixture: ComponentFixture<OrdreComponent>;
        let service: OrdreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrdreComponent],
                providers: [
                    OrdreService
                ]
            })
            .overrideTemplate(OrdreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Ordre(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ordres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
