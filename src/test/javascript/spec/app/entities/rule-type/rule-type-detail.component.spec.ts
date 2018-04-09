/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { RuleTypeDetailComponent } from '../../../../../../main/webapp/app/entities/rule-type/rule-type-detail.component';
import { RuleTypeService } from '../../../../../../main/webapp/app/entities/rule-type/rule-type.service';
import { RuleType } from '../../../../../../main/webapp/app/entities/rule-type/rule-type.model';

describe('Component Tests', () => {

    describe('RuleType Management Detail Component', () => {
        let comp: RuleTypeDetailComponent;
        let fixture: ComponentFixture<RuleTypeDetailComponent>;
        let service: RuleTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [RuleTypeDetailComponent],
                providers: [
                    RuleTypeService
                ]
            })
            .overrideTemplate(RuleTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RuleTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RuleTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RuleType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ruleType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
