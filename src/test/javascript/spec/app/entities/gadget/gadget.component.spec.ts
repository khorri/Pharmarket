/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { GadgetComponent } from '../../../../../../main/webapp/app/entities/gadget/gadget.component';
import { GadgetService } from '../../../../../../main/webapp/app/entities/gadget/gadget.service';
import { Gadget } from '../../../../../../main/webapp/app/entities/gadget/gadget.model';

describe('Component Tests', () => {

    describe('Gadget Management Component', () => {
        let comp: GadgetComponent;
        let fixture: ComponentFixture<GadgetComponent>;
        let service: GadgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GadgetComponent],
                providers: [
                    GadgetService
                ]
            })
            .overrideTemplate(GadgetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GadgetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GadgetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Gadget(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.gadgets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
