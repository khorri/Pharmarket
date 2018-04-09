/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { ConditionsDetailComponent } from '../../../../../../main/webapp/app/entities/conditions/conditions-detail.component';
import { ConditionsService } from '../../../../../../main/webapp/app/entities/conditions/conditions.service';
import { Conditions } from '../../../../../../main/webapp/app/entities/conditions/conditions.model';

describe('Component Tests', () => {

    describe('Conditions Management Detail Component', () => {
        let comp: ConditionsDetailComponent;
        let fixture: ComponentFixture<ConditionsDetailComponent>;
        let service: ConditionsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [ConditionsDetailComponent],
                providers: [
                    ConditionsService
                ]
            })
            .overrideTemplate(ConditionsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConditionsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConditionsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Conditions(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.conditions).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
