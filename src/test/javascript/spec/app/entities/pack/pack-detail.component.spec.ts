/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { PackDetailComponent } from '../../../../../../main/webapp/app/entities/pack/pack-detail.component';
import { PackService } from '../../../../../../main/webapp/app/entities/pack/pack.service';
import { Pack } from '../../../../../../main/webapp/app/entities/pack/pack.model';

describe('Component Tests', () => {

    describe('Pack Management Detail Component', () => {
        let comp: PackDetailComponent;
        let fixture: ComponentFixture<PackDetailComponent>;
        let service: PackService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [PackDetailComponent],
                providers: [
                    PackService
                ]
            })
            .overrideTemplate(PackDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PackDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PackService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Pack(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pack).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
