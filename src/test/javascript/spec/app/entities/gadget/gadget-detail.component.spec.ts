/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { GadgetDetailComponent } from '../../../../../../main/webapp/app/entities/gadget/gadget-detail.component';
import { GadgetService } from '../../../../../../main/webapp/app/entities/gadget/gadget.service';
import { Gadget } from '../../../../../../main/webapp/app/entities/gadget/gadget.model';

describe('Component Tests', () => {

    describe('Gadget Management Detail Component', () => {
        let comp: GadgetDetailComponent;
        let fixture: ComponentFixture<GadgetDetailComponent>;
        let service: GadgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GadgetDetailComponent],
                providers: [
                    GadgetService
                ]
            })
            .overrideTemplate(GadgetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GadgetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GadgetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Gadget(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gadget).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
