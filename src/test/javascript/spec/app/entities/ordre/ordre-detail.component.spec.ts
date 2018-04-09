/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { OrdreDetailComponent } from '../../../../../../main/webapp/app/entities/ordre/ordre-detail.component';
import { OrdreService } from '../../../../../../main/webapp/app/entities/ordre/ordre.service';
import { Ordre } from '../../../../../../main/webapp/app/entities/ordre/ordre.model';

describe('Component Tests', () => {

    describe('Ordre Management Detail Component', () => {
        let comp: OrdreDetailComponent;
        let fixture: ComponentFixture<OrdreDetailComponent>;
        let service: OrdreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [OrdreDetailComponent],
                providers: [
                    OrdreService
                ]
            })
            .overrideTemplate(OrdreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Ordre(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ordre).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
