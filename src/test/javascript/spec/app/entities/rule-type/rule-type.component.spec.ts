/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { RuleTypeComponent } from '../../../../../../main/webapp/app/entities/rule-type/rule-type.component';
import { RuleTypeService } from '../../../../../../main/webapp/app/entities/rule-type/rule-type.service';
import { RuleType } from '../../../../../../main/webapp/app/entities/rule-type/rule-type.model';

describe('Component Tests', () => {

    describe('RuleType Management Component', () => {
        let comp: RuleTypeComponent;
        let fixture: ComponentFixture<RuleTypeComponent>;
        let service: RuleTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [RuleTypeComponent],
                providers: [
                    RuleTypeService
                ]
            })
            .overrideTemplate(RuleTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RuleTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RuleTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RuleType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ruleTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
