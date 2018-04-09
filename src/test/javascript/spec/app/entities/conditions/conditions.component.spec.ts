/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { ConditionsComponent } from '../../../../../../main/webapp/app/entities/conditions/conditions.component';
import { ConditionsService } from '../../../../../../main/webapp/app/entities/conditions/conditions.service';
import { Conditions } from '../../../../../../main/webapp/app/entities/conditions/conditions.model';

describe('Component Tests', () => {

    describe('Conditions Management Component', () => {
        let comp: ConditionsComponent;
        let fixture: ComponentFixture<ConditionsComponent>;
        let service: ConditionsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [ConditionsComponent],
                providers: [
                    ConditionsService
                ]
            })
            .overrideTemplate(ConditionsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConditionsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConditionsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Conditions(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.conditions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
